/**
 * Ohjausmoottori — Yoro Valmentaja
 *
 * Käyttää samaa OpenAI-avainta kuin LxP-profilointi:
 * Firestore asetukset/ai-avain (kenttä openai) projektissa urapolku-7780a.
 *
 * Deploy:
 *   cd functions && npm install
 *   firebase deploy --only functions:ohjausmoottoriAdvisor --project urapolku-7780a
 */
const admin = require('firebase-admin');
const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');

setGlobalOptions({ region: 'europe-west1', maxInstances: 20 });

if (!admin.apps.length) {
  admin.initializeApp();
}

const OPENAI_MODEL = 'gpt-3.5-turbo';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

let cachedOpenAiKey = null;
let cachedOpenAiKeyAt = 0;
const KEY_CACHE_MS = 5 * 60 * 1000;

const SYSTEM_PROMPT_FI = `Olet Yoro Valmentaja — Yoron ohjausmoottorin tekoälyvalmentaja. Autat nuoria ja työnhakijoita (noin 14–30-vuotiaita) pohtimaan uraa, koulutusta ja työllistymistä testitulosten pohjalta.

Säännöt:
- Tunnet nuoren testivastaukset ja tulokset — ne on annettu kontekstissa. Viittaa niihin luontevasti.
- Tämä EI ole uraennuste, älykkyystesti eikä diagnoosi. Älä koskaan sano "sinun pitää" tai "et sovellu".
- Ehdota käytännön askelia: TET, Opintopolku, Ohjaamo, Työmarkkinatori — tarpeen mukaan.
- Kun nuori pyytää henkilökohtaista työllistymissuunnitelmaa, lisäkoulutusvaihtoehtoja tai apua työllistymiseen, kysy tarvittaessa yksi tai kaksi asiaa kerrallaan (älä luettele kaikkia kysymyksiä yhtenä pitkänä listana):
  • miltä alueelta hän etsii työtä (kaupunki tai maakunta)
  • mikä on koulutustausta
  • mistä hänellä on työkokemusta
- Jos nämä tiedot tulevat vastauksissa, älä kysy uudelleen — käytä niitä suunnitelmassa.
- Yhdistä testitulos (työtyyli, polut, kiinnostus) ja nuoren kertomat tiedot työllistymissuunnitelmaan tai koulutusehdotuksiin.
- Jos kontekstissa on aspirationMismatch, mainitse lempeästi että näkyvä asiakaspalvelu voi tuntua aluksi raskaalta — ehdota TETiä tai taustarooleja.
- Vastaa lyhyesti (2–5 kappaletta), nuorelle sopivalla kielellä.
- Jos et tiedä, sano rehellisesti ja ohjaa ihmisohjaajaan (koulu, Ohjaamo).`;

const SYSTEM_PROMPT_PLAIN = `Olet Yoro Valmentaja — Yoron tekoälyvalmentaja. Autat nuoria ja työnhakijoita pohtimaan työtä, koulutusta ja työllistymistä testin tulosten perusteella.

Säännöt:
- Tunnet nuoren testivastaukset — ne ovat kontekstissa.
- Tämä ei ole uraennuste eikä arvosana. Älä sano "sinun pitää".
- Kun nuori haluaa työllistymissuunnitelman, koulutusvaihtoehtoja tai apua työhön, kysy tarvittaessa: mistä alueelta etsii työtä, mikä on koulutus ja mistä on työkokemusta. Kysy yksi asia kerrallaan.
- Ehdota seuraavia askelia: TET, Opintopolku, Ohjaamo, Työmarkkinatori.
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

async function getOpenAiKey() {
  const now = Date.now();
  if (cachedOpenAiKey && now - cachedOpenAiKeyAt < KEY_CACHE_MS) {
    return cachedOpenAiKey;
  }

  const doc = await admin.firestore().collection('asetukset').doc('ai-avain').get();
  const key = doc.data()?.openai;
  if (!key || typeof key !== 'string') {
    const err = new Error('Yoro Valmentaja ei ole vielä käytössä.');
    err.status = 503;
    throw err;
  }

  cachedOpenAiKey = key;
  cachedOpenAiKeyAt = now;
  return key;
}

async function callOpenAi(apiKey, context, safeMessages) {
  const body = {
    model: OPENAI_MODEL,
    messages: [
      { role: 'system', content: buildSystemPrompt(context || {}) },
      ...safeMessages.map((m) => ({ role: m.role, content: m.content })),
    ],
    max_tokens: 900,
    temperature: 0.65,
  };

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('OpenAI error', res.status, errText.slice(0, 500));
    const err = new Error('AI-vastaus epäonnistui. Yritä hetken päästä uudelleen.');
    err.status = 502;
    throw err;
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    const err = new Error('AI ei palauttanut vastausta. Kokeile uudelleen.');
    err.status = 502;
    throw err;
  }

  return reply;
}

async function runAdvisor({ messages, context }) {
  const safeMessages = sanitizeMessages(messages);
  if (!safeMessages.length) {
    const err = new Error('Viestejä ei ole.');
    err.status = 400;
    throw err;
  }

  const apiKey = await getOpenAiKey();
  return callOpenAi(apiKey, context, safeMessages);
}

/** HTTP API — sama malli kuin LxP:n analysoi (toimii yoro.fi:stä ilman callable-SDK:ta) */
exports.ohjausmoottoriAdvisor = onRequest(
  { cors: true, maxInstances: 15, timeoutSeconds: 60 },
  async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Vain POST-pyynnöt sallittu' });
      return;
    }

    try {
      const reply = await runAdvisor(req.body || {});
      res.json({ reply });
    } catch (err) {
      console.error('ohjausmoottoriAdvisor error', err?.message || err);
      res.status(err.status || 500).json({ error: err.message || 'AI-vastaus epäonnistui' });
    }
  },
);
