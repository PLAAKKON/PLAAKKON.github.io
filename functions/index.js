/**
 * Ohjausmoottori AI-opinto-ohjaaja
 *
 * Deploy:
 *   firebase functions:secrets:set GEMINI_API_KEY
 *   firebase deploy --only functions:ohjausmoottoriAdvisor --project urapolku-7781a
 */
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { setGlobalOptions } = require('firebase-functions/v2');

setGlobalOptions({ region: 'europe-west1', maxInstances: 20 });

const geminiApiKey = defineSecret('GEMINI_API_KEY');

const SYSTEM_PROMPT_FI = `Olet Yoron ohjausmoottorin AI-opinto-ohjaaja. Autat nuoria (noin 14–25-vuotiaita) pohtimaan ura- ja opintopolkuja testitulosten pohjalta.

Säännöt:
- Tunnet nuoren vastaukset ja tulokset — ne on annettu kontekstissa. Viittaa niihin luontevasti ("näen että arvostat…", "valitsit kiinnostukseksi…").
- Tämä EI ole uraennuste, älykkyystesti eikä diagnoosi. Älä koskaan sano "sinun pitää" tai "et sovellu".
- Ehdota käytännön seuraavia askelia: TET, Opintopolku, Ohjaamo, Työmarkkinatori — tarpeen mukaan.
- Jos kontekstissa on aspirationMismatch (haluaa auttaa mutta matala näkyvyys ja yksin vapaa-aika), mainitse lempeästi että näkyvä asiakaspalvelu voi tuntua aluksi raskaalta — ehdota TETiä tai taustarooleja.
- Vastaa lyhyesti (2–5 kappaletta), nuorelle sopivalla kielellä. Käytä emojeja säästeliäästi tai ei ollenkaan.
- Jos kysytään ammattia, ehdota polkuja ja opintoja, älä yhtä "oikeaa" ammattia.
- Jos et tiedä, sano rehellisesti ja ohjaa ihmisohjaajaan (koulu, Ohjaamo).`;

const SYSTEM_PROMPT_PLAIN = `Olet Yoron ohjausmoottorin AI-opinto-ohjaaja. Autat nuoria pohtimaan opintoja ja työtä testin tulosten perusteella.

Säännöt:
- Tunnet nuoren vastaukset — ne ovat kontekstissa.
- Tämä ei ole uraennuste eikä arvosana. Älä sano "sinun pitää".
- Ehdota seuraavia askelia: TET, Opintopolku, Ohjaamo.
- Vastaa lyhyesti ja selkokielellä.
- Jos et tiedä, ohjaa oikeaan ihmiseen (opettaja, Ohjaamo).`;

function buildSystemPrompt(context = {}) {
  const base = context.plainLanguage ? SYSTEM_PROMPT_PLAIN : SYSTEM_PROMPT_FI;
  return `${base}

--- NUOREN TESTITULOS (JSON) ---
${JSON.stringify(context, null, 2)}`;
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, 1200),
    }))
    .filter((m) => m.content.length > 0)
    .slice(-24);
}

exports.ohjausmoottoriAdvisor = onCall(
  { secrets: [geminiApiKey], cors: true, maxInstances: 15, timeoutSeconds: 60 },
  async (request) => {
    const apiKey = geminiApiKey.value();
    if (!apiKey) {
      throw new HttpsError('failed-precondition', 'AI-opinto-ohjaaja ei ole vielä käytössä.');
    }

    const { messages, context } = request.data || {};
    const safeMessages = sanitizeMessages(messages);
    if (!safeMessages.length) {
      throw new HttpsError('invalid-argument', 'Viestejä ei ole.');
    }

    const contents = safeMessages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: { parts: [{ text: buildSystemPrompt(context || {}) }] },
      contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 900,
        topP: 0.9,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini error', res.status, errText.slice(0, 500));
      throw new HttpsError('internal', 'AI-vastaus epäonnistui. Yritä hetken päästä uudelleen.');
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();
    if (!reply) {
      throw new HttpsError('internal', 'AI ei palauttanut vastausta. Kokeile uudelleen.');
    }

    return { reply };
  },
);
