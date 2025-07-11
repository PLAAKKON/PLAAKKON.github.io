import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type TyoymparistoTunniste =
  | 'Fyysinen ja itsenäinen työ'
  | 'Ei-fyysinen ja rauhallinen työ'
  | 'Sosiaalinen asiakastyö'
  | 'Yrittäjyys tai freelance-työ'
  | 'Asiantuntijatyö'
  | 'Yleinen toimistotyö'
  | 'Ei profiilia vielä';

const kysymykset = [
  {
    id: 'Q1',
    kysymys: 'Kuinka haluat tehdä työtä?',
    vaihtoehdot: [
      { label: 'Itsenäisesti ja voin itse tutustua työohjeisiin.', pisteet: { itsenainen: 2 } },
      { label: 'Itsenäisesti, mutta haluan hyvän perehdytyksen.', pisteet: { itsenainen: 1 } },
      { label: 'Itsenäisesti ja ohjatusti.', pisteet: { ohjattu: 1 } },
      { label: 'Toisten henkilöiden kanssa vähällä ohjauksella.', pisteet: { sosiaalinen: 1, itsenainen: 1 } },
      { label: 'Toisten henkilöiden kanssa, mutta haluan tarkat ohjeet.', pisteet: { ohjattu: 2, sosiaalinen: 1 } },
    ],
  },
  {
    id: 'Q2',
    kysymys: 'Minkä verran haluat, että työssä on fyysisyyttä?',
    vaihtoehdot: [
      { label: 'Työ voi olla fyysisesti raskasta.', pisteet: { fyysinen: 2 } },
      { label: 'Työ voisi olla pääasiassa fyysistä.', pisteet: { fyysinen: 1 } },
      { label: 'Työ voisi olla pääasiassa toimistotyötä.', pisteet: { eiFyysinen: 1 } },
      { label: 'Toivon toimistotyötä, jossa ei ole fyysisiä tehtäviä.', pisteet: { eiFyysinen: 2 } },
    ],
  },
  {
    id: 'Q3',
    kysymys: 'Missä ympäristössä haluat työskennellä?',
    vaihtoehdot: [
      { label: 'Sisätiloissa (toimisto, varasto, tehdas).', pisteet: { sisatila: 1 } },
      { label: 'Ulkona ja liikkuvassa työssä.', pisteet: { ulkotyo: 2 } },
      { label: 'Vaihteleva ympäristö (sisä- ja ulkotyö).', pisteet: { vaihteleva: 2 } },
      { label: 'Asiakaspalvelupisteessä tai sosiaalisessa ympäristössä.', pisteet: { sosiaalinen: 2 } },
    ],
  },
  {
    id: 'Q4',
    kysymys: 'Minkä verran haluat vuorovaikutusta muiden kanssa?',
    vaihtoehdot: [
      { label: 'Haluan työskennellä täysin itsenäisesti.', pisteet: { itsenainen: 2 } },
      { label: 'Haluan työskennellä pääasiassa itsenäisesti.', pisteet: { itsenainen: 1 } },
      { label: 'Haluan työskennellä pääasiassa toisten kanssa.', pisteet: { sosiaalinen: 1 } },
      { label: 'Haluan työskennellä muiden ihmisten kanssa.', pisteet: { sosiaalinen: 2 } },
    ],
  },
  {
    id: 'Q5',
    kysymys: 'Haluatko käyttää tietotekniikkaa työssäsi?',
    vaihtoehdot: [
      { label: 'Käytän mielelläni tietotekniikkaa osana työtä.', pisteet: { digi: 2 } },
      { label: 'Tietotekniikka voisi olla osa työtä, mutta ei pääosassa.', pisteet: { digi: 1 } },
      { label: 'Haluan, että työssä on vain vähän tietotekniikkaa.', pisteet: { eiDigi: 1 } },
      { label: 'En halua käyttää tietotekniikkaa työssä.', pisteet: { eiDigi: 2 } },
      { label: 'Ei merkitystä.', pisteet: {} },
    ],
  },
  {
    id: 'Q6',
    kysymys: 'Kuinka tärkeänä pidät työajan joustavuutta?',
    vaihtoehdot: [
      { label: 'Haluan täysin joustavat työajat.', pisteet: { joustava: 2 } },
      { label: 'Työajoissa olisi hyvä olla joustavuutta.', pisteet: { joustava: 1 } },
      { label: 'Kiinteät työajat sopivat minulle parhaiten.', pisteet: { kiintea: 2 } },
      { label: 'Minulle ei ole väliä.', pisteet: {} },
    ],
  },
  {
    id: 'Q7',
    kysymys: 'Minkälainen koulutus sinulla on?',
    vaihtoehdot: [
      { label: 'Ei erityistä koulutusta.', pisteet: { perustaso: 2 } },
      { label: 'Ammatillinen tai kaupallinen peruskoulutus.', pisteet: { perustaso: 1 } },
      { label: 'Ammattikorkeakoulutus tai korkeakoulutus.', pisteet: { korkea: 2 } },
    ],
  },
  {
    id: 'Q8',
    kysymys: 'Haluatko opetella uusia taitoja tai vaihtaa alaa?',
    vaihtoehdot: [
      { label: 'Kyllä, olen valmis opiskelemaan ja vaihtamaan alaa.', pisteet: { kehittyminen: 2 } },
      { label: 'Kyllä, olen valmis opiskelemaan, mutta en vaihda alaa.', pisteet: { kehittyminen: 1 } },
      { label: 'En ole valmis opiskelemaan, mutta voin vaihtaa alaa.', pisteet: { muutos: 1 } },
      { label: 'En ole valmis opiskelemaan, enkä vaihtamaan alaa.', pisteet: { muutos: 0 } },
      { label: 'En osaa sanoa.', pisteet: {} },
    ],
  },
  {
    id: 'Q9',
    kysymys: 'Kuinka tärkeää sinulle on työn vakinaisuus?',
    vaihtoehdot: [
      { label: 'Etsin vakituista työtä.', pisteet: { vakituinen: 2 } },
      { label: 'Etsin työtä myös määräaikaisten töiden joukosta.', pisteet: { vakituinen: 1 } },
      { label: 'Freelancer-työ sopisi minulle.', pisteet: { yrittaja: 2 } },
      { label: 'Minulle ei ole väliä työn vakinaisuudesta.', pisteet: {} },
    ],
  },
  {
    id: 'Q10',
    kysymys: 'Kuinka haluat kehittyä ja oppia työssäsi?',
    vaihtoehdot: [
      { label: 'Haluan jatkuvaa koulutusta ja kehitystä työssäni.', pisteet: { kehittyminen: 2 } },
      { label: 'Voin kehittää itseäni, mutta en halua jatkuvaa opettelua.', pisteet: { kehittyminen: 1 } },
      { label: 'Haluan, että työssäni riittää nykyiset taitoni.', pisteet: { eiKehittyminen: 1 } },
    ],
  },
];

function laskeProfiili(vastaukset: Record<string, number>): TyoymparistoTunniste {
  const summat: Record<string, number> = {};

  for (const qid in vastaukset) {
    const vaihtoehto = kysymykset.find(k => k.id === qid)?.vaihtoehdot[vastaukset[qid]];
    if (!vaihtoehto) continue;
    for (const avain in vaihtoehto.pisteet) {
      summat[avain] = (summat[avain] || 0) + vaihtoehto.pisteet[avain];
    }
  }

  const max = Object.entries(summat).sort((a, b) => b[1] - a[1])[0];
  if (!max) return 'Ei profiilia vielä';

  switch (max[0]) {
    case 'fyysinen': return 'Fyysinen ja itsenäinen työ';
    case 'eiFyysinen': return 'Ei-fyysinen ja rauhallinen työ';
    case 'sosiaalinen': return 'Sosiaalinen asiakastyö';
    case 'yrittaja': return 'Yrittäjyys tai freelance-työ';
    case 'asiantuntija': return 'Asiantuntijatyö';
    default: return 'Yleinen toimistotyö';
  }
}

export default function TyoymparistoProfiili() {
  const [vastaukset, setVastaukset] = useState<Record<string, number>>({});
  const [tulos, setTulos] = useState<TyoymparistoTunniste>('');

  const tallenna = () => {
    setTulos(laskeProfiili(vastaukset));
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 space-y-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Tee henkilökuva ja työprofiili</h2>
        {kysymykset.map((k, i) => (
          <div key={k.id} className="mb-6">
            <p className="font-medium mb-2">{i + 1}. {k.kysymys}</p>
            <RadioGroup onValueChange={(val) => setVastaukset(prev => ({ ...prev, [k.id]: parseInt(val) }))}>
              {k.vaihtoehdot.map((v, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(idx)} id={`${k.id}_${idx}`} />
                  <label htmlFor={`${k.id}_${idx}`}>{v.label}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button onClick={tallenna}>Näytä profiili</Button>
        {tulos && <p className="mt-4 text-lg font-semibold text-blue-700">Suositeltu työympäristö: {tulos}</p>}
      </CardContent>
    </Card>
  );
}
