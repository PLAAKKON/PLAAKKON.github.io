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
  { id: 1, name: 'Varastotyöntekijä ja logistiikan avustaja' },
  { id: 2, name: 'Pakkaaja ja tuotantotyöntekijä' },
  { id: 3, name: 'Rakennus- ja kiinteistöalan työntekijä' },
  { id: 4, name: 'Metsätyöntekijä ja ympäristönhoitaja' },
  { id: 5, name: 'Metsätyöntekijä ja ympäristönhoitaja' },
  { id: 6, name: 'Siivooja ja puhtauspalvelualan työntekijä' },
  { id: 7, name: 'Tekninen työntekijä ja kunnossapitäjä' },
  { id: 8, name: 'Myyjä ja kassatyöntekijä' },
  { id: 9, name: 'Tarjoilija ja keittiötyöntekijä' },
  { id: 10, name: 'Lähihoitaja ja lastenhoitaja' },
  { id: 11, name: 'Koulunkäynnin avustaja ja lastentarhanopettaja' },
  { id: 12, name: 'Graafinen suunnittelija ja freelancer-graafikko' },
  { id: 13, name: 'Sisällöntuottaja ja kääntäjä' },
  { id: 14, name: 'Data-analyytikko ja ohjelmistokehittäjä' },
  { id: 15, name: 'Laboratorialan työntekijä tai prosessien kehittäjä' },
  { id: 16, name: 'Asiakaspalvelija ja puhelinasiakaspalvelija' },
  { id: 17, name: 'Myyntiedustaja ja markkinointikoordinaattor' },
  { id: 18, name: 'Rekrytointikoordinaattori ja henkilöstöavustaja' },
  { id: 19, name: 'Toimistotyöntekijä ja taloushallinnon asiantuntija' },
  { id: 20, name: 'Tekninen huoltaja ja kunnossapitotyöntekijä' },
  { id: 21, name: 'Kehitysinsinööri ja tuotantoinsinööri' },
  { id: 22, name: 'Projektipäällikkö ja logistiikkasuunnittelija' },
  { id: 23, name: 'IT-tukihenkilö ja systeemisuunnittelija' },
  { id: 24, name: 'Freelancer-valokuvaaja ja kirjoittaja' },
  { id: 25, name: 'Yrittäjä ja konsultti' },
  { id: 26, name: 'Lyhytkoulutukset' },
  { id: 27, name: 'Tietotekniikka- ja digiosaamisen kehittäminen' },
  { id: 28, name: 'Johtamisen ja proj. hallinnan täydennyskoulutus' },
  { id: 29, name: 'CV:n päivittäminen ja työnhakuvalmennus' },
  { id: 30, name: 'Paikalliset työnhakuportaalit ja verkostoituminen' },
  { id: 31, name: 'Työvoimapalvelut ja uravalmennus' },
  { id: 32, name: 'Työsuhdemuotojen uudelleen arviointi' }
];

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
        text: 'Olen valmis haastaviin ja fyysisiin tehtäviin.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 20: 2 }
      },
      {
        value: 'b',
        text: 'Pidän siitä, että työssä on sopivasti liikettä ja toimintaa.',
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 2, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
      },
      {
        value: 'c',
        text: 'Pidän keskittymistä ja tarkkuutta vaativasta toimistotyöstä.',
        points: { 3: 1, 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'd',
        text: 'Nautin työstä, jossa voi keskittyä mentaalisiin haasteisiin.',
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
        text: 'Olen avoin sekä vakituisille että määräaikaisille työsuhteille.',
        points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
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
        points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 }
      },
      {
        value: 'b',
        text: 'Kehitän mielelläni taitojani, kunhan tahti on kohtuullinen.',
        points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 }
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
  { cond: [{ q: 4, a: 'b' }, { q: 10, a: 'a' }], add: { 21: 2 } }
];

// Apu: kynnysarvon asettaminen pisteille ammattinumeroiden perusteella
function getThreshold(professionId: number): number {
  if (professionId <= 13) return 14;
  if (professionId <= 27) return 17;
  return 16;
}

export default function Profilointi() {
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(10).fill(null));
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelect = (questionNum: number, answerValue: string) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionNum - 1] = answerValue;
      return newAnswers;
    });
  };

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
	const matalanKoulutuksenAmmattilistat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 24];
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
	setShowResults(true);
  };
  
  const [resultsList, setResultsList] = useState<Profession[]>([]);
  const toggleResults = () => {
    setShowResults(!showResults);
  };

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
        </div>
      )}
    </div>
  );
}
