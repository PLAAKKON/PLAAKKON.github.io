import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

export type TyoymparistoTunniste = string;

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

const pistekartta: Record<string, Record<string, number>> = {
  Q1a: { L1P: 2 }, Q1b: { L2P: 2 }, Q1c: { L3P: 1 }, Q1d: { L5P: 2 }, Q1e: { L6P: 2 },
  Q2a: { L1P: 2 }, Q2b: { L2P: 2 }, Q2c: { L3P: 1 }, Q2d: { L5P: 1 },
  Q3a: { L2P: 1 }, Q3b: { L1P: 2 }, Q3c: { L4P: 2 }, Q3d: { L6P: 2 },
  Q4a: { L1P: 2 }, Q4b: { L2P: 1 }, Q4c: { L5P: 1 }, Q4d: { L6P: 2 },
  Q5a: { L3P: 2 }, Q5b: { L3P: 1 }, Q5c: { L2P: 1 }, Q5d: { L1P: 1 }, Q5e: {},
  Q6a: { L6P: 2 }, Q6b: { L5P: 1 }, Q6c: { L4P: 2 }, Q6d: {},
  Q7a: { L1P: 1 }, Q7b: { L2P: 1 }, Q7c: { L3P: 2 },
  Q8a: { L6P: 2 }, Q8b: { L6P: 1 }, Q8c: { L4P: 1 }, Q8d: { L1P: 1 }, Q8e: {},
  Q9a: { L3P: 2 }, Q9b: { L3P: 1 }, Q9c: { L6P: 2 }, Q9d: {},
  Q10a: { L6P: 2 }, Q10b: { L5P: 1 }, Q10c: { L2P: 1 },
};

const ammatit: Record<string, string> = {
  L1P: 'Varastotyöntekijä ja logistiikan avustaja',
  L2P: 'Pakkaaja ja tuotantotyöntekijä',
  L3P: 'Rakennus- ja kiinteistöalan työntekijä',
  L4P: 'Metsätyöntekijä ja ympäristönhoitaja',
  L5P: 'Postinjakaja ja lähettityöntekijä',
  L6P: 'Siivooja ja puhtauspalvelualan työntekijä',
  L7P: 'Tekninen työntekijä ja kunnossapitäjä',
  L8P: 'Myyjä ja kassatyöntekijä',
  L9P: 'Tarjoilija ja keittiötyöntekijä',
  L10P: 'Lähihoitaja ja lastenhoitaja',
  L11P: 'Koulunkäynnin avustaja ja lastentarhanopettaja',
  L12P: 'Graafinen suunnittelija ja freelancer-graafikko',
  L13P: 'Sisällöntuottaja ja kääntäjä',
  L14P: 'Data-analyytikko ja ohjelmistokehittäjä',
  L15P: 'Laboratorialan työntekijä tai prosessien kehittäjä',
  L16P: 'Asiakaspalvelija ja puhelinasiakaspalvelija',
  L17P: 'Myyntiedustaja ja markkinointikoordinaattori',
  L18P: 'Rekrytointikoordinaattori ja henkilöstöavustaja',
  L19P: 'Toimistotyöntekijä ja taloushallinnon asiantuntija',
  L20P: 'Tekninen huoltaja ja kunnossapitotyöntekijä',
  L21P: 'Kehitysinsinööri ja tuotantoinsinööri',
  L22P: 'Projektipäällikkö ja logistiikkasuunnittelija',
  L23P: 'IT-tukihenkilö ja systeemisuunnittelija',
  L24P: 'Freelancer-valokuvaaja ja kirjoittaja',
  L25P: 'Yrittäjä ja konsultti',
  L26P: 'Lyhytkoulutukset',
  L27P: 'Tietotekniikka- ja digiosaamisen kehittäminen',
  L28P: 'Johtamisen ja proj. hallinnan täydennyskoulutus',
  L29P: 'CV:n päivittäminen ja työnhakuvalmennus',
  L30P: 'Paikalliset työnhakuportaalit ja verkostoituminen',
  L31P: 'Työvoimapalvelut ja uravalmennus',
  L32P: 'Työsuhdemuotojen uudelleen arviointi',
};

function laskeTarkkaProfiili(vastaukset: Record<string, string>): string {
  const summat: Record<string, number> = {};

  for (const [kysymys, vaihtoehto] of Object.entries(vastaukset)) {
    const tunniste = `${kysymys}${vaihtoehto}`;
    const pisteet = pistekartta[tunniste];
    if (!pisteet) continue;
    for (const avain in pisteet) {
      summat[avain] = (summat[avain] || 0) + pisteet[avain];
    }
  }

  const top = Object.entries(summat).sort((a, b) => b[1] - a[1]);
  if (top.length === 0) return 'Ei profiilia vielä (ei kertynyt pisteitä)';

  return (
    'Suositellut ammatit:\n' +
    top
      .slice(0, 5)
      .map(([avain, arvo], i) => `• ${ammatit[avain] || avain} (${avain}): ${arvo} pistettä`)
      .join('\n')
  );
}

export default function TyoymparistoProfiili() {
  const [vastaukset, setVastaukset] = useState<Record<string, string>>({});
  const [tulos, setTulos] = useState<string>('');

  const tallenna = () => {
    setTulos(laskeTarkkaProfiili(vastaukset));
  };

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
        {tulos && <pre className="mt-4 text-lg font-semibold text-blue-700 whitespace-pre-line">{tulos}</pre>}
      </CardContent>
    </Card>
  );
}