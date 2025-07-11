'use client';

import { useState } from 'react';

type PointsMap = Record<number, number>;

interface AnswerOption {
  value: string;
  text: string;
  points: PointsMap;
}

interface QuestionItem {
  num: number;
  text: string;
  answers: AnswerOption[];
}

interface Profession {
  id: number;
  name: string;
}

// Lista ammateista (ammatinnimiä voi muuttaa tarvittaessa)
const professions: Profession[] = [
  { id: 1, name: 'Fyysinen varasto- ja logistiikka-aputyö ISCO 93, TK10 933' },
  { id: 2, name: 'Pakkaus- ja tuotannon apu- ja kokoonpanotyö ISCO 93, TK10 932' },
  { id: 3, name: 'Rakennustyön ja kiinteistöhuollon avustava työ ISCO 71, TK10 711, TK10 712' },
  { id: 4, name: 'Luonnnovara- ja ympäristöalan perustyö (avustavat puisto- ja maataloustyöt) ISCO 61, TK10 611' },
  { id: 5, name: 'Posti-, lähetti- ja jakelutyö ISCO 43, TK10 441' },
  { id: 6, name: 'Puhdistus- ja siivoustyö, ISCO 91, TK10 911' },
  { id: 7, name: 'Kunnossapito- ja korjaustyön tukityö, ISCO 72, TK10 723' },
  { id: 8, name: 'Myyntityö ja kassapalvelut, ISCO 52, TK10 522' },
  { id: 9, name: 'Ravintola- ja keittiöalan perustyö, ISCO 51, TK10 512, TK10 513' },
  { id: 10, name: 'Ravintola- ja keittiöalan perustyö, ISCO 51, TK10 512, TK10 513' },
  { id: 11, name: 'Opetuksen ja koulunkäynnin tuki, ISCO 23, TK10 531' },
  { id: 12, name: 'Visuaalinen suunnittelu ja graafinen työ, ISCO 21, TK10 216' },
  { id: 13, name: 'Sisällöntuotanto ja kielityö, ISCO 26, TK10 264' },
  { id: 14, name: 'Ohjelmointi ja data-analyysi, ISCO 25, TK10 251, TK10 252' },
  { id: 15, name: 'Prosessi- ja laboratoriotyö, ISCO 31, TK10 311, TK10 312, TK10 313, TK10 315' },
  { id: 16, name: 'Asakaspalvelu- ja puhlinpalvelutyö, ISCO 42, TK10 422' },
  { id: 17, name: 'Myynnin ja markkinoinnin suunnitelu, ISCO 24, TK10 243' },
  { id: 18, name: 'Henkilöstöhallinnon tuki, ISCO 44, TK10 441, TK10 442' },
  { id: 19, name: 'Toimistotyö ja taloushallinto, ISCO 41, TK10 431' },
  { id: 20, name: 'Tekninen huolto ja järjestelmän kunnossapito, ISCO 72, TK10 741' },
  { id: 21, name: 'Tuotanto- ja kehitysinsinööri, ISCO 21, TK10 214' },
  { id: 22, name: 'Logistiikan ja projektien hallinta, ISCO 21, TK10 132-242' },
  { id: 23, name: 'IT-tuki ja systeemityö, ISCO 25, TK10 251, TK10 252' },
  { id: 24, name: 'Luova kirjoittaminen ja visuaalinen viestintä, ISCO 26, TK10 265' },
  { id: 25, name: 'Yrittäjyys ja asiantuntijakonsultointi, ISCO 12, TK10 241' },
  { id: 26, name: 'Lyhytkoulutukset ja urataidot' },
  { id: 27, name: 'Tietotekniikka- ja digiosaamisen kehittäminen' },
  { id: 28, name: 'Johtamisen ja proj. hallinnan täydennyskoulutus' },
  { id: 29, name: 'CV:n päivittäminen ja työnhakuvalmennus' },
  { id: 30, name: 'Paikalliset työnhakuportaalit ja verkostoituminen' },
  { id: 31, name: 'Työvoimapalvelut ja uravalmennus' },
  { id: 32, name: 'Työsuhdemuotojen ja työllistymisen joustomallit' }
];

export default function Profilointi() {
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(10).fill(null));
  const [showResults, setShowResults] = useState<boolean>(false);
  const [resultsList, setResultsList] = useState<Profession[]>([]);
  const [writtenSummary, setWrittenSummary] = useState<string>(''); // Added this line

  const handleSelect = (questionNum: number, answerValue: string) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionNum - 1] = answerValue;
      return newAnswers;
    });
  };

// Kysymykset ja vastausvaihtoehdot pisteytyksineen
const questions: QuestionItem[] = [
  {
    num: 1,
    text: '1. Kuvaus työskentelytavastasi:',
    answers: [
      {
        value: 'a',
        text: 'Olen itsenäinen työntekijä ja perehdyn mielelläni työohjeisiin omatoimisesti.',
        points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 1, 22: 1, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'b',
        text: 'Arvostan perusteellista perehdytystä, jonka avulla voin työskennellä itsenäisesti.',
        points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'c',
        text: 'Pidän itsenäisestä työskentelystä, mutta arvostan myös säännöllistä ohjausta.',
        points: { 1: 1, 2: 1, 3: 1, 5: 1, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'd',
        text: 'Olen sosiaalinen ja viihdyn tiimityössä.',
        points: { 1: 1, 2: 1, 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'e',
        text: 'Pidän selkeästä ohjauksesta ja viihdyn tiimityössä.',
        points: { 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      }
    ]
  },
  {
    num: 2,
    text: '2. Millaista työympäristöä arvostat?',
    answers: [
      {
        value: 'a',
        text: 'Olen valmis fyysiseen ja käytännönläheiseen työhön.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 20: 2 }
      },
      {
        value: 'b',
        text: 'Pidän toiminnallisesta työstä, jossa saan olla liikkeessä.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 2, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'c',
        text: 'Pidän keskittymistä ja tarkkuutta vaativasta työstä.',
        points: { 3: 1, 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'd',
        text: 'Nautin vuorovaikutteisesta työstä sosiaalisessa ympäristössä.',
        points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      }
    ]
  },
  {
    num: 3,
    text: '3. Kumpi kuvaa sinua paremmin?',
    answers: [
      {
        value: 'a',
        text: 'Pidän työskentelystä sisätiloissa rauhallisessa ympäristössä.',
        points: { 1: 2, 2: 2, 3: 2, 5: 1, 6: 2, 8: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'b',
        text: 'Tykkään työskennellä ulkona tai liikkuvassa työssä.',
        points: { 3: 1, 4: 2, 5: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'c',
        text: 'Viihdyn vaihtelevissa työympäristöissä ja monipuolisissa tehtävissä.',
        points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'd',
        text: 'Sosiaaliset ympäristöt ja asiakaspalvelu motivoivat minua.',
        points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      }
    ]
  },
  {
    num: 4,
    text: '4. Miten suhtaudut päätöksentekoon työssä?',
    answers: [
      {
        value: 'a',
        text: 'Työskentelen mielelläni itsenäisesti ja hallitsen itse aikatauluni.',
        points: { 1: 2, 2: 2, 3: 1, 6: 2, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 1, 25: 1, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'b',
        text: 'Pidän työstä, jossa voin tehdä päätöksiä itsenäisesti, mutta tarvittaessa teen yhteistyötä.',
        points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'c',
        text: 'Työskentelen mielelläni tiimissä, jossa yhteistyö on tärkeässä roolissa.',
        points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 2, 25: 2, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'd',
        text: 'Nautin vuorovaikutuksesta ja ihmisläheisestä työstä.',
        points: { 5: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      }
    ]
  },
  {
    num: 5,
    text: '5. Suhde tietotekniikkaan työssä:',
    answers: [
      {
        value: 'a',
        text: 'Olen taitava tietotekniikan käyttäjä ja hyödynnän sujuvasti erilaisia ohjelmistoja.',
        points: { 1: 1, 2: 1, 5: 2, 7: 2, 8: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'b',
        text: 'Hyödynnän tietotekniikkaa tarvittaessa ja pidän monipuolisista tehtävistä.',
        points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 1, 7: 2, 8: 2, 9: 1, 10: 2, 11: 2, 12: 1, 13: 1, 14: 1, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'c',
        text: 'Viihdyn käytännön tekemiseen painottuvissa työtehtävissä.',
        points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 2, 7: 1, 8: 1, 9: 2, 10: 1, 11: 1, 15: 1, 16: 1 }
      },
      {
        value: 'd',
        text: 'Toivon löytäväni työn, jossa ei juuri tarvitse käyttää tietokonetta.',
        points: { 3: 2, 4: 2, 6: 2, 9: 2 }
      },
      {
        value: 'e',
        text: 'Olen joustava tehtävien suhteen, oli tietokoneen käyttöä paljon tai vähän.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      }
    ]
  },
  {
    num: 6,
    text: '6. Mitä ajattelet työajoista?',
    answers: [
      {
        value: 'a',
        text: 'Arvostan täysin joustavia työaikoja, jotka voin päättää itse.',
        points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 1, 22: 1, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'b',
        text: 'Joustavat työajat sopisivat minulle hyvin.',
        points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'c',
        text: 'Pidän kiinteistä työajoista, jotka tuovat selkeyttä arkeen.',
        points: { 3: 2, 4: 2, 7: 2, 8: 1, 9: 1, 10: 2, 11: 2, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 26: 1, 27: 1, 28: 1, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'd',
        text: 'Sopeudun sekä kiinteisiin että joustaviin aikatauluihin.',
        points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      }
    ]
  },
  {
    num: 7,
    text: '7. Mikä on koulutustaustasi?',
    answers: [
      {
        value: 'a',
        text: 'Olen oppinut työni käytännössä, ilman muodollista koulutusta.',
        points: { 12: -2, 13: -1, 14: -2, 15: -2, 17: -2, 19: -2, 21: -3, 22: -3, 23: -3 }
      },
      {
        value: 'b',
        text: 'Olen suorittanut keskiasteen koulutuksen (esim. ammattikoulu).',
        points: { 12: -1, 13: -1, 14: -1, 17: -2, 19: -2, 21: -3, 22: -2, 23: -1 }
      },
      {
        value: 'c',
        text: 'Minulla on korkeakoulututkinto.',
        points: { 23: -100 }  // Estetään tiettyjen alojen ehdotus korkeakoulutuksella
      }
    ]
  },
  {
    num: 8,
    text: '8. Miten suhtaudut alan vaihtoon ja opiskeluun?',
    answers: [
      {
        value: 'a',
        text: 'Olen avoin uusille mahdollisuuksille ja valmis opiskelemaan uutta alaa varten.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'b',
        text: 'Haluan syventää osaamistani nykyisellä alallani ja olen valmis opiskelemaan uutta.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'c',
        text: 'Olen avoin alanvaihdolle, mutta en voi sitoutua uusiin opintoihin.',
        points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'd',
        text: 'Haluan jatkaa nykyisellä alallani enkä suunnittele lisäkoulutusta.',
        points: {}  // Ei lisää pisteitä mihinkään ammattiin
      },
      {
        value: 'e',
        text: 'Olen valmis vaihtamaan alaa, jolle nykyiset taitoni riittävät (ilman uutta koulutusta).',
        points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      }
    ]
  },
  {
    num: 9,
    text: '9. Millainen työsuhde sopii sinulle parhaiten?',
    answers: [
      {
        value: 'a',
        text: 'Etsin vakituista työpaikkaa ja arvostan työn vakautta.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'b',
        text: 'Voin työskennellä sekä vakituisessa että määräaikaisessa työsuhteessa.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'c',
        text: 'Pidän freelancer-työn vapaudesta ja oman työajan hallinnasta.',
        points: { 25: 2 }
      }
    ]
  },
  {
    num: 10,
    text: '10. Miten suhtaudut osaamisen kehittämiseen työssäsi?',
    answers: [
      {
        value: 'a',
        text: 'Olen sitoutunut jatkuvaan oppimiseen ja kehitän aktiivisesti osaamistani.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'b',
        text: 'Kehitän mielelläni taitojani, kunhan tahti on kohtuullinen.',
        points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2, 7: 1, 8: 2, 9: 2, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'c',
        text: 'Haluan, että työssäni riittää nykyiset taitoni.',
        points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } 
      }
    ]
  }
];

// Yhdistelmäehdot (jos tietyt vastausyhdistelmät valittu, lisätään pisteitä)
const comboRules: { cond: { q: number; a: string }[]; add: PointsMap }[] = [
  { cond: [{ q: 1, a: 'a' }, { q: 5, a: 'a' }], add: { 14: 1 } },
  { cond: [{ q: 1, a: 'a' }, { q: 6, a: 'a' }], add: { 25: 1 } },
  { cond: [{ q: 6, a: 'a' }, { q: 9, a: 'c' }], add: { 25: 1 } },
  { cond: [{ q: 8, a: 'a' }, { q: 10, a: 'a' }], add: { 25: 1 } },
  { cond: [{ q: 3, a: 'a' }, { q: 10, a: 'a' }], add: { 14: 1 } },
  { cond: [{ q: 7, a: 'c' }, { q: 8, a: 'b' }], add: { 21: 2 } },
  { cond: [{ q: 4, a: 'b' }, { q: 10, a: 'a' }], add: { 21: 2 } },

  // 🔧 Uudet säännöt siivoustyön parantamiseksi
  { 
    cond: [
      { q: 2, a: 'a' }, // valmis fyysisiin tehtäviin
      { q: 3, a: 'a' }, // sisätilat
      { q: 5, a: 'c' }  // käytännön tekeminen
    ],
    add: { 6: 3 }
  },
  { 
    cond: [
      { q: 2, a: 'a' }, // valmis fyysisiin tehtäviin
      { q: 3, a: 'c' }, // vaihteleva ympäristö
      { q: 5, a: 'd' }  // ei tietokonetta
    ],
    add: { 6: 2 }
  }
];

// Apu: kynnysarvon asettaminen pisteille ammattinumeroiden perusteella
function getThreshold(professionId: number): number {
  if (professionId <= 13) return 14;
  if (professionId <= 27) return 17;
  return 16;
}

  const calculateResults = () => {
    // Tarkista, että kaikkiin kysymyksiin on vastattu
    if (selectedAnswers.includes(null)) {
      alert('Vastaa kaikkiin kysymyksiin ennen tulosten laskemista.');
      return;
    }
  
    // Laske pisteet kaikille ammateille
    const scores: Record<number, number> = {};
    professions.forEach(prof => {
      scores[prof.id] = 0;
    });
    questions.forEach((q, index) => {
      const answerVal = selectedAnswers[index];
      if (!answerVal) return;
      const answerObj = q.answers.find(ans => ans.value === answerVal);
      if (answerObj) {
        for (const [profIdStr, pts] of Object.entries(answerObj.points)) {
          const profId = Number(profIdStr);
          scores[profId] = (scores[profId] || 0) + pts;
        }
      }
    });
  
    // Sovella yhdistelmäehdot
    comboRules.forEach(rule => {
      const allMatch = rule.cond.every(c => {
        const answerVal = selectedAnswers[c.q - 1];
        return answerVal === c.a;
      });
      if (allMatch) {
        for (const [profIdStr, pts] of Object.entries(rule.add)) {
          const profId = Number(profIdStr);
          scores[profId] = (scores[profId] || 0) + pts;
        }
      }
    });
  
    // Valitse kynnyksen ylittävät ammatit
    const passingProfessions = professions.filter(prof => {
      return scores[prof.id] >= getThreshold(prof.id);
    });
  
    // Karsi matalan koulutuksen ammatit, jos vastaaja on korkeakoulutettu
    if (selectedAnswers[6] === 'c') {
      const matalanKoulutuksenAmmattilistat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      for (const id of matalanKoulutuksenAmmattilistat) {
        const index = passingProfessions.findIndex(prof => prof.id === id);
        if (index !== -1) {
          passingProfessions.splice(index, 1);
        }
      }
    }
  
    // Järjestä löytyneet ammatit tunnisteen mukaan (nousevasti)
    passingProfessions.sort((a, b) => a.id - b.id);
    setResultsList(passingProfessions);
  
    // Päivitä sanallinen arviointi
    const summary = generateWrittenSummary(selectedAnswers);
    setWrittenSummary(summary);
  
    setShowResults(true);
  };
// Satunnaisvalinta teksteistä
function getRandomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Vastausten sanalliset kuvaukset
const answerNarratives: Record<string, Record<string, string[]>> = {
  Q1: {
    a: [
      'Olen itsenäinen työntekijä ja perehdyn mielelläni työohjeisiin omatoimisesti.\n',
      'Pidän siitä, että voin työskennellä itsenäisesti ja ottaa vastuuta omasta työstäni.\n',
      'Olen oma-aloitteinen ja kykenen omaksumaan uudet työtehtävät itsenäisesti.\n',
    ],
    b: [
      'Arvostan perusteellista perehdytystä, jonka avulla voin työskennellä itsenäisesti.\n',
      'Hyvä perehdytys antaa minulle varmuutta toimia itsenäisesti työtehtävissäni.\n',
      'Perehdytyksen kautta saan tarvittavat valmiudet itsenäiseen työskentelyyn.\n'
    ],
    c: [
      'Pidän itsenäisestä työskentelystä, mutta arvostan myös säännöllistä ohjausta.\n',
      'Itsenäinen työskentely yhdistettynä ohjaukseen auttaa minua kehittymään.\n',
      'Olen tehokas yksintyöskentelijä, mikäli ohjeet ovat hyvät.\n'
    ],
    d: [
      'Olen sosiaalinen ja viihdyn tiimityössä.\n',
      'Kykenen ottamaan vastuuta yhteisissä projekteissa.\n',
      'Olen rohkea ja osaan toimia tehokkaasti ryhmässä.\n'
    ],
    e: [
      'Pidän selkeästä ohjauksesta ja viihdyn tiimityössä.\n',
      'Pidän ryhmätyöskentelystä, kun organisaatio on hyvin järjestyksessä.\n',
      'Työskentelen mielelläni tiimissä, jolla on käytössä selkeät ohjeet.\n'
    ]
  },
  Q2: {
    a: [
      'Olen valmis haastaviin ja fyysisiin tehtäviin.\n',
      'Pidän fyysisestä työstä, joka pitää minut aktiivisena.\n',
      'Minulle sopii raskas työ, jossa näkee konkreettisia tuloksia.\n'
    ],
    b: [
      'Pidän siitä, että työssä on sopivasti liikettä ja toimintaa.\n',
      'Fyysinen työ antaa minulle energiaa ja pitää minut motivoituneena.\n',
      'Arvostan käytännönläheistä työtä, jossa voi liikkua paljon.\n'
    ],
    c: [
      'Pidän keskittymistä ja tarkkuutta vaativasta toimistotyöstä.\n',
      'Nautin suunnitelmallisesta ja rauhallisesta työympäristöstä.\n',
      'Toimistotyö sopii minulle, koska se mahdollistaa keskittymisen yksityiskohtiin.\n'
    ],
    d: [
      'Nautin työstä, jossa voi keskittyä mentaalisiin haasteisiin.\n',
      'Minulle sopii parhaiten rauhallinen työympäristö ilman fyysistä kuormitusta.\n',
      'Olen parhaimmillani analyyttisessä ja suunnitelmallisessa työssä.\n'
    ]
  },
  Q3: {
    a: [
      'Pidän työskentelystä sisätiloissa, sillä arvostan järjestelmällistä ja rauhallista ympäristöä.\n',
      'Sisätiloissa työskentely auttaa minua keskittymään ja olemaan tehokas.\n',
      'Pidän sisätiloissa työskentelystä, sillä se tarjoaa vakaan ja mukautuvan työympäristön.\n'
    ],
    b: [
      'Tykkään työskennellä ulkona tai liikkuvassa työssä, sillä nautin vaihtelusta ja itsenäisyydestä.\n',
      'Ulkotyö antaa minulle energiaa ja mahdollisuuden.\n',
      'Haluan työskennellä ihmisläheisessä ympäristössä, jossa vuorovaikutus on keskiössä.\n'
    ],
    c: [
      'Viihdyn vaihtelevissa työympäristöissä, jotka antavat mahdollisuuden monipuolisiin tehtäviin.\n',
      'Monipuoliset työympäristöt inspiroivat minua ja pitävät työn mielekkäänä.\n',
      'Pidän työstä, jossa voin yhdistää sisä- ja ulkotehtäviä joustavasti.\n'
    ],
    d: [
      'Sosiaaliset ympäristöt ja asiakaspalvelu ovat minulle luontevia ja motivoivia.\n',
      'Nautin vuorovaikutuksesta muiden kanssa ja pidän asiakaspalvelutyötä inspiroivana.\n',
      'Haluan työskennellä ihmisläheisessä ympäristössä, jossa vuorovaikutus on keskiössä.\n'
    ]
  },
  Q4: {
    a: [
      'Työskentelen mielelläni itsenäisesti, jolloin voin hallita omaa aikaani ja suoritustapojani.\n',
      'Itseohjautuvuus on vahvuuteni, ja pärjään hyvin ilman jatkuvaa ohjausta.\n',
      'Arvostan rauhallista työskentelytapaa, jolla voin keskittyä itsenäisiin tehtäviin.\n'
    ],
    b: [
      'Pidän työstä, jossa voin tehdä päätöksiä itsenäisesti, mutta olen avoin yhteistyölle tarvittaessa.\n',
      'Yhdistän mielelläni itsenäisyyden ja satunnaisen tiimityön tehokkaaksi kokonaisuudeksi.\n',
      'Itseohjautuvuus ja vastuu ovat minulle tärkeitä, mutta arvostan myös yhteistä suunnittelua.\n'
    ],
    c: [
      'Työskentelen mielelläni tiimissä, jossa vuorovaikutus ja yhteistyö ovat tärkeässä roolissa.\n',
      'Yhteistyö motivoi minua, ja opin parhaiten toisten kanssa työskennellessä.\n',
      'Tiimityöskentely antaa minulle energiaa ja mahdollisuuden hyödyntää sosiaalisia taitojani.\n'
    ],
    d: [
      'Nautin vuorovaikutuksesta ja työskentelystä ihmisläheisessä ympäristössä.\n',
      'Pidän siitä, että saan tehdä töitä muiden kanssa ja olla vuorovaikutuksessa päivittäin.\n',
      'Sosiaalisuus on vahvuuteni, ja olen parhaimmillani ihmisten parissa työskennellessä.\n'
    ]
  },
  Q5: {
    a: [
      'Olen taitava tietotekniikan käyttäjä ja hyödynnän sujuvasti erilaisia ohjelmistoja työssäni.\n',
      'Nautin teknologian integroimisesta päivittäisiin työtehtäviini tehokkuuden lisäämiseksi.\n',
      'Tietotekniikan käyttö on minulle luontevaa, ja pysyn ajan tasalla uusista sovelluksista.\n'
    ],
    b: [
      'Hyödynnän tarvittaessa tietotekniikkaa työssäni ja pidän monipuolisista tehtävistä.\n',
      'Käytän tietokonetta tukemaan työtäni, mutta arvostan monipuolisia työtehtäviä.\n',
      'Tietotekniikka voi olla osa työtäni, mutta pääpainon toivon olevan perinteisissä työmenetelmissä.\n'
    ],
    c: [
      'Viihdyn työtehtävissä, jotka painottuvat käytännön tekemiseen.\n',
      'Arvostan erityisesti perinteisiä työtehtäviä, joissa tietokonetta tarvitaan vain vähän.\n',
      'Viihdyn parhaiten käytännön töissä, joita ei tehdä tietokoneruudun takana.\n'
    ],
    d: [
      'Toivon löytäväni työn, jossa voin keskittyä tekemiseen, mieluiten ilman tietokoneeseen koskemista.\n',
      'Viihdyn ympäristössä, jossa tietotekniikka ei ole osa päivittäisiä tehtäviä.\n',
      'Nautin selkeästä käytännön työstä, jossa ei vaadita ohjelmisto-osaamista.\n'
    ],
    e: [
      'Olen joustava työtehtävien suhteen, riippumatta tietotekniikan käytön määrästä.\n',
      'Sopeudun erilaisiin työympäristöihin, joissa tietotekniikan käytön määrä vaihtelee.\n',
      'Mukaudun erilaisiin työtehtäviin, olivat ne sitten käytännön töitä tai ajoittaista tietokoneen käyttöä.\n'
    ]
  },
Q6: {
  a: [
    "Arvostan mahdollisuutta suunnitella työaikani itse ja työskennellä joustavasti.\n",
    "Täysin joustavat työajat sopivat minulle, koska arvostan itsenäisyyttä ja vapautta.\n",
    "Joustavuus työajoissa mahdollistaa tehokkaan työskentelyn ja tasapainon.\n"
  ],
  b: [
    "Joustavat työajat auttavat minua yhdistämään työn ja muun elämän sujuvasti.\n",
    "Haluan työssäni olevan joustoa, jotta voin hallita aikataulujani paremmin.\n",
    "Pidän työajoista, joissa on liikkumavaraa arjen tilanteiden mukaan.\n"
  ],
  c: [
    "Pidän selkeistä työajoista, jotka tuovat rytmiä ja rakennetta arkeen.\n",
    "Kiinteät työajat auttavat minua pysymään keskittyneenä ja tuottavana.\n",
    "Säännöllinen aikataulu tukee hyvinvointiani ja auttaa jaksamaan paremmin.\n"
  ],
  d: [
    "Sopeudun erilaisiin aikatauluihin tilanteen mukaan.\n",
    "Minulle sopii sekä kiinteät että joustavat työajat.\n",
    "Olen joustava työaikojen suhteen ja pystyn mukautumaan tarpeen mukaan.\n"
  ]
    },
	Q7: {
  a: [
    "Olen oppinut työni käytännön kautta, ja tuon arvoa kokemukseni kautta.\n",
    "Minulla ei ole muodollista koulutusta, mutta opin nopeasti käytännön tehtävissä.\n",
    "Olen käytännön osaaja, joka oppii tekemällä ja kehittyy työn kautta.\n"
  ],
  b: [
    "Minulla on ammatillinen koulutus, joka antaa vahvan pohjan työhön.\n",
    "Olen suorittanut keskiasteen koulutuksen, joka tukee käytännön osaamistani.\n",
    "Koulutukseni antaa minulle valmiudet toimia tehokkaasti omalla alallani.\n"
  ],
  c: [
    "Olen korkeakoulutettu ja valmis hyödyntämään osaamistani työssä.\n",
    "Korkeakoulututkintoni antaa vahvan pohjan asiantuntijatehtäviin.\n",
    "Minulla on akateeminen koulutus, ja haluan hyödyntää sitä käytännössä.\n"
  ]
    },
	Q8: {
  a: [
    "Olen avoin uusille mahdollisuuksille ja valmis kehittämään itseäni opiskelemalla.\n",
    "Haluan oppia uutta ja vaihtaa alaa, jos se vie minua kohti mielekkäämpää työtä.\n",
    "Motivoidun uuden oppimisesta ja olen valmis rakentamaan uuden urapolun.\n"
  ],
  b: [
    "Haluan kehittyä nykyisellä alallani ja syventää osaamistani.\n",
    "Opiskelu nykyisen alan sisällä kiinnostaa minua ja antaa motivaatiota.\n",
    "Olen valmis täydentämään osaamistani nykyisen työn tueksi.\n"
  ],
  c: [
    "Harkitsen alan vaihtoa, mutta en voi sitoutua uusiin opintoihin juuri nyt.\n",
    "Olen avoin muutoksille, mutta opiskelu ei ole tällä hetkellä vaihtoehto.\n",
    "Uusi ura kiinnostaa, kunhan voin hyödyntää nykyisiä taitojani.\n"
  ],
  d: [
    "Haluan jatkaa nykyisellä urapolullani ilman lisäkoulutusta.\n",
    "Olen tyytyväinen nykyiseen alaani enkä suunnittele opiskelua.\n",
    "En koe tarpeelliseksi vaihtaa alaa tai hakeutua koulutukseen.\n"
  ],
  e: [
    "Olen valmis vaihtamaan alaa, jos nykyiset taitoni riittävät siihen.\n",
    "Mikäli alanvaihto onnistuu ilman koulutusta, tartun tilaisuuteen.\n",
    "Uudet suunnat kiinnostavat, mutta haluan hyödyntää nykyistä osaamistani.\n"
  ]
    },
	Q9: {
  a: [
    "Arvostan työn vakautta ja haen vakituista työsuhdetta.\n",
    "Haluan löytää pysyvän työn, jossa voin rakentaa pitkää uraa.\n",
    "Vakituisuus tuo minulle turvallisuuden tunnetta ja sitoutumista.\n"
  ],
  b: [
    "Olen joustava ja avoin myös määräaikaisille töille.\n",
    "Minulle käy sekä vakituinen että määräaikainen työ.\n",
    "Tärkeintä on työn mielekkyys – työsuhteen kesto voi vaihdella.\n"
  ],
  c: [
    "Pidän freelancer-työn vapaudesta ja omasta aikataulusta.\n",
    "Itseohjautuva työ sopii minulle, kun voin suunnitella päiväni itse.\n",
    "Freelancer-työ mahdollistaa joustavan elämäntyylin ja oman näköisen työn.\n"
  ]
    },
	Q10: {
  a: [
    "Olen sitoutunut jatkuvaan oppimiseen ja haluan kehittyä jatkuvasti.\n",
    "Pidän tärkeänä, että työssäni on tilaa kasvulle ja uusille taidoille.\n",
    "Motivoidun siitä, että saan kehittää osaamistani ja pysyä ajan hermolla.\n"
  ],
  b: [
    "Kehitän osaamistani mielelläni, kunhan opiskelu pysyy kohtuullisena.\n",
    "Pidän tärkeänä osaamisen päivittämistä, mutten kaipaa jatkuvaa opiskelua.\n",
    "Olen valmis kehittymään, kun se tukee työssä jaksamista ja viihtyvyyttä.\n"
  ],
  c: [
    "Haluan käyttää nykyisiä taitojani ilman tarvetta jatkuvaan oppimiseen.\n",
    "Tunnen oloni varmaksi nykyisillä taidoillani, enkä kaipaa uutta opeteltavaa.\n",
    "Minulle sopii työ, jossa nykyinen osaaminen riittää hyvin.\n"
  ]
}
};

// Sanallisen arvion generointi
function getNarrativeSummary(answers: (string | null)[]) {
  let result = '\n\n';
  answers.forEach((ans, i) => {
    const qKey = `Q${i + 1}`;
    if (ans && answerNarratives[qKey]?.[ans]) {
      result += '• ' + getRandomFrom(answerNarratives[qKey][ans]) + '\n';
    }
  });
  return result;
}

function generateWrittenSummary(answers: (string | null)[]) {
  return getNarrativeSummary(answers).replace(/\n/g, '<br />');
}


  // jos tuloksia ei vielä näytetä, se laskee pisteet ja näyttää tulokset.
  const handleToggleAndCalculate = () => {
    if (!showResults) {
      calculateResults(); // laskee ja näyttää
    } else {
      setShowResults(false); // piilottaa
    }
  };
  
  return (
    <div>
      <h1>Työprofiilikysely</h1>
      {questions.map(q => (
        <div key={q.num} style={{ margin: '20px 0' }}>
          <p><strong>{q.text}</strong></p>
          {q.answers.map(ans => (
            <label key={`${q.num}${ans.value}`} style={{ display: 'block', margin: '5px 0' }}>
              <input
                type="radio"
                name={`question-${q.num}`}
                value={ans.value}
                checked={selectedAnswers[q.num - 1] === ans.value}
                onChange={() => handleSelect(q.num, ans.value)}
              />
              {' '}{ans.text}
            </label>
          ))}
        </div>
      ))}
	  
      <button 
        type="button" 
          onClick={handleToggleAndCalculate} 
          style={{ marginTop: '20px', padding: '10px 15px' }}
        >
          {showResults ? 'Piilota tulokset' : 'Näytä tulokset'}
        </button>

        {showResults && (
  <div style={{ marginTop: '30px' }}>
    <h2>Sinulle sopivat ammatit:</h2>
    {resultsList.length > 0 ? (
      <ul>
        {resultsList.map(prof => (
          <li key={prof.id}>{prof.name}</li>
        ))}
      </ul>
    ) : (
      <p>Valinnoillasi ei löytynyt sopivia ammatteja.</p>
    )}

    {/* Sanallinen arviointi */}
    {writtenSummary && (
      <div style={{ marginTop: '20px' }}>
      <h3>Sanallinen arvio profiilistasi:</h3>
      <div style={{ marginTop: '10px' }}>
  <ul style={{ paddingLeft: '20px', margin: 0 }}>
    {writtenSummary.split('<br />').map((line, index) =>
      line.trim() !== '' ? <li key={index}>{line}</li> : null
    )}
  </ul>
</div>
    </div>
    )}
  </div>
)}
    </div>
  );
}