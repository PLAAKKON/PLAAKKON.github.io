import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type TyoymparistoTunniste = string;

const kysymykset = [
  { id: 'Q1', kysymys: 'Kuinka haluat tehdä työtä?', vaihtoehdot: ['a', 'b', 'c', 'd', 'e'] },
  { id: 'Q2', kysymys: 'Minkä verran haluat, että työssä on fyysisyyttä?', vaihtoehdot: ['a', 'b', 'c', 'd'] },
  { id: 'Q3', kysymys: 'Missä ympäristössä haluat työskennellä?', vaihtoehdot: ['a', 'b', 'c', 'd'] },
  { id: 'Q4', kysymys: 'Minkä verran haluat vuorovaikutusta muiden kanssa?', vaihtoehdot: ['a', 'b', 'c', 'd'] },
  { id: 'Q5', kysymys: 'Haluatko käyttää tietotekniikkaa työssäsi?', vaihtoehdot: ['a', 'b', 'c', 'd', 'e'] },
  { id: 'Q6', kysymys: 'Kuinka tärkeänä pidät työajan joustavuutta?', vaihtoehdot: ['a', 'b', 'c', 'd'] },
  { id: 'Q7', kysymys: 'Minkälainen koulutus sinulla on?', vaihtoehdot: ['a', 'b', 'c'] },
  { id: 'Q8', kysymys: 'Haluatko opetella uusia taitoja tai vaihtaa alaa?', vaihtoehdot: ['a', 'b', 'c', 'd', 'e'] },
  { id: 'Q9', kysymys: 'Kuinka tärkeää sinulle on työn vakinaisuus?', vaihtoehdot: ['a', 'b', 'c', 'd'] },
  { id: 'Q10', kysymys: 'Kuinka haluat kehittyä ja oppia työssäsi?', vaihtoehdot: ['a', 'b', 'c'] },
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

const profiilityypit: Record<string, string> = {
  L1P: 'Fyysinen ja itsenäinen työ',
  L2P: 'Fyysinen ja ohjattu työ',
  L3P: 'Toimisto / tekninen asiantuntija',
  L4P: 'Rutiinityö tai suoritepainotteinen',
  L5P: 'Palvelualat / asiakastyö',
  L6P: 'Itsenäinen asiantuntijatyö tai yrittäjyys',
};

function laskeTarkkaProfiili(vastaukset: Record<string, string>): TyoymparistoTunniste {
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
  if (top.length === 0) return 'Ei profiilia vielä';

  return top.slice(0, 3).map(([avain, arvo], i) => {
    const label = profiilityypit[avain] || avain;
    return `${i + 1}. ${label} (${avain}): ${arvo} pistettä`;
  }).join('\n');
}

export default function TyoymparistoProfiili() {
  const [vastaukset, setVastaukset] = useState<Record<string, string>>({});
  const [tulos, setTulos] = useState<TyoymparistoTunniste>('');

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
                <div key={v} className="flex items-center space-x-2">
                  <RadioGroupItem value={v} id={`${k.id}_${v}`} />
                  <label htmlFor={`${k.id}_${v}`}>{v})</label>
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
