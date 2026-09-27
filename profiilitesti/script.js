const questions = [
  {
    id: "Q1",
    text: "1/10 Kuvaus työskentelytavastasi:",
    options: {
      a: { label: "Olen itsenäinen työntekijä ja voin perehtyä työohjeisiin omatoimisesti.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 1, 22: 1, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 1, 30: 1, 31: 1, 32: 1 } },
      b: { label: "Haluan opastusta alkuun, mutta voin työskennellä itsenäisesti sen jälkeen.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      c: { label: "Tykkään itsenäisestä työskentelystä, mutta tarvitsen säännöllistä apua ja ohjausta.", points: { 1: 1, 2: 1, 3: 1, 5: 1, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 2, 30: 2, 31: 2, 32: 2 } },
      d: { label: "Pidän tiimityöstä, mutta myös vastuusta päätöksenteossa.", points: { 1: 1, 2: 1, 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      e: { label: "Tykkään tehdä tiimityötä, jossa on selkeä ohjaus.", points: { 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
    }
  },
  {
    id: "Q2",
    text: "2/10 Millaista työympäristöä arvostat?",
    options: {
      a: { label: "Olen valmis fyysiseen työhön, joka on raskasta ja käytännönläheistä.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 20: 2 } },
      b: { label: "Pidän aktiivisesta työstä, joka ei ole liian kuormittavaa.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 2, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
      c: { label: "Pidän keskittymistä ja tarkkuutta vaativasta työstä.", points: { 3: 1, 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      d: { label: "Pidän ihmisläheisestä ja sosiaalisesta työympäristöstä.", points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
    }
  },
  {
    id: "Q3",
    text: "3/10 Kumpi kuvaa sinua paremmin?",
    options: {
      a: { label: "Pidän työskentelystä sisätiloissa rauhallisessa ympäristössä.", points: { 1: 2, 2: 2, 3: 2, 5: 1, 6: 2, 8: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      b: { label: "Tykkään työskennellä ulkona tai liikkuvassa työssä.", points: { 3: 1, 4: 2, 5: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
      c: { label: "Nautin työstä, jossa työympäristö vaihtelee ja teen monenlaisia tehtäviä.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      d: { label: "Sosiaaliset ympäristöt ja asiakaspalvelu motivoivat minua.", points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
    }
  },
  {
    id: "Q4",
    text: "4/10 Miten suhtaudut päätöksentekoon työssä?",
    options: {
      a: { label: "Tykkään työskennellä yksin ja kantaa vastuuta.", points: { 1: 2, 2: 2, 3: 1, 6: 2, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 1, 25: 1, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      b: { label: "Arvostan työskentelyä yksin, mutta myös tiimityö onnistuu.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      c: { label: "Työskentelen mielelläni tiimityössä, jossa yhteistyö on tärkeässä roolissa.", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 2, 25: 2, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
      d: { label: "Toivon, että painopiste on ihmisten kanssa työskentelyssä.", points: { 5: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
    }
  },
  {
    id: "Q5",
    text: "5/10 Suhde tietotekniikkaan työssä:",
    options: {
      a: { label: "Olen taitava tietotekniikan käyttäjä ja hyödynnän sujuvasti erilaisia ohjelmistoja.", points: { 1: 1, 2: 1, 5: 2, 7: 2, 8: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      b: { label: "Hyödynnän tietotekniikkaa tarvittaessa ja pidän monipuolisista tehtävistä.", points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 1, 7: 2, 8: 2, 9: 1, 10: 2, 11: 2, 12: 1, 13: 1, 14: 1, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      c: { label: "Viihdyn käytännön tekemiseen painottuvissa työtehtävissä.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 2, 7: 1, 8: 1, 9: 2, 10: 1, 11: 1, 15: 1, 16: 1 } },
      d: { label: "Toivon löytäväni työn, jossa ei juuri tarvitse käyttää tietokonetta.", points: { 3: 2, 4: 2, 6: 2, 9: 2 } },
      e: { label: "Olen joustava tehtävien suhteen, oli tietokoneen käyttöä paljon tai vähän.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
    }
  },
  {
    id: "Q6",
    text: "6/10 Mitä ajattelet työajoista?",
    options: {
      a: { label: "Arvostan täysin joustavia työaikoja, jotka voin päättää itse.", points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 1, 22: 1, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 1, 30: 1, 31: 1, 32: 1 } },
      b: { label: "Joustavat työajat sopisivat minulle hyvin.", points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      c: { label: "Pidän kiinteistä työajoista, jotka tuovat selkeyttä arkeen.", points: { 3: 2, 4: 2, 7: 2, 8: 1, 9: 1, 10: 2, 11: 2, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 26: 1, 27: 1, 28: 1, 29: 2, 30: 2, 31: 2, 32: 2 } },
      d: { label: "Sopeudun sekä kiinteisiin että joustaviin aikatauluihin.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
    }
  },
  {
    id: "Q7",
    text: "7/10 Mikä on koulutustaustasi?",
    options: {
      a: { label: "Olen oppinut työni käytännössä, ilman muodollista koulutusta.", points: { 12: -2, 13: -1, 14: -2, 15: -2, 17: -2, 19: -2, 21: -3, 22: -3, 23: -3 } },
      b: { label: "Olen suorittanut keskiasteen koulutuksen (esim. ammattikoulu).", points: { 12: -1, 13: -1, 14: -1, 17: -2, 19: -2, 21: -3, 22: -2, 23: -1 } },
      c: { label: "Minulla on korkeakoulututkinto.", points: { 23: -100 } }
    }
  },
  {
    id: "Q8",
    text: "8/10 Miten suhtaudut alan vaihtoon ja opiskeluun?",
    options: {
      a: { label: "Olen avoin uusille mahdollisuuksille ja valmis opiskelemaan uutta alaa varten.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      b: { label: "Haluan syventää osaamistani nykyisellä alallani.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      c: { label: "Olen avoin alanvaihdolle, mutta en voi sitoutua uusiin opintoihin.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
      d: { label: "Haluan jatkaa nykyisellä alallani, enkä suunnittele lisäkoulutusta.", points: {} },
      e: { label: "Olen valmis vaihtamaan alaa, jolle nykyiset taitoni riittävät.", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
    }
  },
  {
    id: "Q9",
    text: "9/10 Millainen työsuhde sopii sinulle parhaiten?",
    options: {
      a: { label: "Etsin vakituista työpaikkaa ja arvostan työn vakautta.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      b: { label: "Voin työskennellä sekä vakituisessa että määräaikaisessa työsuhteessa.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      c: { label: "Pidän freelancer-työn vapaudesta ja oman työajan hallinnasta.", points: { 25: 2 } }
    }
  },
  {
    id: "Q10",
    text: "10/10 Miten suhtaudut osaamisen kehittämiseen työssäsi?",
    options: {
      a: { label: "Olen sitoutunut jatkuvaan oppimiseen ja kehitän aktiivisesti osaamistani.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
      b: { label: "Kehitän mielelläni taitojani, kunhan tahti on kohtuullinen.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2, 7: 1, 8: 2, 9: 2, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
      c: { label: "Haluan, että työssäni riittää nykyiset taitoni.", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
    }
  }
];

const comboRules = [
  { cond: [{ q: 1, a: 'a' }, { q: 5, a: 'a' }], add: { 14: 1 } },
  { cond: [{ q: 1, a: 'a' }, { q: 6, a: 'a' }], add: { 25: 1 } },
  { cond: [{ q: 6, a: 'a' }, { q: 9, a: 'c' }], add: { 25: 1 } },
  { cond: [{ q: 8, a: 'a' }, { q: 10, a: 'a' }], add: { 25: 1 } },
  { cond: [{ q: 3, a: 'a' }, { q: 10, a: 'a' }], add: { 14: 1 } },
  { cond: [{ q: 7, a: 'c' }, { q: 8, a: 'b' }], add: { 21: 2 } },
  { cond: [{ q: 4, a: 'b' }, { q: 10, a: 'a' }], add: { 21: 2 } },
  { 
    cond: [
      { q: 2, a: 'a' }, 
      { q: 3, a: 'a' }, 
      { q: 5, a: 'c' }
    ],
    add: { 6: 3 }
  },
  { 
    cond: [
      { q: 2, a: 'a' }, 
      { q: 3, a: 'c' }, 
      { q: 5, a: 'd' }
    ],
    add: { 6: 2 }
  }
];

const results = {
  "1": { name: "Fyysinen varasto- ja logistiikka-aputyö ISCO 93, TK10 933", threshold: 14, score: 0 },
  "2": { name: "Pakkaus- ja tuotannon apu- ja kokoonpanotyö ISCO 93, TK10 932", threshold: 14, score: 0 },
  "3": { name: "Rakennustyön ja kiinteistöhuollon avustava työ ISCO 71, TK10 711, TK10 712", threshold: 14, score: 0 },
  "4": { name: "Luonnovara- ja ympäristöalan perustyö (avustavat puisto- ja maataloustyöt) ISCO 61, TK10 611", threshold: 13, score: 0 },
  "5": { name: "Posti-, lähetti- ja jakelutyö ISCO 43, TK10 441", threshold: 13, score: 0 },
  "6": { name: "Puhdistus- ja siivoustyö, ISCO 91, TK10 911", threshold: 14, score: 0 },
  "7": { name: "Kunnossapito- ja korjaustyön tukityö, ISCO 72, TK10 723", threshold: 8, score: 0 },
  "8": { name: "Myyntityö ja kassapalvelut, ISCO 52, TK10 522", threshold: 13, score: 0 },
  "9": { name: "Ravintola- ja keittiöalan perustyö, ISCO 51, TK10 512, TK10 513", threshold: 13, score: 0 },
  "10": { name: "Lähihoitaja ja lastenhoitaja, ISCO 53, TK10 532, TK10 531", threshold: 13, score: 0 },
  "11": { name: "Opetuksen ja koulunkäynnin tuki, ISCO 23, TK10 531", threshold: 13, score: 0 },
  "12": { name: "Visuaalinen suunnittelu ja graafinen työ, ISCO 21, TK10 216", threshold: 15, score: 0 },
  "13": { name: "Sisällöntuotanto ja kielityö, ISCO 26, TK10 264", threshold: 17, score: 0 },
  "14": { name: "Ohjelmointi ja data-analyysi, ISCO 25, TK10 251, TK10 252", threshold: 15, score: 0 },
  "15": { name: "Prosessi- ja laboratoriotyö, ISCO 31, TK10 311, TK10 312, TK10 313, TK10 315", threshold: 15, score: 0 },
  "16": { name: "Asiakaspalvelu- ja puhelinpalvelutyö, ISCO 42, TK10 422", threshold: 15, score: 0 },
  "17": { name: "Myynnin ja markkinoinnin suunnitelu, ISCO 24, TK10 243", threshold: 15, score: 0 },
  "18": { name: "Henkilöstöhallinnon tuki, ISCO 44, TK10 441, TK10 442", threshold: 15, score: 0 },
  "19": { name: "Toimistotyö ja taloushallinto, ISCO 4", threshold: 15, score: 0 },
  "20": { name: "Tekninen huolto ja järjestelmän kunnossapito, ISCO 72, TK10 741", threshold: 15, score: 0 },
  "21": { name: "Tuotanto- ja kehitysinsinööri, ISCO 21, TK10 214", threshold: 15, score: 0 },
  "22": { name: "Logistiikan ja projektien hallinta, ISCO 21, TK10 132-242", threshold: 15, score: 0 },
  "23": { name: "IT-tuki ja ohjelmistopalvelut, ISCO 25, TK10 251, TK10 252", threshold: 15, score: 0 },
  "24": { name: "Luova kirjoittaminen ja visuaalinen viestintä, ISCO 26, TK10 265", threshold: 15, score: 0 },
  "25": { name: "Yrittäjyys ja asiantuntijakonsultointi, ISCO 12, TK10 241", threshold: 15, score: 0 },
  "26": { name: "Lyhytkoulutukset ja urataidot", threshold: 13, score: 0 },
  "27": { name: "Tietotekniikka- ja digiosaamisen kehittäminen", threshold: 15, score: 0 },
  "28": { name: "Johtamisen ja proj. hallinnan täydennyskoulutus", threshold: 15, score: 0 },
  "29": { name: "CV:n päivittäminen ja työnhakuvalmennus", threshold: 15, score: 0 },
  "30": { name: "Paikalliset työnhakuportaalit ja verkostoituminen", threshold: 15, score: 0 },
  "31": { name: "Työvoimapalvelut ja uravalmennus", threshold: 15, score: 0 },
  "32": { name: "Työsuhdemuotojen ja työllistymisen joustomallit", threshold: 15, score: 0 }
}; 

const narratives = {
  Q1: {
    a: "Pidät itsenäisestä työstä ja omatoimisesta tekemisestä.<br />",
    b: "Arvostat hyvää perehdytystä ennen itsenäistä työskentelyä.<br />",
    c: "Pidät yhdistelmästä itsenäisyyttä ja ohjausta.<br />",
    d: "Nautit vastuullisesta tiimityöstä.<br />",
    e: "Selkeä ohjaus ja ryhmätyö ovat sinulle tärkeitä.<br />"
  },
  Q2: {
    a: "Pidät fyysisestä ja haastavasta työstä.<br />",
    b: "Arvostat aktiivista mutta ei liian fyysistä työympäristöä.<br />",
    c: "Keskittyminen ja tarkkuus toimistotyössä ovat vahvuuksiasi.<br />",
    d: "Haluat mentaalisesti vaativaa ja rauhallista työtä.<br />"
  },
  Q3: {
    a: "Viihdyt sisätiloissa järjestelmällisessä ympäristössä.<br />",
    b: "Pidät ulkotyöstä ja vaihtelusta.<br />",
    c: "Nautit vaihtelevista työympäristöistä.<br />",
    d: "Sosiaaliset ympäristöt motivoivat sinua.<br />"
  },
  Q4: {
    a: "Itsenäisyys on sinulle erittäin tärkeää.<br />",
    b: "Pidät itsenäisyydestä, mutta arvostat myös yhteistyötä.<br />",
    c: "Itsenäisyys ei ole sinulle kovin tärkeää.<br />",
    d: "Pidät tiimityöstä ja ohjauksesta.<br />"
  },
  Q5: {
    a: "Pidät tietotekniikan käytöstä työssäsi.<br />",
    b: "Käytät tietotekniikkaa kohtuullisesti.<br />",
    c: "Haluat käyttää tietotekniikkaa vain vähän.<br />",
    d: "Et halua käyttää tietotekniikkaa työssäsi.<br />"
  },
  Q6: {
    a: "Täysin joustavat työajat sopivat sinulle parhaiten.<br />",
    b: "Osittain joustavat työajat ovat sinulle sopivia.<br />",
    c: "Pidät kiinteistä työajoista.<br />",
    d: "Työaikojen joustavuudella ei ole sinulle väliä.<br />"
  },
  Q7: {
    a: "Sinulla ei ole muodollista koulutusta, mutta opit nopeasti.<br />",
    b: "Sinulla on ammatillinen koulutus.<br />",
    c: "Sinulla on korkeakoulutus.<br />"
  },
  Q8: {
    a: "Olet valmis opiskelemaan uutta.<br />",
    b: "Haluat opiskella vain nykyisellä alalla.<br />",
    c: "Et ole valmis opiskelemaan tällä hetkellä.<br />",
    d: "Et halua opiskella lainkaan.<br />"
  },
  Q9: {
    a: "Pidät vakituisesta työsuhteesta.<br />",
    b: "Määräaikainen työsuhde sopii sinulle.<br />",
    c: "Freelancer-työ on sinulle sopivin.<br />"
  },
  Q10: {
    a: "Jatkuva oppiminen on sinulle erittäin tärkeää.<br />",
    b: "Pidät oppimisesta, mutta et jatkuvasti.<br />",
    c: "Et pidä jatkuvasta oppimisesta.<br />"
  }
};

function getFinalResults() {
  // Collect all professions that meet the threshold
  return Object.entries(results)
    .filter(([id, prof]) => prof.score >= prof.threshold)
    .map(([id, prof]) => ({ label: prof.name }));
}

function getVerbalAssessment() {
  return Object.entries(answers)
    .map(([qid, opt]) => "• " + (narratives[qid]?.[opt] || "Ei sanallista arviota saatavilla."))
    .join("<br>");
}

let currentQuestionIndex = 0;
const answers = {};
let finalResults = [];
let verbalAssessment = "";
let userIsLoggedIn = false;

document.getElementById("toggleButton").addEventListener("click", () => {
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.style.display = "none"; // Piilotetaan nappi

  // Aloita kysely alusta
  currentQuestionIndex = 0;
  Object.keys(answers).forEach(key => delete answers[key]); // Tyhjennä vastaukset

  // Näytä kysymysosio ja piilota tulososio
  document.getElementById("questionContainer").style.display = "block";
  document.getElementById("resultsContainer").style.display = "none";

  // Näytä ensimmäinen kysymys
  showQuestion();
});

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const container = document.getElementById("questionContainer");
  container.innerHTML = `
  <h3>${question.text}</h3>
  <p id="instructionText" style="font-style: italic; color: #555;">Valitse yksi vastaus jatkaaksesi.</p>
`;

  function flashInstructionWarning() {
  const instruction = document.getElementById("instructionText");
  if (instruction) {
    instruction.classList.add("flash-warning");
    setTimeout(() => {
      instruction.classList.remove("flash-warning");
    }, 800); // vastaava kuin animaation kesto
  }
}

  Object.entries(question.options).forEach(([key, option]) => {
    const btn = document.createElement("button");
    btn.textContent = option.label;
    btn.onclick = () => handleAnswer(question.id, key);

    // Highlight the previously selected answer
    if (answers[question.id] === key) {
      btn.style.backgroundColor = "#d3d3d3"; // Highlight color
    }

    btn.onmouseover = () => (btn.style.backgroundColor = "#d3d3d3");
    btn.onmouseout = () => {
      if (answers[question.id] !== key) {
        btn.style.backgroundColor = ""; // Reset color if not selected
      }
    };

    container.appendChild(btn);
    container.appendChild(document.createElement("br"));
  });

  // Add navigation buttons
  const navContainer = document.createElement("div");
  navContainer.style.marginTop = "20px";

  if (currentQuestionIndex > 0) {
    const backButton = document.createElement("button");
    backButton.textContent = "Edellinen kysymys";
    backButton.onclick = () => {
      currentQuestionIndex--;
      showQuestion();
    };
    navContainer.appendChild(backButton);
  }

  if (currentQuestionIndex < questions.length - 1) {
    const forwardButton = document.createElement("button");
    forwardButton.textContent = "Seuraava kysymys";
    forwardButton.onclick = () => {
    const question = questions[currentQuestionIndex];
    if (!answers[question.id]) {
      flashInstructionWarning(); // Näytä punainen välähdys
      return; // Älä etene jos vastausta ei ole
    }
    currentQuestionIndex++;
    showQuestion();
  };
    navContainer.appendChild(forwardButton);
  }

  container.appendChild(navContainer);
}

function handleAnswer(qid, option) {
  answers[qid] = option;

  const question = questions.find(q => q.id === qid);
  if (question && question.options[option]) {
    const points = question.options[option].points || {};
    Object.entries(points).forEach(([resultId, score]) => {
      if (results[resultId]) {
        results[resultId].score += score;
      }
    });
  }

  // Karsintakoodit
  applyExclusions();

  // Yhdistelmäehtojen käsittely
  applyComboRules();

  // Päivitä currentQuestionIndex ja siirry seuraavaan kysymykseen
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(); // Näytä seuraava kysymys
  } else {
    showResults(); // Näytä tulokset, kun kaikki kysymykset on vastattu
  }
}

function applyExclusions() {
  if (answers["Q2"] === "c" && answers["Q3"] === "a") {
    const excludedJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 20];
    excludedJobs.forEach(jobId => {
      if (results[jobId]) {
        results[jobId].score = -Infinity;
      }
    });
  }

  if (answers["Q2"] === "a" && answers["Q5"] === "c") {
    const excludedJobs = [12, 13, 14, 17, 18, 19, 24, 25];
    excludedJobs.forEach(jobId => {
      if (results[jobId]) {
        results[jobId].score = -Infinity;
      }
    });
  }

  if (answers["Q3"] === "d") {
    const excludedJobs = [1, 2, 3, 4, 5, 6, 14, 20];
    excludedJobs.forEach(jobId => {
      if (results[jobId]) {
        results[jobId].score = -Infinity;
      }
    });
  }
  // Poista johtamiskoulutuksen ehdotus, jos selkeästi ei sovi
  if (
    answers["Q1"] === "c" ||  // tarvitsee säännöllistä apua
    answers["Q1"] === "e" ||  // kaipaa jatkuvaa ohjausta
    answers["Q4"] === "c" ||  // ei arvosta itsenäisyyttä
    answers["Q5"] === "d"     // ei halua käyttää tietotekniikkaa
  ) {
    if (results["28"]) {
      results["28"].score = -Infinity;
    }
  }
  if (answers["Q7"] === "a") {
    const excludedJobs = [15, 21, 22];
    excludedJobs.forEach(jobId => {
      if (results[jobId]) {
        results[jobId].score = -Infinity;
      }
    });
  } else if (answers["Q7"] === "b") {
    const excludedJobs = [21, 22];
    excludedJobs.forEach(jobId => {
      if (results[jobId]) {
        results[jobId].score = -Infinity;
      }
    });
  } else if (answers["Q7"] === "c") {
    const excludedJobs = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11];
    excludedJobs.forEach(jobId => {
      if (results[jobId]) {
        results[jobId].score = -Infinity;
      }
    });
  }
}

function applyComboRules() {
  comboRules.forEach(rule => {
    if (rule.cond.every(cond => answers[`Q${cond.q}`] === cond.a)) {
      Object.entries(rule.add).forEach(([resultId, score]) => {
        if (results[resultId]) {
          results[resultId].score += score;
        }
      });
    }
  });
}

function resetScores() {
  Object.keys(results).forEach((id) => { results[id].score = 0; });
}

function applyAnswerPoints() {
  Object.entries(answers).forEach(([qid, option]) => {
    const question = questions.find((item) => item.id === qid);
    const points = question && question.options[option] ? question.options[option].points || {} : {};
    Object.entries(points).forEach(([resultId, score]) => {
      if (results[resultId]) results[resultId].score += score;
    });
  });
}

function answersFromKey(key) {
  const map = {};
  String(key || "").match(/\d+[A-E]/gi)?.forEach((part) => {
    const n = parseInt(part, 10);
    const letter = part.replace(/\d+/, "").toLowerCase();
    if (n >= 1 && n <= 10 && letter) map["Q" + n] = letter;
  });
  return map;
}

function answersComplete(map) {
  return questions.every((question) => map && map[question.id]);
}

function openSavedAnswers(map) {
  Object.keys(answers).forEach((key) => delete answers[key]);
  Object.assign(answers, map);
  resetScores();
  applyAnswerPoints();
  applyExclusions();
  applyComboRules();
  const toggle = document.getElementById("toggleButton");
  if (toggle) toggle.style.display = "none";
  const hero = document.querySelector(".hero");
  if (hero) hero.style.display = "none";
  showResults();
  document.getElementById("resultsContainer").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function savedAnswers(user) {
  let map = {};
  try {
    map = JSON.parse(localStorage.getItem("yoroLxpAnswers") || "{}") || {};
  } catch (e) {
    map = {};
  }
  try {
    const token = await user.getIdToken();
    const response = await fetch("https://us-central1-urapolku-7780a.cloudfunctions.net/tyonhaku", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify({ action: "lataa" })
    });
    const data = await response.json();
    const profile = data.profiili || {};
    const fromKey = answersFromKey(profile.LxP);
    if (answersComplete(fromKey)) return fromKey;
    if (answersComplete(profile.lxpVastaukset)) return profile.lxpVastaukset;
  } catch (e) { /* kokeillaan vielä tietokantaa */ }
  try {
    const snap = await firebase.firestore().collection("profiles").doc("oma_" + user.uid).get();
    const data = snap.data() || {};
    const fromKey = answersFromKey(data.LxP);
    if (answersComplete(fromKey)) return fromKey;
    if (answersComplete(data.lxpVastaukset)) return data.lxpVastaukset;
  } catch (e) { /* paikallinen tallennus riittää */ }
  return map;
}

function showResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.querySelectorAll("ul, button").forEach((el) => {
    if (el.id !== "resultsList") el.remove();
  });
  const staticList = document.getElementById("resultsList");
  if (staticList) staticList.innerHTML = "";
  const writtenSummaryNode = document.getElementById("writtenSummary");
  if (writtenSummaryNode) writtenSummaryNode.innerHTML = "";

  // Näytä tulokset ja piilota kysymysosio
  document.getElementById("questionContainer").style.display = "none";
  resultsContainer.style.display = "block";

  // Päivitä tulosmuuttujat
  finalResults = getFinalResults();
  verbalAssessment = getVerbalAssessment();

  // Jos käyttäjä EI ole kirjautunut, näytä teaser ja poistu funktiosta
  if (!userIsLoggedIn) {
    renderTeaserResults();
    return;
  }

  // ...olemassa oleva showResults-koodisi jatkuu tästä...
  const resultsList = document.createElement("ul");
  const writtenSummary = document.getElementById("writtenSummary");
  const writtenSummaryContainer = document.getElementById("writtenSummaryContainer");

  // Näytä tulokset, jotka ylittävät kynnyksen
  const ammatit = [];
  const ohjausJaTuki = [];

  Object.entries(results).forEach(([id, prof]) => {
    if (prof.score >= prof.threshold) {
      if (parseInt(id) <= 25) {
        ammatit.push(prof.name);
      } else {
        ohjausJaTuki.push(prof.name);
      }
    }
  });

  // Lisää otsikko ja tulokset "Ammatit"
  if (ammatit.length > 0) {
    const ammatitHeader = document.createElement("h3");
    ammatitHeader.textContent = "Ammatit";
    resultsList.appendChild(ammatitHeader);

    ammatit.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      resultsList.appendChild(li);
    });
  }

  // Lisää otsikko ja tulokset "Ohjaus- ja tukivaihtoehdot"
  if (ohjausJaTuki.length > 0) {
    const ohjausHeader = document.createElement("h3");
    ohjausHeader.textContent = "Ohjaus- ja tukivaihtoehdot";
    resultsList.appendChild(ohjausHeader);

    ohjausJaTuki.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      resultsList.appendChild(li);
    });
  }

  // Lisää tuloslista DOM:iin
  document.getElementById("resultsContainer").appendChild(resultsList);

  // Tyhjennä edelliset sanalliset arviot
  writtenSummary.innerHTML = "";

  // Näytä sanallinen arvio
  let hasNarratives = false;
  Object.entries(answers).forEach(([qid, opt]) => {
    const narrative = narratives[qid]?.[opt] || "Ei sanallista arviota saatavilla.";
    const paragraph = document.createElement("p");
    paragraph.innerHTML = "• " + narrative;
    writtenSummary.appendChild(paragraph);
    hasNarratives = true;
  });

  if (hasNarratives) {
    writtenSummaryContainer.style.display = "block";
  }

  // Lisää "Palaa alkuun" -nappi
  const restartButton = document.createElement("button");
  restartButton.textContent = "Palaa alkuun";
  restartButton.style.marginTop = "20px";
  restartButton.onclick = () => {
    document.getElementById("resultsContainer").style.display = "none";
    document.getElementById("toggleButton").style.display = "block";
    document.getElementById("questionContainer").style.display = "none"; // Piilota kysymykset
    currentQuestionIndex = 0;
    Object.keys(answers).forEach(key => delete answers[key]);
    Object.keys(results).forEach(key => results[key].score = 0); // Nollaa pisteet
    writtenSummary.innerHTML = ""; // Tyhjennä sanallinen arvio
  };
  document.getElementById("resultsContainer").appendChild(restartButton);

  document.getElementById("resultsContainer").style.display = "block";
}

function renderTeaserResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  const topProfessions = finalResults.slice(0, 2);
  const hiddenCount = finalResults.length - topProfessions.length;

  const professionHTML = topProfessions
    .map((r) => `<li>${r.label}</li>`)
    .join("") +
    (hiddenCount > 0 ? `<li class="teaser-hidden">+ ${hiddenCount} muuta ammattia piilotettu</li>` : "");

  const shortText = verbalAssessment.slice(0, 120);

  resultsContainer.innerHTML = `
    <div class="teaser-box">
      <h3>Sinulle sopivat ammatit (esikatselu)</h3>
      <ul>${professionHTML}</ul>

      <h3>Sanallinen arvio</h3>
      <p>
        ${shortText}<span class="teaser-hidden">... (kirjaudu nähdäksesi koko arvio)</span>
      </p>

      <div class="teaser-cta">
        <p><em>Kirjaudu sisään nähdäksesi koko profiilisi, kaikki suositukset ja ohjausvaihtoehdot.</em></p>
        <a href="/kirjaudu" class="cta-button">Näytä koko profiilini</a>
      </div>
    </div>
  `;
}

function renderFullResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  // Näytä kaikki finalResults ja koko verbalAssessment tässä
  const professionHTML = finalResults.map((r) => `<li>${r.label}</li>`).join("");

  resultsContainer.innerHTML = `
    <div>
      <h3>Sinulle sopivat ammatit</h3>
      <ul>${professionHTML}</ul>

      <h3>Sanallinen arvio</h3>
      <p>${verbalAssessment}</p>
    </div>
  `;
}

function flashInstructionWarning() {
  const instruction = document.getElementById("instructionText");
  if (instruction) {
    instruction.classList.add("flash-warning");
    setTimeout(() => {
      instruction.classList.remove("flash-warning");
    }, 800);
  }
}

let restoredSavedTest = false;
firebase.auth().onAuthStateChanged(async (user) => {
  const loginOffer = document.getElementById("loginOffer");
  userIsLoggedIn = !!user;
  if (loginOffer) loginOffer.style.display = user ? "none" : "block";
  if (!user || restoredSavedTest) return;
  const map = await savedAnswers(user);
  if (!answersComplete(map)) return;
  restoredSavedTest = true;
  openSavedAnswers(map);
});
