// Language support
let currentLanguage = 'fi';

// Questions will be set dynamically based on current language
let questions = [];

// Set initial questions
function updateQuestions() {
  questions = questionsData[currentLanguage];
}

const questionsData = {
  fi: [
    {
      id: "Q1",
      text: "1/10 Kuvaus työskentelytavastasi:",
      options: {
        a: { label: "Olen itsenäinen työntekijä ja perehdyn mielelläni työohjeisiin omatoimisesti.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 1, 22: 1, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 1, 30: 1, 31: 1, 32: 1 } },
        b: { label: "Arvostan perusteellista perehdytystä, jonka avulla voin työskennellä itsenäisesti.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "Pidän itsenäisestä työskentelystä, mutta arvostan myös säännöllistä ohjausta.", points: { 1: 1, 2: 1, 3: 1, 5: 1, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 2, 30: 2, 31: 2, 32: 2 } },
        d: { label: "Olen sosiaalinen ja viihdyn tiimityössä.", points: { 1: 1, 2: 1, 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        e: { label: "Pidän selkeästä ohjauksesta ja viihdyn tiimityössä.", points: { 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
      }
    },
    {
      id: "Q2",
      text: "2/10 Millaista työympäristöä arvostat?",
      options: {
        a: { label: "Olen valmis fyysiseen ja käytännönläheiseen työhön.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 20: 2 } },
        b: { label: "Pidän toiminnallisesta työstä, jossa saan olla liikkeessä.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 2, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        c: { label: "Pidän keskittymistä ja tarkkuutta vaativasta työstä.", points: { 3: 1, 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        d: { label: "Nautin vuorovaikutteisesta työstä sosiaalisessa ympäristössä.", points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
      }
    },
    {
      id: "Q3",
      text: "3/10 Kumpi kuvaa sinua paremmin?",
      options: {
        a: { label: "Pidän työskentelystä sisätiloissa rauhallisessa ympäristössä.", points: { 1: 2, 2: 2, 3: 2, 5: 1, 6: 2, 8: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "Tykkään työskennellä ulkona tai liikkuvassa työssä.", points: { 3: 1, 4: 2, 5: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        c: { label: "Viihdyn vaihtelevissa työympäristöissä ja monipuolisissa tehtävissä.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        d: { label: "Sosiaaliset ympäristöt ja asiakaspalvelu motivoivat minua.", points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
      }
    },
    {
      id: "Q4",
      text: "4/10 Miten suhtaudut päätöksentekoon työssä?",
      options: {
        a: { label: "Työskentelen mielelläni itsenäisesti ja hallitsen itse aikatauluni.", points: { 1: 2, 2: 2, 3: 1, 6: 2, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 1, 25: 1, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "Pidän työstä, jossa voin tehdä päätöksiä itsenäisesti, mutta tarvittaessa teen yhteistyötä.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "Työskentelen mielelläni tiimissä, jossa yhteistyö on tärkeässä roolissa.", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 2, 25: 2, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        d: { label: "Nautin vuorovaikutuksesta ja ihmisläheisestä työstä.", points: { 5: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
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
        b: { label: "Haluan syventää osaamistani nykyisellä alallani ja olen valmis opiskelemaan uutta.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "Olen avoin alanvaihdolle, mutta en voi sitoutua uusiin opintoihin.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        d: { label: "Haluan jatkaa nykyisellä alallani enkä suunnittele lisäkoulutusta.", points: {} },
        e: { label: "Olen valmis vaihtamaan alaa, jolle nykyiset taitini riittävät (ilman uutta koulutusta).", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
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
  ],
  en: [
    {
      id: "Q1",
      text: "1/10 Description of your working style:",
      options: {
        a: { label: "I am an independent worker and like to familiarize myself with work instructions on my own.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 1, 22: 1, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 1, 30: 1, 31: 1, 32: 1 } },
        b: { label: "I value thorough orientation that enables me to work independently.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "I like working independently, but also value regular guidance.", points: { 1: 1, 2: 1, 3: 1, 5: 1, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 2, 30: 2, 31: 2, 32: 2 } },
        d: { label: "I am social and enjoy teamwork.", points: { 1: 1, 2: 1, 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        e: { label: "I like clear guidance and enjoy teamwork.", points: { 5: 2, 6: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
      }
    },
    {
      id: "Q2",
      text: "2/10 What kind of work environment do you value?",
      options: {
        a: { label: "I am ready for physical and practical work.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 20: 2 } },
        b: { label: "I like active work where I can be mobile.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 2, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        c: { label: "I like work that requires concentration and accuracy.", points: { 3: 1, 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        d: { label: "I enjoy interactive work in a social environment.", points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
      }
    },
    {
      id: "Q3",
      text: "3/10 Which describes you better?",
      options: {
        a: { label: "I like working indoors in a quiet environment.", points: { 1: 2, 2: 2, 3: 2, 5: 1, 6: 2, 8: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "I like working outdoors or in mobile work.", points: { 3: 1, 4: 2, 5: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        c: { label: "I enjoy working in varying environments with diverse tasks.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        d: { label: "Social environments and customer service motivate me.", points: { 5: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
      }
    },
    {
      id: "Q4",
      text: "4/10 How do you approach decision-making at work?",
      options: {
        a: { label: "I like to work independently and manage my own schedule.", points: { 1: 2, 2: 2, 3: 1, 6: 2, 12: 2, 13: 2, 14: 1, 15: 1, 16: 1, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 1, 25: 1, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "I like work where I can make decisions independently, but collaborate when needed.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "I like to work in a team where collaboration is important.", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 2, 25: 2, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        d: { label: "I enjoy interaction and people-oriented work.", points: { 5: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
      }
    },
    {
      id: "Q5",
      text: "5/10 Relationship with information technology at work:",
      options: {
        a: { label: "I am skilled in using information technology and fluently utilize various software.", points: { 1: 1, 2: 1, 5: 2, 7: 2, 8: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "I use information technology when needed and like diverse tasks.", points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 1, 7: 2, 8: 2, 9: 1, 10: 2, 11: 2, 12: 1, 13: 1, 14: 1, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "I enjoy work tasks that focus on practical implementation.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 2, 7: 1, 8: 1, 9: 2, 10: 1, 11: 1, 15: 1, 16: 1 } },
        d: { label: "I hope to find a job where I don't need to use computers much.", points: { 3: 2, 4: 2, 6: 2, 9: 2 } },
        e: { label: "I am flexible with tasks, whether there is a lot or little computer use.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
      }
    },
    {
      id: "Q6",
      text: "6/10 What do you think about working hours?",
      options: {
        a: { label: "I value completely flexible working hours that I can decide myself.", points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 1, 22: 1, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 1, 30: 1, 31: 1, 32: 1 } },
        b: { label: "Flexible working hours would suit me well.", points: { 1: 2, 2: 2, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "I like fixed working hours that bring clarity to daily life.", points: { 3: 2, 4: 2, 7: 2, 8: 1, 9: 1, 10: 2, 11: 2, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 26: 1, 27: 1, 28: 1, 29: 2, 30: 2, 31: 2, 32: 2 } },
        d: { label: "I adapt to both fixed and flexible schedules.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } }
      }
    },
    {
      id: "Q7",
      text: "7/10 What is your educational background?",
      options: {
        a: { label: "I have learned my work in practice, without formal education.", points: { 12: -2, 13: -1, 14: -2, 15: -2, 17: -2, 19: -2, 21: -3, 22: -3, 23: -3 } },
        b: { label: "I have completed secondary education (e.g., vocational school).", points: { 12: -1, 13: -1, 14: -1, 17: -2, 19: -2, 21: -3, 22: -2, 23: -1 } },
        c: { label: "I have a higher education degree.", points: { 23: -100 } }
      }
    },
    {
      id: "Q8",
      text: "8/10 How do you feel about career change and studying?",
      options: {
        a: { label: "I am open to new opportunities and ready to study for a new field.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "I want to deepen my skills in my current field and am ready to study new things.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "I am open to career change, but cannot commit to new studies.", points: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        d: { label: "I want to continue in my current field and don't plan additional education.", points: {} },
        e: { label: "I am ready to change fields where my current skills are sufficient (without new education).", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
      }
    },
    {
      id: "Q9",
      text: "9/10 What kind of employment relationship suits you best?",
      options: {
        a: { label: "I am looking for a permanent job and value job stability.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "I can work in both permanent and fixed-term employment.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 1, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        c: { label: "I like the freedom of freelance work and managing my own time.", points: { 25: 2 } }
      }
    },
    {
      id: "Q10",
      text: "10/10 How do you feel about developing skills in your work?",
      options: {
        a: { label: "I am committed to continuous learning and actively develop my skills.", points: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2, 28: 2, 29: 2, 30: 2, 31: 2, 32: 2 } },
        b: { label: "I like to develop my skills, as long as the pace is reasonable.", points: { 1: 2, 2: 2, 3: 2, 4: 1, 5: 1, 6: 2, 7: 1, 8: 2, 9: 2, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } },
        c: { label: "I want my current skills to be sufficient for my work.", points: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1 } }
      }
    }
  ]
};

// Simplified questions for demo (first 5 questions)
// questions variable is now defined globally and updated dynamically

const results = {
  "1": { name: "Fyysinen varasto- ja logistiikka-aputyö", threshold: 14, score: 0 },
  "2": { name: "Pakkaus- ja tuotannon apu- ja kokoonpanotyö", threshold: 14, score: 0 },
  "3": { name: "Rakennustyön ja kiinteistöhuollon avustava työ", threshold: 14, score: 0 },
  "4": { name: "Luonnovara- ja ympäristöalan perustyö", threshold: 13, score: 0 },
  "5": { name: "Posti-, lähetti- ja jakelutyö", threshold: 13, score: 0 },
  "6": { name: "Puhdistus- ja siivoustyö", threshold: 14, score: 0 },
  "7": { name: "Kunnossapito- ja korjaustyön tukityö", threshold: 8, score: 0 },
  "8": { name: "Myyntityö ja kassapalvelut", threshold: 13, score: 0 },
  "9": { name: "Ravintola- ja keittiöalan perustyö", threshold: 13, score: 0 },
  "10": { name: "Lähihoitaja ja lastenhoitaja", threshold: 13, score: 0 },
  "11": { name: "Opetuksen ja koulunkäynnin tuki", threshold: 13, score: 0 },
  "12": { name: "Visuaalinen suunnittelu ja graafinen työ", threshold: 15, score: 0 },
  "13": { name: "Sisällöntuotanto ja kielityö", threshold: 17, score: 0 },
  "14": { name: "Ohjelmointi ja data-analyysi", threshold: 15, score: 0 },
  "15": { name: "Prosessi- ja laboratoriotyö", threshold: 15, score: 0 },
  "16": { name: "Asiakaspalvelu- ja puhelinpalvelutyö", threshold: 15, score: 0 },
  "17": { name: "Myynnin ja markkinoinnin suunnitelu", threshold: 15, score: 0 },
  "18": { name: "Henkilöstöhallinnon tuki", threshold: 15, score: 0 },
  "19": { name: "Toimistotyö ja taloushallinto", threshold: 15, score: 0 },
  "20": { name: "Tekninen huolto ja järjestelmän kunnossapito", threshold: 15, score: 0 },
  "21": { name: "Tuotanto- ja kehitysinsinööri", threshold: 15, score: 0 },
  "22": { name: "Logistiikan ja projektien hallinta", threshold: 15, score: 0 },
  "23": { name: "IT-tuki ja ohjelmistopalvelut", threshold: 15, score: 0 },
  "24": { name: "Luova kirjoittaminen ja visuaalinen viestintä", threshold: 15, score: 0 },
  "25": { name: "Yrittäjyys ja asiantuntijakonsultointi", threshold: 15, score: 0 },
  "26": { name: "Vaikuttamis- ja organisointityö", threshold: 15, score: 0 },
  "27": { name: "Kaupallinen ja liiketoimintakehitys", threshold: 15, score: 0 },
  "28": { name: "Turvallisuus- ja vartiointityö", threshold: 15, score: 0 },
  "29": { name: "Terveydenhuollon avustava työ", threshold: 13, score: 0 },
  "30": { name: "Sosiaalialan perus- ja tukityö", threshold: 13, score: 0 },
  "31": { name: "Kulttuuri- ja vapaa-ajan ohjaus", threshold: 13, score: 0 },
  "32": { name: "Urheilu- ja liikunta-alan työ", threshold: 13, score: 0 }
};

const resultsEn = {
  "1": { name: "Physical warehouse and logistics support work", threshold: 14, score: 0 },
  "2": { name: "Packaging and production assembly work", threshold: 14, score: 0 },
  "3": { name: "Construction and property maintenance support", threshold: 14, score: 0 },
  "4": { name: "Natural resources and environmental basic work", threshold: 13, score: 0 },
  "5": { name: "Postal, courier and delivery work", threshold: 13, score: 0 },
  "6": { name: "Cleaning and janitorial work", threshold: 14, score: 0 },
  "7": { name: "Maintenance and repair support work", threshold: 8, score: 0 },
  "8": { name: "Sales work and cashier services", threshold: 13, score: 0 },
  "9": { name: "Restaurant and kitchen basic work", threshold: 13, score: 0 },
  "10": { name: "Practical nurse and childcare worker", threshold: 13, score: 0 },
  "11": { name: "Education and school support", threshold: 13, score: 0 },
  "12": { name: "Visual design and graphic work", threshold: 15, score: 0 },
  "13": { name: "Content production and language work", threshold: 17, score: 0 },
  "14": { name: "Programming and data analysis", threshold: 15, score: 0 },
  "15": { name: "Process and laboratory work", threshold: 15, score: 0 },
  "16": { name: "Customer service and phone service work", threshold: 15, score: 0 },
  "17": { name: "Sales and marketing planning", threshold: 15, score: 0 },
  "18": { name: "Human resources support", threshold: 15, score: 0 },
  "19": { name: "Office work and financial administration", threshold: 15, score: 0 },
  "20": { name: "Technical maintenance and system upkeep", threshold: 15, score: 0 },
  "21": { name: "Production and development engineer", threshold: 15, score: 0 },
  "22": { name: "Logistics and project management", threshold: 15, score: 0 },
  "23": { name: "IT support and software services", threshold: 15, score: 0 },
  "24": { name: "Creative writing and visual communication", threshold: 15, score: 0 },
  "25": { name: "Entrepreneurship and expert consulting", threshold: 15, score: 0 },
  "26": { name: "Advocacy and organizational work", threshold: 15, score: 0 },
  "27": { name: "Commercial and business development", threshold: 15, score: 0 },
  "28": { name: "Security and guard work", threshold: 15, score: 0 },
  "29": { name: "Healthcare support work", threshold: 13, score: 0 },
  "30": { name: "Social services basic and support work", threshold: 13, score: 0 },
  "31": { name: "Cultural and leisure guidance", threshold: 13, score: 0 },
  "32": { name: "Sports and fitness work", threshold: 13, score: 0 }
};

const narratives = {
  fi: {
    Q1: {
      a: "Pidät itsenäisestä työstä ja omatoimisesta tekemisestä.",
      b: "Arvostat hyvää perehdytystä ennen itsenäistä työskentelyä.",
      c: "Pidät yhdistelmästä itsenäisyyttä ja ohjausta.",
      d: "Nautit vastuullisesta tiimityöstä.",
      e: "Selkeä ohjaus ja ryhmätyö ovat sinulle tärkeitä."
    },
    Q2: {
      a: "Pidät fyysisestä ja haastavasta työstä.",
      b: "Arvostat aktiivista mutta ei liian fyysistä työympäristöä.",
      c: "Keskittyminen ja tarkkuus ovat vahvuuksiasi.",
      d: "Sosiaaliset ympäristöt motivoivat sinua."
    },
    Q3: {
      a: "Viihdyt sisätiloissa järjestelmällisessä ympäristössä.",
      b: "Pidät ulkotyöstä ja vaihtelusta.",
      c: "Nautit vaihtelevista työympäristöistä.",
      d: "Sosiaaliset ympäristöt motivoivat sinua."
    },
    Q4: {
      a: "Itsenäisyys on sinulle erittäin tärkeää.",
      b: "Pidät itsenäisyydestä, mutta arvostat myös yhteistyötä.",
      c: "Yhteistyö on sinulle tärkeää.",
      d: "Pidät tiimityöstä ja ihmisläheisyydestä."
    },
    Q5: {
      a: "Pidät tietotekniikan käytöstä työssäsi.",
      b: "Käytät tietotekniikkaa kohtuullisesti.",
      c: "Haluat käyttää tietotekniikkaa vain vähän.",
      d: "Et halua käyttää tietotekniikkaa työssäsi.",
      e: "Olet joustava tietotekniikan käytön suhteen."
    },
    Q6: {
      a: "Arvostat täysin joustavia työaikoja.",
      b: "Joustavat työajat sopisivat sinulle.",
      c: "Pidät kiinteistä, selkeistä työajoista.",
      d: "Sopeudut erilaisiin aikatauluihin."
    },
    Q7: {
      a: "Olet oppinut työsi käytännössä.",
      b: "Sinulla on keskiasteen koulutus.",
      c: "Sinulla on korkeakoulututkinto."
    },
    Q8: {
      a: "Olet avoin uusille mahdollisuuksille ja opiskelulle.",
      b: "Haluat syventää osaamistasi nykyisellä alallasi.",
      c: "Olet avoin alanvaihdolle ilman uusia opintoja.",
      d: "Haluat jatkaa nykyisellä alallasi.",
      e: "Olet valmis vaihtamaan alaa nykyisillä taidoillasi."
    },
    Q9: {
      a: "Etsin vakituista työpaikkaa.",
      b: "Voin työskennellä erilaisissa työsuhteissa.",
      c: "Pidän freelancer-työn vapaudesta."
    },
    Q10: {
      a: "Olet sitoutunut jatkuvaan oppimiseen.",
      b: "Kehitä taitojasi kohtuullisella tahdilla.",
      c: "Haluat, että nykyiset taitosi riittävät."
    }
  },
  en: {
    Q1: {
      a: "You like independent work and self-directed activities.",
      b: "You value good orientation before independent work.",
      c: "You like a combination of independence and guidance.",
      d: "You enjoy responsible teamwork.",
      e: "Clear guidance and group work are important to you."
    },
    Q2: {
      a: "You like physical and challenging work.",
      b: "You value an active but not too physical work environment.",
      c: "Concentration and accuracy are your strengths.",
      d: "Social environments motivate you."
    },
    Q3: {
      a: "You enjoy indoors in a systematic environment.",
      b: "You like outdoor work and variation.",
      c: "You enjoy varying work environments.",
      d: "Social environments motivate you."
    },
    Q4: {
      a: "Independence is very important to you.",
      b: "You like independence, but also value cooperation.",
      c: "Cooperation is important to you.",
      d: "You like teamwork and people-oriented work."
    },
    Q5: {
      a: "You like using information technology in your work.",
      b: "You use information technology moderately.",
      c: "You want to use information technology only a little.",
      d: "You don't want to use information technology in your work.",
      e: "You are flexible regarding information technology use."
    },
    Q6: {
      a: "You value completely flexible working hours.",
      b: "Flexible working hours would suit you.",
      c: "You like fixed, clear working hours.",
      d: "You adapt to different schedules."
    },
    Q7: {
      a: "You have learned your work in practice.",
      b: "You have secondary education.",
      c: "You have a higher education degree."
    },
    Q8: {
      a: "You are open to new opportunities and studying.",
      b: "You want to deepen your skills in your current field.",
      c: "You are open to career change without new studies.",
      d: "You want to continue in your current field.",
      e: "You are ready to change fields with your current skills."
    },
    Q9: {
      a: "You are looking for a permanent job.",
      b: "You can work in different types of employment.",
      c: "You like the freedom of freelance work."
    },
    Q10: {
      a: "You are committed to continuous learning.",
      b: "You develop skills at a reasonable pace.",
      c: "You want your current skills to be sufficient."
    }
  }
};

let currentQuestionIndex = 0;
const answers = {};
let finalResults = [];
let verbalAssessment = "";
let userIsLoggedIn = false;

// Language update function
window.updateLanguage = function(lang) {
  currentLanguage = lang;
  
  // Update questions array
  updateQuestions();
  
  // If test is in progress, update current question
  if (currentQuestionIndex < questions.length && document.getElementById("questionContainer").style.display !== "none") {
    showQuestion();
  }
  
  // Update any visible results
  const resultsContainer = document.getElementById("resultsContainer");
  if (resultsContainer.style.display !== "none") {
    updateResultsLanguage();
  }
};

function updateResultsLanguage() {
  // Update results if they are showing
  if (finalResults.length > 0) {
    // Reset both language result sets
    Object.keys(results).forEach(key => results[key].score = 0);
    Object.keys(resultsEn).forEach(key => resultsEn[key].score = 0);
    
    // Recalculate with current language
    calculateResults();
    finalResults = getFinalResults();
    verbalAssessment = getVerbalAssessment();
    
    if (userIsLoggedIn) {
      renderFullResults();
    } else {
      renderTeaserResults();
    }
  }
}

document.getElementById("toggleButton").addEventListener("click", () => {
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.style.display = "none";

  currentQuestionIndex = 0;
  Object.keys(answers).forEach(key => delete answers[key]);
  
  // Reset scores for both languages
  Object.keys(results).forEach(key => results[key].score = 0);
  Object.keys(resultsEn).forEach(key => resultsEn[key].score = 0);

  // Ensure questions are up to date
  updateQuestions();

  document.getElementById("questionContainer").style.display = "block";
  document.getElementById("resultsContainer").style.display = "none";

  showQuestion();
});

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const container = document.getElementById("questionContainer");
  
  const instructionText = currentLanguage === 'fi' ? 
    "Valitse yksi vastaus jatkaaksesi." : 
    "Select one answer to continue.";
    
  container.innerHTML = `
    <h3>${question.text}</h3>
    <p id="instructionText" style="font-style: italic; color: #9ca3af; margin-bottom: 1.5rem;">${instructionText}</p>
  `;

  Object.entries(question.options).forEach(([key, option]) => {
    const btn = document.createElement("button");
    btn.textContent = option.label;
    btn.onclick = () => handleAnswer(question.id, key);

    if (answers[question.id] === key) {
      btn.style.background = "rgba(96, 165, 250, 0.3)";
      btn.style.borderColor = "rgba(96, 165, 250, 0.8)";
    }

    btn.onmouseover = () => {
      if (answers[question.id] !== key) {
        btn.style.background = "rgba(75, 85, 99, 0.8)";
        btn.style.borderColor = "rgba(96, 165, 250, 0.5)";
      }
    };
    
    btn.onmouseout = () => {
      if (answers[question.id] !== key) {
        btn.style.background = "rgba(55, 65, 81, 0.8)";
        btn.style.borderColor = "rgba(75, 85, 99, 0.5)";
      }
    };

    container.appendChild(btn);
    container.appendChild(document.createElement("br"));
  });

  // Add navigation buttons
  const navContainer = document.createElement("div");
  navContainer.style.marginTop = "20px";
  navContainer.style.display = "flex";
  navContainer.style.gap = "10px";
  navContainer.style.flexWrap = "wrap";

  if (currentQuestionIndex > 0) {
    const backButton = document.createElement("button");
    backButton.textContent = currentLanguage === 'fi' ? "Edellinen kysymys" : "Previous question";
    backButton.onclick = () => {
      currentQuestionIndex--;
      showQuestion();
    };
    navContainer.appendChild(backButton);
  }

  if (currentQuestionIndex < questions.length - 1) {
    const forwardButton = document.createElement("button");
    forwardButton.textContent = currentLanguage === 'fi' ? "Seuraava kysymys" : "Next question";
    forwardButton.onclick = () => {
      const question = questions[currentQuestionIndex];
      if (!answers[question.id]) {
        flashInstructionWarning();
        return;
      }
      currentQuestionIndex++;
      showQuestion();
    };
    navContainer.appendChild(forwardButton);
  } else {
    const finishButton = document.createElement("button");
    finishButton.textContent = currentLanguage === 'fi' ? "Näytä tulokset" : "Show results";
    finishButton.style.background = "linear-gradient(135deg, #059669, #047857)";
    finishButton.onclick = () => {
      const question = questions[currentQuestionIndex];
      if (!answers[question.id]) {
        flashInstructionWarning();
        return;
      }
      calculateResults();
      showResults();
    };
    navContainer.appendChild(finishButton);
  }

  container.appendChild(navContainer);
}

function handleAnswer(qid, option) {
  answers[qid] = option;
  
  // Auto-advance to next question unless it's the last one
  if (currentQuestionIndex < questions.length - 1) {
    setTimeout(() => {
      currentQuestionIndex++;
      showQuestion();
    }, 300); // Small delay for better UX
  } else {
    // If it's the last question, refresh to show finish button
    showQuestion();
  }
}

function calculateResults() {
  // Get the correct results object based on current language
  const currentResults = currentLanguage === 'fi' ? results : resultsEn;
  
  // Reset all scores
  Object.keys(currentResults).forEach(key => currentResults[key].score = 0);
  
  // Calculate scores based on answers
  Object.entries(answers).forEach(([qid, option]) => {
    const question = questions.find(q => q.id === qid);
    if (question && question.options[option]) {
      const points = question.options[option].points;
      Object.entries(points).forEach(([resultId, score]) => {
        if (currentResults[resultId]) {
          currentResults[resultId].score += score;
        }
      });
    }
  });
}

function getFinalResults() {
  const currentResults = currentLanguage === 'fi' ? results : resultsEn;
  return Object.entries(currentResults)
    .filter(([id, prof]) => prof.score >= prof.threshold)
    .map(([id, prof]) => ({ id, label: prof.name, score: prof.score }))
    .sort((a, b) => b.score - a.score);
}

function getVerbalAssessment() {
  const currentNarratives = narratives[currentLanguage];
  let assessment = "";
  
  Object.entries(answers).forEach(([qid, opt]) => {
    const narrative = currentNarratives[qid]?.[opt] || "";
    if (narrative) {
      assessment += "• " + narrative + "<br/>";
    }
  });
  
  return assessment;
}

function showResults() {
  document.getElementById("questionContainer").style.display = "none";
  document.getElementById("resultsContainer").style.display = "block";

  finalResults = getFinalResults();
  verbalAssessment = getVerbalAssessment();

  if (!userIsLoggedIn) {
    renderTeaserResults();
    return;
  }

  renderFullResults();
}

function renderTeaserResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  const topProfessions = finalResults.slice(0, 3);
  const hiddenCount = finalResults.length - topProfessions.length;

  const professionHTML = topProfessions
    .map((r) => `<li>${r.label}</li>`)
    .join("") +
    (hiddenCount > 0 ? `<li class="teaser-hidden">+ ${hiddenCount} ${currentLanguage === 'fi' ? 'muuta ammattia piilotettu' : 'other professions hidden'}</li>` : "");

  const shortText = verbalAssessment.split('<br/>').slice(0, 2).join('<br/>');

  const titles = currentLanguage === 'fi' ? {
    preview: "Sinulle sopivat ammatit (esikatselu)",
    assessment: "Sanallinen arvio",
    loginPrompt: "Kirjaudu sisään nähdäksesi koko profiilisi, kaikki suositukset ja ohjausvaihtoehdot.",
    showProfile: "Näytä koko profiilini"
  } : {
    preview: "Suitable careers for you (preview)",
    assessment: "Verbal assessment", 
    loginPrompt: "Sign in to see your complete profile, all recommendations and guidance options.",
    showProfile: "Show my complete profile"
  };

  resultsContainer.innerHTML = `
    <div class="teaser-box">
      <h3>${titles.preview}</h3>
      <ul>${professionHTML}</ul>

      <h3>${titles.assessment}</h3>
      <div>
        ${shortText}<span class="teaser-hidden"><br/>... (${currentLanguage === 'fi' ? 'kirjaudu nähdäksesi koko arvio' : 'sign in to see complete assessment'})</span>
      </div>

      <div class="teaser-cta">
        <p><em>${titles.loginPrompt}</em></p>
        <a href="/kirjaudu" class="cta-button">${titles.showProfile}</a>
      </div>
    </div>
  `;

  addRestartButton();
}

function renderFullResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  const professionHTML = finalResults.map((r) => `<li>${r.label}</li>`).join("");
  
  const titles = currentLanguage === 'fi' ? {
    careers: "Sinulle sopivat ammatit",
    assessment: "Sanallinen arvio"
  } : {
    careers: "Suitable careers for you",
    assessment: "Verbal assessment"
  };

  resultsContainer.innerHTML = `
    <div>
      <h3>${titles.careers}</h3>
      <ul>${professionHTML}</ul>

      <h3>${titles.assessment}</h3>
      <div>${verbalAssessment}</div>
    </div>
  `;

  addRestartButton();
}

function addRestartButton() {
  const resultsContainer = document.getElementById("resultsContainer");
  const restartButton = document.createElement("button");
  restartButton.textContent = currentLanguage === 'fi' ? "Palaa alkuun" : "Return to start";
  restartButton.style.marginTop = "20px";
  restartButton.onclick = () => {
    document.getElementById("resultsContainer").style.display = "none";
    document.getElementById("toggleButton").style.display = "block";
    document.getElementById("questionContainer").style.display = "none";
    currentQuestionIndex = 0;
    Object.keys(answers).forEach(key => delete answers[key]);
    
    // Reset scores for both languages
    Object.keys(results).forEach(key => results[key].score = 0);
    Object.keys(resultsEn).forEach(key => resultsEn[key].score = 0);
  };
  resultsContainer.appendChild(restartButton);
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

// Firebase auth state change
if (typeof firebase !== 'undefined') {
  firebase.auth().onAuthStateChanged((user) => {
    const loginOffer = document.getElementById("loginOffer");
    userIsLoggedIn = !!user;
    if (loginOffer) loginOffer.style.display = user ? "none" : "block";
  });
}

// Initialize questions on page load
updateQuestions();
