// Valmis profiilityökalu: näyttää vain suositellut ammatit (check_mark-logiikka)
import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

export type TyoymparistoTunniste = string;

export default function Profilointi() {
  // State for each question's answer (values: 'a', 'b', 'c', etc., or '' if not answered yet)
  const [vastaus1, setVastaus1] = useState('');
  const [vastaus2, setVastaus2] = useState('');
  const [vastaus3, setVastaus3] = useState('');
  const [vastaus4, setVastaus4] = useState('');
  const [vastaus5, setVastaus5] = useState('');
  const [vastaus6, setVastaus6] = useState('');
  const [vastaus7, setVastaus7] = useState('');
  const [vastaus8, setVastaus8] = useState('');
  const [vastaus9, setVastaus9] = useState('');
  const [vastaus10, setVastaus10] = useState('');
  const [tulokset, setTulokset] = useState<{ nimi: string; pisteet: number }[]>([]);

const kysymykset = [
  { id: 'Q1', kysymys: 'Kuinka haluat tehdä työtä?', vaihtoehdot: [
    { id: 'a', label: 'Itsenäisesti ja voin itse tutustua työohjeisiin.' },
    { id: 'b', label: 'Itsenäisesti, mutta haluan hyvän perehdytyksen.' },
    { id: 'c', label: 'Itsenäisesti ja ohjatusti.' },
    { id: 'd', label: 'Toisten henkilöiden kanssa vähällä ohjauksella.' },
    { id: 'e', label: 'Toisten henkilöiden kanssa, mutta haluan tarkat ohjeet.' },
  ] },
  { id: 'Q2', kysymys: 'Minkä verran haluat, että työssä on fyysisyyttä?', vaihtoehdot: [
    { id: 'a', label: 'Työ voi olla fyysisesti raskasta.' },
    { id: 'b', label: 'Työ voisi olla pääasiassa fyysistä.' },
    { id: 'c', label: 'Työ voisi olla pääasiassa toimistotyötä.' },
    { id: 'd', label: 'Toivon toimistotyötä, jossa ei ole fyysisiä tehtäviä.' },
  ] },
  { id: 'Q3', kysymys: 'Missä ympäristössä haluat työskennellä?', vaihtoehdot: [
    { id: 'a', label: 'Sisätiloissa (toimisto, varasto, tehdas).' },
    { id: 'b', label: 'Ulkona ja liikkuvassa työssä.' },
    { id: 'c', label: 'Vaihteleva ympäristö (sisä- ja ulkotyö).' },
    { id: 'd', label: 'Asiakaspalvelupisteessä tai sosiaalisessa ympäristössä.' },
  ] },
  { id: 'Q4', kysymys: 'Minkä verran haluat vuorovaikutusta muiden kanssa?', vaihtoehdot: [
    { id: 'a', label: 'Haluan työskennellä täysin itsenäisesti.' },
    { id: 'b', label: 'Haluan työskennellä pääasiassa itsenäisesti.' },
    { id: 'c', label: 'Haluan työskennellä pääasiassa toisten kanssa.' },
    { id: 'd', label: 'Haluan työskennellä muiden ihmisten kanssa.' },
  ] },
  { id: 'Q5', kysymys: 'Haluatko käyttää tietotekniikkaa työssäsi?', vaihtoehdot: [
    { id: 'a', label: 'Käytän mielelläni tietotekniikkaa osana työtä.' },
    { id: 'b', label: 'Tietotekniikka voisi olla osa työtä, mutta ei pääosassa.' },
    { id: 'c', label: 'Haluan, että työssä on vain vähän tietotekniikkaa.' },
    { id: 'd', label: 'En halua käyttää tietotekniikkaa työssä.' },
    { id: 'e', label: 'Ei merkitystä.' },
  ] },
  { id: 'Q6', kysymys: 'Kuinka tärkeänä pidät työajan joustavuutta?', vaihtoehdot: [
    { id: 'a', label: 'Haluan täysin joustavat työajat.' },
    { id: 'b', label: 'Työajoissa olisi hyvä olla joustavuutta.' },
    { id: 'c', label: 'Kiinteät työajat sopivat minulle parhaiten.' },
    { id: 'd', label: 'Minulle ei ole väliä.' },
  ] },
  { id: 'Q7', kysymys: 'Minkälainen koulutus sinulla on?', vaihtoehdot: [
    { id: 'a', label: 'Ei erityistä koulutusta.' },
    { id: 'b', label: 'Ammatillinen tai kaupallinen peruskoulutus.' },
    { id: 'c', label: 'Ammattikorkeakoulutus tai korkeakoulutus.' },
  ] },
  { id: 'Q8', kysymys: 'Haluatko opetella uusia taitoja tai vaihtaa alaa?', vaihtoehdot: [
    { id: 'a', label: 'Kyllä, olen valmis opiskelemaan ja vaihtamaan alaa.' },
    { id: 'b', label: 'Kyllä, olen valmis opiskelemaan, mutta en vaihda alaa.' },
    { id: 'c', label: 'En ole valmis opiskelemaan, mutta voin vaihtaa alaa.' },
    { id: 'd', label: 'En ole valmis opiskelemaan, enkä vaihtamaan alaa.' },
    { id: 'e', label: 'En osaa sanoa.' },
  ] },
  { id: 'Q9', kysymys: 'Kuinka tärkeää sinulle on työn vakinaisuus?', vaihtoehdot: [
    { id: 'a', label: 'Etsin vakituista työtä.' },
    { id: 'b', label: 'Etsin työtä myös määräaikaisten töiden joukosta.' },
    { id: 'c', label: 'Freelancer-työ sopisi minulle.' },
    { id: 'd', label: 'Minulle ei ole väliä työn vakinaisuudesta.' },
  ] },
  { id: 'Q10', kysymys: 'Kuinka haluat kehittyä ja oppia työssäsi?', vaihtoehdot: [
    { id: 'a', label: 'Haluan jatkuvaa koulutusta ja kehitystä työssäni.' },
    { id: 'b', label: 'Voin kehittää itseäni, mutta en halua jatkuvaa opettelua.' },
    { id: 'c', label: 'Haluan, että työssäni riittää nykyiset taitoni.' },
  ] },
];

const pistekartta: Record<string, Record<number, number>> = {
  Q1a: { 13: 2 }, Q1b: { 2: 1 }, Q1c: { 3: 1 }, Q1d: { 5: 1 }, Q1e: { 6: 1 },
  Q2a: { 1: 2 }, Q2b: { 2: 2 }, Q2c: { 3: 1 }, Q2d: { 5: 1 },
  Q3a: { 2: 1 }, Q3b: { 1: 2 }, Q3c: { 4: 2 }, Q3d: { 6: 2 },
  Q4a: { 1: 2 }, Q4b: { 2: 1 }, Q4c: { 5: 1 }, Q4d: { 6: 2 },
  Q5a: { 3: 2 }, Q5b: { 3: 1 }, Q5c: { 2: 1 }, Q5d: { 1: 1 }, Q5e: {},
  Q6a: { 6: 2 }, Q6b: { 5: 1 }, Q6c: { 4: 2 }, Q6d: {},
  Q7a: { 1: 1 }, Q7b: { 2: 1 }, Q7c: { 3: 2 },
  Q8a: { 6: 2 }, Q8b: { 6: 1 }, Q8c: { 4: 1 }, Q8d: { 1: 1 }, Q8e: {},
  Q9a: { 3: 2 }, Q9b: { 3: 1 }, Q9c: { 6: 2 }, Q9d: {},
  Q10a: { 6: 2 }, Q10b: { 5: 1 }, Q10c: { 2: 1 },
};

const ammatit = [
    'Varastotyöntekijä ja logistiikan avustaja', // L1P
    'Pakkaaja ja tuotantotyöntekijä', // L2P
    'Rakennus- ja kiinteistöalan työntekijä', // L3P
    'Metsätyöntekijä ja ympäristönhoitaja', // L4P
    'Postinjakaja ja lähettityöntekijä', // L5P
    'Siivooja ja puhtauspalvelualan työntekijä', // L6P
    'Tekninen työntekijä ja kunnossapitäjä', // L7P
    'Myyjä ja kassatyöntekijä', // L8P
    'Tarjoilija ja keittiötyöntekijä', // L9P
    'Lähihoitaja ja lastenhoitaja', // L10P
    'Koulunkäynnin avustaja ja lastentarhanopettaja', // L11P
    'Graafinen suunnittelija ja freelancer-graafikko', // L12P
    'Sisällöntuottaja ja kääntäjä', // L13P
    'Data-analyytikko ja ohjelmistokehittäjä', // L14P
    'Laboratorialan työntekijä tai prosessien kehittäjä', // L15P
    'Asiakaspalvelija ja puhelinasiakaspalvelija', // L16P
    'Myyntiedustaja ja markkinointikoordinaattori', // L17P
    'Rekrytointikoordinaattori ja henkilöstöavustaja', // L18P
    'Toimistotyöntekijä ja taloushallinnon asiantuntija', // L19P
    'Tekninen huoltaja ja kunnossapitotyöntekijä', // L20P
    'Kehitysinsinööri ja tuotantoinsinööri', // L21P
    'Projektipäällikkö ja logistiikkasuunnittelija', // L22P
    'IT-tukihenkilö ja systeemisuunnittelija', // L23P
    'Freelancer-valokuvaaja ja kirjoittaja', // L24P
    'Yrittäjä ja konsultti', // L25P
    'Lyhytkoulutukset', // L26P
    'Tietotekniikka- ja digiosaamisen kehittäminen', // L27P
    'Johtamisen ja proj. hallinnan täydennyskoulutus', // L28P
    'CV:n päivittäminen ja työnhakuvalmennus', // L29P
    'Paikalliset työnhakuportaalit ja verkostoituminen', // L30P
    'Työvoimapalvelut ja uravalmennus', // L31P
    'Työsuhdemuotojen uudelleen arviointi', // L32P
  ];

const rajat = [
  14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,
  14,14,14,14,14,14,14,14,14,14,16,16,16,16,16,16 // rajat per L1P–L32P
];

  // Kombinaatiot (esim. Q1a + Q5a → +1 piste L14P)
  if (v.Q1 === 'a' && v.Q5 === 'a') pisteet[13]++;
  if (v.Q1 === 'a' && v.Q6 === 'a') pisteet[24]++;
  if (v.Q6 === 'a' && v.Q9 === 'c') pisteet[24]++;
  if (v.Q8 === 'a' && v.Q10 === 'a') pisteet[24]++;
  if (v.Q3 === 'a' && v.Q10 === 'a') pisteet[13]++;
  if (v.Q7 === 'c' && v.Q8 === 'b') pisteet[20] += 2;
  if (v.Q4 === 'b' && v.Q10 === 'a') pisteet[20] += 2;

  // Vähennykset koulutustasosta
  if (v.Q7 === 'a') {
    [11,12,13,14,16,18,20,21,22].forEach(i => pisteet[i] -= i < 20 ? 2 : 3);
  }
  if (v.Q7 === 'b') {
    pisteet[11]--;
    pisteet[12]--;
    pisteet[13]--;
    pisteet[16] -= 2;
    pisteet[18] -= 2;
    pisteet[20] -= 3;
    pisteet[21] -= 2;
    pisteet[22]--;
  }

  const tulokset = pisteet.map((p, i) => ({
    indeksi: i,
    ammatti: ammatit[i] || `Ammatti ${i+1}`,
    pisteet: p,
    raja: rajat[i] || 14,
    sopii: p >= (rajat[i] || 14),
  })).filter(t => t.sopii);

  return tulokset;
}

export default function TyoymparistoProfiili() {
  const [vastaukset, setVastaukset] = useState<Record<string, string>>({});
  const [tulokset, setTulokset] = useState<string[]>([]);

function laskeProfiili(v: Record<string, string>) {
  const pisteet: number[] = Array(32).fill(0);

  for (const [kysymys, vastaus] of Object.entries(v)) {
    const avain = `${kysymys}${vastaus}`;
    const lisatyt = pistekartta[avain];
    if (lisatyt) {
      for (const [i, p] of Object.entries(lisatyt)) {
        pisteet[parseInt(i)] += p;
      }
    }
  }

  return (
    <div>
      {/* JSX */}
    </div>
  );
}

  return (
    <Card className="max-w-3xl mx-auto p-6 space-y-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Tee henkilökuva ja työprofiili</h2>
        {kysymykset.map((k, i) => (
          <div key={k.id} className="mb-6">
            <p className="font-medium mb-2">{i + 1}. {k.kysymys}</p>
            <RadioGroup onValueChange={(val) => setVastaukset(prev => ({ ...prev, [k.id]: val }))}>
              {k.vaihtoehdot.map((v) => (
                <div key={v.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={v.id} id={`${k.id}_${v.id}`} />
                  <label htmlFor={`${k.id}_${v.id}`}>{v.label}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button onClick={tallenna}>Näytä profiili</Button>
        {tulokset.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-bold">Suositellut ammatit:</h3>
            {tulokset.map((t, i) => (
              <div key={i} className="text-green-700">✅ {t.ammatti} ({t.pisteet} pistettä)</div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
}