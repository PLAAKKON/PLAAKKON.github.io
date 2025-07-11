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

  const ammattiNimet = [
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

  function laskeVisualProfiili(vastaukset: {
    Q1: string; Q2: string; Q3: string; Q4: string; Q5: string;
    Q6: string; Q7: string; Q8: string; Q9: string; Q10: string;
  }): number[] {
    const pisteet = Array(32).fill(0) as number[];  // L1P–L32P scores

    // Q1: Kuinka haluat tehdä työtä?
    switch (vastaukset.Q1) {
      case 'a': // Itsenäisesti ja voin itse tutustua työohjeisiin.
        pisteet[0] += 2;  // L1P +2
        pisteet[1] += 2;  // L2P +2
        pisteet[2] += 2;  // L3P +2
        pisteet[3] += 1;  // L4P +1
        pisteet[4] += 2;  // L5P +2
        pisteet[5] += 2;  // L6P +2
        pisteet[7] += 1;  // L8P +1
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 1; // L14P +1
        pisteet[14] += 1; // L15P +1
        pisteet[15] += 1; // L16P +1
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        pisteet[18] += 1; // L19P +1
        break;
      case 'b': // Itsenäisesti, mutta haluan hyvän perehdytyksen.
        pisteet[0] += 2;  // L1P +2
        pisteet[1] += 2;  // L2P +2
        pisteet[2] += 2;  // L3P +2
        pisteet[3] += 1;  // L4P +1
        pisteet[4] += 2;  // L5P +2
        pisteet[5] += 2;  // L6P +2
        pisteet[7] += 1;  // L8P +1
        pisteet[8] += 1;  // L9P +1
        pisteet[9] += 1;  // L10P +1
        pisteet[10] += 1; // L11P +1
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        pisteet[18] += 2; // L19P +2
        break;
      case 'c': // Itsenäisesti ja ohjatusti.
        pisteet[0] += 1;  // L1P +1
        pisteet[1] += 1;  // L2P +1
        pisteet[2] += 1;  // L3P +1
        pisteet[4] += 1;  // L5P +1
        pisteet[5] += 1;  // L6P +1
        pisteet[7] += 2;  // L8P +2
        pisteet[8] += 2;  // L9P +2
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 1; // L17P +1
        pisteet[17] += 1; // L18P +1
        pisteet[18] += 2; // L19P +2
        pisteet[19] += 2; // L20P +2
        break;
      case 'd': // Toisten henkilöiden kanssa vähällä ohjauksella.
        pisteet[0] += 1;  // L1P +1
        pisteet[1] += 1;  // L2P +1
        pisteet[4] += 2;  // L5P +2
        pisteet[5] += 2;  // L6P +2
        pisteet[7] += 2;  // L8P +2
        pisteet[8] += 2;  // L9P +2
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        pisteet[18] += 2; // L19P +2
        pisteet[19] += 2; // L20P +2
        pisteet[20] += 2; // L21P +2
        pisteet[21] += 2; // L22P +2
        break;
      case 'e': // Toisten henkilöiden kanssa, mutta haluan tarkat ohjeet.
        pisteet[4] += 2;  // L5P +2
        pisteet[5] += 2;  // L6P +2
        pisteet[7] += 2;  // L8P +2
        pisteet[8] += 2;  // L9P +2
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 1; // L17P +1
        pisteet[17] += 1; // L18P +1
        pisteet[18] += 1; // L19P +1
        pisteet[19] += 1; // L20P +1
        pisteet[20] += 1; // L21P +1
        pisteet[21] += 1; // L22P +1
        pisteet[22] += 1; // L23P +1
        break;
      default:
        break;
    }

    // Q2: Minkä verran työssä on fyysisyyttä?
    switch (vastaukset.Q2) {
      case 'a': // Työ voi olla fyysisesti raskasta.
        pisteet[0] += 2;  // L1P +2
        pisteet[1] += 2;  // L2P +2
        pisteet[2] += 2;  // L3P +2
        pisteet[3] += 2;  // L4P +2
        pisteet[4] += 1;  // L5P +1
        pisteet[5] += 2;  // L6P +2
        pisteet[19] += 2; // L20P +2
        break;
      case 'b': // Työ voisi olla sopivasti liikettä (pääasiassa fyysistä).
        pisteet[0] += 2;  // L1P +2
        pisteet[1] += 2;  // L2P +2
        pisteet[2] += 2;  // L3P +2
        pisteet[3] += 2;  // L4P +2
        pisteet[4] += 1;  // L5P +1
        pisteet[5] += 2;  // L6P +2
        pisteet[7] += 1;  // L8P +1
        pisteet[8] += 1;  // L9P +1
        pisteet[9] += 1;  // L10P +1
        break;
      case 'c': // Työ voisi olla pääasiassa toimistotyötä.
        pisteet[2] += 1;  // L3P +1
        pisteet[4] += 1;  // L5P +1
        pisteet[7] += 2;  // L8P +2
        pisteet[8] += 2;  // L9P +2
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        pisteet[18] += 2; // L19P +2
        pisteet[20] += 2; // L21P +2
        pisteet[21] += 2; // L22P +2
        pisteet[22] += 2; // L23P +2
        pisteet[23] += 2; // L24P +2
        pisteet[24] += 2; // L25P +2
        break;
      case 'd': // Toivon toimistotyötä, jossa ei ole fyysisiä tehtäviä.
        pisteet[4] += 1;  // L5P +1
        pisteet[7] += 2;  // L8P +2
        pisteet[8] += 2;  // L9P +2
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        pisteet[18] += 2; // L19P +2
        pisteet[20] += 2; // L21P +2
        pisteet[21] += 2; // L22P +2
        pisteet[22] += 2; // L23P +2
        pisteet[23] += 2; // L24P +2
        pisteet[24] += 2; // L25P +2
        pisteet[25] += 2; // L26P +2
        break;
      default:
        break;
    }

    // Q3: Missä ympäristössä haluat työskennellä?
    switch (vastaukset.Q3) {
      case 'a': // Sisätiloissa (toimisto, varasto, tehdas).
        // Ei erityisiä pisteytyksiä (oletuksena toimisto/tehdas on ok kaikille aloille).
        // (Jos haluttaisiin, voisi antaa pisteitä tietyille aloille, mutta oletetaan 0.)
        break;
      case 'b': // Ulkona ja liikkuvassa työssä.
        // Ei suoria pisteytyksiä tässä logiikassa.
        break;
      case 'c': // Vaihteleva ympäristö (sisä- ja ulkotyö).
        // Ei suoria pisteytyksiä tässä logiikassa.
        break;
      case 'd': // Asiakaspalvelupisteessä tai sosiaalisessa ympäristössä.
        // Ei suoria pisteitä (asiakaspalveluhalukkuus näkyy mm. Q4 vastauksissa).
        break;
      default:
        break;
    }

    // Q4: Minkä verran haluat vuorovaikutusta muiden kanssa?
    switch (vastaukset.Q4) {
      case 'a': // Haluan työskennellä täysin itsenäisesti.
        // Täysin itsenäinen: ehkä vähentää pisteitä aloilta, joissa vaaditaan tiimityötä.
        // (Voisi vähentää pisteitä sosiaalisten alojen kategorioista.)
        break;
      case 'b': // Haluan työskennellä pääasiassa itsenäisesti.
        // Pääasiassa itsenäinen: ei lisäpisteitä tiimityötä vaativille aloille.
        break;
      case 'c': // Haluan työskennellä pääasiassa toisten kanssa.
        // Pääasiassa yhdessä: suosi tiimityöaloja (esim. L21P, L22P?)
        break;
      case 'd': // Haluan työskennellä muiden ihmisten kanssa.
        pisteet[4] += 2;  // L5P +2 (sosiaaliset alat)
        pisteet[7] += 2;  // L8P +2
        pisteet[8] += 2;  // L9P +2
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        pisteet[18] += 2; // L19P +2
        pisteet[19] += 2; // L20P +2
        pisteet[20] += 2; // L21P +2
        pisteet[21] += 2; // L22P +2
        pisteet[22] += 2; // L23P +2
        pisteet[23] += 2; // L24P +2
        break;
      default:
        break;
    }

    // Q5: Haluatko käyttää tietotekniikkaa työssäsi?
    switch (vastaukset.Q5) {
      case 'a': // Käytän mielelläni tietotekniikkaa osana työtä.
        // Tekniikkamyönteinen: ei rajoituksia, ehkä suosi teknisiä aloja (L1-L32 +0 default).
        break;
      case 'b': // Tietotekniikka voisi olla osa työtä, mutta ei pääosassa.
        // Kevyesti teknologia: neutraali, ei erityisiä muutoksia.
        break;
      case 'c': // Haluan, että työssä on vain vähän tietotekniikkaa.
        // Välttelee IT:tä: mahdollisesti vähennä pisteitä puhtaasti IT-aloilta (esim. L26?).
        break;
      case 'd': // En halua käyttää tietotekniikkaa työssä.
        // Ei IT: vähennä pisteitä tietotekniikka-aloilta (esim. L26P, L27P).
        break;
      case 'e': // Ei merkitystä.
        // Ei vaikutusta.
        break;
      default:
        break;
    }

    // Q6: Kuinka tärkeänä pidät työajan joustavuutta?
    switch (vastaukset.Q6) {
      case 'a': // Haluan täysin joustavat työajat.
        pisteet[0] += 2;  // L1P +2
        pisteet[1] += 2;  // L2P +2
        pisteet[2] += 1;  // L3P +1
        pisteet[3] += 1;  // L4P +1
        pisteet[4] += 2;  // L5P +2
        pisteet[5] += 2;  // L6P +2
        pisteet[6] += 2;  // L7P +2
        pisteet[7] += 1;  // L8P +1
        pisteet[8] += 1;  // L9P +1
        pisteet[9] += 1;  // L10P +1
        pisteet[10] += 1; // L11P +1
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 1; // L16P +1
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        break;
      case 'b': // Työajoissa olisi hyvä olla joustavuutta.
        pisteet[0] += 2;  // L1P +2
        pisteet[1] += 2;  // L2P +2
        pisteet[2] += 1;  // L3P +1
        pisteet[3] += 1;  // L4P +1
        pisteet[4] += 2;  // L5P +2
        pisteet[5] += 2;  // L6P +2
        pisteet[6] += 2;  // L7P +2
        pisteet[7] += 1;  // L8P +1
        pisteet[8] += 1;  // L9P +1
        pisteet[9] += 1;  // L10P +1
        pisteet[10] += 1; // L11P +1
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 1; // L16P +1
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        break;
      case 'c': // Kiinteät työajat sopivat minulle parhaiten.
        pisteet[2] += 2;  // L3P +2
        pisteet[3] += 2;  // L4P +2
        pisteet[6] += 2;  // L7P +2
        pisteet[7] += 1;  // L8P +1
        pisteet[8] += 1;  // L9P +1
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 1; // L12P +1
        pisteet[12] += 1; // L13P +1
        pisteet[13] += 1; // L14P +1
        pisteet[14] += 1; // L15P +1
        pisteet[15] += 1; // L16P +1
        pisteet[16] += 1; // L17P +1
        pisteet[17] += 1; // L18P +1
        pisteet[18] += 2; // L19P +2
        pisteet[19] += 2; // L20P +2
        pisteet[20] += 2; // L21P +2
        pisteet[21] += 2; // L22P +2
        break;
      case 'd': // Minulle ei ole väliä.
        pisteet[0] += 1;  // L1P +1
        pisteet[1] += 1;  // L2P +1
        pisteet[2] += 2;  // L3P +2
        pisteet[3] += 2;  // L4P +2
        pisteet[4] += 1;  // L5P +1
        pisteet[5] += 1;  // L6P +1
        pisteet[6] += 2;  // L7P +2
        pisteet[7] += 2;  // L8P +2
        pisteet[8] += 2;  // L9P +2
        pisteet[9] += 2;  // L10P +2
        pisteet[10] += 2; // L11P +2
        pisteet[11] += 2; // L12P +2
        pisteet[12] += 2; // L13P +2
        pisteet[13] += 2; // L14P +2
        pisteet[14] += 2; // L15P +2
        pisteet[15] += 2; // L16P +2
        pisteet[16] += 2; // L17P +2
        pisteet[17] += 2; // L18P +2
        break;
      default:
        break;
    }

    // Q7: Minkälainen koulutus sinulla on?
    switch (vastaukset.Q7) {
      case 'a': // Ei erityistä koulutusta.
        // Vähennetään pisteitä aloilta, jotka vaativat korkeampaa koulutusta:
        pisteet[11] -= 2; // L12P -2
        pisteet[12] -= 1; // L13P -1
        pisteet[13] -= 2; // L14P -2
        pisteet[14] -= 2; // L15P -2
        pisteet[16] -= 2; // L17P -2
        pisteet[18] -= 2; // L19P -2
        pisteet[20] -= 3; // L21P -3
        pisteet[21] -= 3; // L22P -3
        pisteet[22] -= 3; // L23P -3
        break;
      case 'b': // Ammatillinen tai kaupallinen peruskoulutus.
        pisteet[11] -= 1; // L12P -1
        pisteet[12] -= 1; // L13P -1
        pisteet[13] -= 1; // L14P -1
        pisteet[16] -= 2; // L17P -2
        pisteet[18] -= 2; // L19P -2
        pisteet[20] -= 3; // L21P -3
        pisteet[21] -= 2; // L22P -2
        pisteet[22] -= 1; // L23P -1
        break;
      case 'c': // Ammattikorkeakoulutus tai korkeakoulutus.
        // Korkea koulutus: ei vähennyksiä, mahdollisesti voisi lisätä pisteitä korkeaa osaamista vaativille aloille.
        break;
      default:
        break;
    }

    // Q8: Haluatko opetella uusia taitoja tai vaihtaa alaa?
    switch (vastaukset.Q8) {
      case 'a': // Kyllä, valmis opiskelemaan ja vaihtamaan alaa.
        // Hyvin joustava: lisätään pisteitä lähes kaikille aloille.
        for (let i = 0; i < 32; i++) {
          // +2 kaikille (oletetaan monipuolinen motivaatio, poikkeuksena L26 käsitelty alla)
          pisteet[i] += 2;
        }
        // Mahdollinen poikkeus: L26P voi olla hieman vähemmän (+2 jo annettu, joten ei erillistä käsittelyä tässä).
        break;
      case 'b': // Kyllä, valmis opiskelemaan, mutta en vaihda alaa.
        for (let i = 0; i < 32; i++) {
          pisteet[i] += 2;
        }
        // Pieni tarkennus: L26P +1 (oletettu jo +2 kaikille, joten korjataan L26P -1 jotta netto +1)
        pisteet[25] -= 1; // L26P: net +1
        break;
      case 'c': // En ole valmis opiskelemaan, mutta voin vaihtaa alaa.
        // Vain nykyisillä taidoilla: lisätään hieman pisteitä kaikille (osoittaa avoimuutta alanvaihtoon, mutta ei koulutukseen)
        for (let i = 0; i < 32; i++) {
          pisteet[i] += 1;
        }
        // Nostetaan hieman aloja, joihin voi siirtyä ilman lisäkoulutusta:
        pisteet[2] += 1;  // L3P +1 (käytännön aloja ehkä)
        pisteet[3] += 1;  // L4P +1
        break;
      case 'd': // En ole valmis opiskelemaan enkä vaihtamaan alaa.
        // Erittäin rajoittunut: ei lisäpisteitä mihinkään uuteen alaan.
        // (Voisi jopa vähentää pisteitä aloilta, jotka vaativat sopeutumista, mutta oletetaan 0.)
        break;
      case 'e': // En osaa sanoa.
        // Neutraali: lisätään pienesti pisteitä kaikkiin (kuten c, mutta jo tehty c täys +1, e ehkä sama).
        for (let i = 0; i < 32; i++) {
          pisteet[i] += 1;
        }
        break;
      default:
        break;
    }

    // Q9: Kuinka tärkeää sinulle on työn vakinaisuus?
    switch (vastaukset.Q9) {
      case 'a': // Etsin vakituista työtä.
        // Vakituinen työnhaku: suosii perinteisiä vakaita aloja (lisätään laajasti pisteitä).
        for (let i = 0; i < 32; i++) {
          pisteet[i] += 2;
        }
        // Pieni poikkeus: L25P (freelancer/kevytyrittäjä) hieman vähemmän kiinnostava:
        pisteet[24] -= 1; // L25P net +1
        break;
      case 'b': // Myös määräaikaiset työt käyvät.
        // Joustava työsuhde: lisätään hieman pisteitä laajasti.
        for (let i = 0; i < 32; i++) {
          pisteet[i] += 1;
        }
        break;
      case 'c': // Freelancer-työ sopisi minulle.
        // Freelancer: nostetaan erityisesti yrittäjä/freelance kategoriaa.
        pisteet[24] += 2; // L25P +2
        break;
      case 'd': // Ei ole väliä.
        // Neutraali: ei muutoksia.
        break;
      default:
        break;
    }

    // Q10: Kuinka haluat kehittyä ja oppia työssäsi?
    switch (vastaukset.Q10) {
      case 'a': // Haluan jatkuvaa koulutusta ja kehitystä työssäni.
        // Jatkuva oppiminen: lisätään pisteitä kaikille aloille (tarmokas oppija sopii moneen).
        for (let i = 0; i < 32; i++) {
          pisteet[i] += 2;
        }
        break;
      case 'b': // Voin kehittää itseäni, mutta en halua jatkuvaa opettelua.
        // Kohtuullinen kehitys: lisätään pieniä pisteitä kaikille.
        for (let i = 0; i < 32; i++) {
          pisteet[i] += 1;
        }
        break;
      case 'c': // Haluan, että työssäni riittää nykyiset taitoni.
        // Ei halua opiskella: vähennetään pisteitä aloilta, jotka vaativat jatkuvaa kehittymistä.
        // Esim. vähennetään korkeaa kehittymistä vaativat kategoriat:
        pisteet[25] -= 2; // L26P -2 (IT/erikoisalat vaativat oppimista?)
        // Muutoin, ei lisäyksiä.
        break;
      default:
        break;
    }

    // **Yhdistelmäsääntöjen käsittely** (ehdot useamman vastauksen perusteella):
    // Esimerkki: jos Q1 = 'a' (itsenäinen) JA Q5 = 'a' (IT myönteinen) → lisätään piste esim. L14P (jokin itsenäinen IT-ala).
    if (vastaukset.Q1 === 'a' && vastaukset.Q5 === 'a') {
      pisteet[13] += 1; // L14P +1
    }
    // Jos Q1 = 'a' (itsenäinen) JA Q6 = 'a' (haluaa joustavat ajat) → lisätään piste esim. L25P (yrittäjyys).
    if (vastaukset.Q1 === 'a' && vastaukset.Q6 === 'a') {
      pisteet[24] += 1; // L25P +1
    }
    // Jos Q6 = 'a' (joustavat ajat) JA Q9 = 'c' (freelancer) → vahvistetaan freelancer-profiilia.
    if (vastaukset.Q6 === 'a' && vastaukset.Q9 === 'c') {
      pisteet[24] += 1; // L25P +1
    }
    // Jos Q8 = 'a' (valmis vaihtamaan alaa) JA Q10 = 'a' (jatkuva oppija) → henkilö on erittäin muuntautumiskykyinen, lisätään yrittäjyyteenkin.
    if (vastaukset.Q8 === 'a' && vastaukset.Q10 === 'a') {
      pisteet[24] += 1; // L25P +1
    }
    // Jos Q3 = 'a' (sisätyö) JA Q10 = 'a' (jatkuva oppija) → voisi sopia toimistopainotteisille asiantuntija-aloille.
    if (vastaukset.Q3 === 'a' && vastaukset.Q10 === 'a') {
      pisteet[13] += 1; // L14P +1 (esim. asiantuntijatehtävä)
    }
    // Jos Q7 = 'c' (korkeakoulutus) JA Q8 = 'b' (ei alanvaihtoa, mutta oppii) → oletetaan halu pysyä korkeakoulutusta vaativalla alalla, nostetaan L1-L11?
    if (vastaukset.Q7 === 'c' && vastaukset.Q8 === 'b') {
      pisteet[20] += 2; // L21P +2 (esim. asiantuntija-/johtotehtävä)
    }
    // Jos Q4 = 'b' (pääasiassa itsenäisesti) JA Q10 = 'a' (jatkuva oppija) → nostetaan akateemisia aloja, jotka vaativat itsenäistä työotetta.
    if (vastaukset.Q4 === 'b' && vastaukset.Q10 === 'a') {
      pisteet[20] += 2; // L21P +2
    }
    // Esimerkkitapauksena mainittu: Q7 === 'b' && Q8 === 'a' → lisää pisteitä L14P–L21P:
    if (vastaukset.Q7 === 'b' && vastaukset.Q8 === 'a') {
      for (let i = 13; i <= 20; i++) {
        pisteet[i] += 1; // L14P ... L21P +1
      }
    }

    return pisteet;
  }

  const handleLaskeClick = () => {
    // Ensure all questions answered
    if (
      !vastaus1 || !vastaus2 || !vastaus3 || !vastaus4 || !vastaus5 ||
      !vastaus6 || !vastaus7 || !vastaus8 || !vastaus9 || !vastaus10
    ) {
      alert('Ole hyvä ja vastaa kaikkiin 10 kysymykseen.');
      return;
    }
    const vastaukset = {
      Q1: vastaus1,
      Q2: vastaus2,
      Q3: vastaus3,
      Q4: vastaus4,
      Q5: vastaus5,
      Q6: vastaus6,
      Q7: vastaus7,
      Q8: vastaus8,
      Q9: vastaus9,
      Q10: vastaus10
    };
    const pisteet = laskeVisualProfiili(vastaukset);
    // Järjestetään ammatit pisteiden perusteella ja valitaan top 5
    const indeksit = pisteet
      .map((p, i) => ({ index: i, score: p }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    const tulosLista = indeksit.map(item => ({
      nimi: ammattiNimet[item.index],
      pisteet: item.score
    }));
    setTulokset(tulosLista);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Tee henkilökuva ja työprofiili – täytä ensin 10 kohtaa</h2>

      {/* Kysymys 1 */}
      <div>
        <p><strong>1) Kuinka haluat tehdä työtä?</strong></p>
        <label>
          <input type="radio" name="q1" value="a" 
            onChange={() => setVastaus1('a')} checked={vastaus1 === 'a'} />
          a) Itsenäisesti ja voin itse tutustua työohjeisiin.
        </label><br/>
        <label>
          <input type="radio" name="q1" value="b" 
            onChange={() => setVastaus1('b')} checked={vastaus1 === 'b'} />
          b) Itsenäisesti, mutta haluan hyvän perehdytyksen.
        </label><br/>
        <label>
          <input type="radio" name="q1" value="c" 
            onChange={() => setVastaus1('c')} checked={vastaus1 === 'c'} />
          c) Itsenäisesti ja ohjatusti.
        </label><br/>
        <label>
          <input type="radio" name="q1" value="d" 
            onChange={() => setVastaus1('d')} checked={vastaus1 === 'd'} />
          d) Toisten henkilöiden kanssa vähällä ohjauksella.
        </label><br/>
        <label>
          <input type="radio" name="q1" value="e" 
            onChange={() => setVastaus1('e')} checked={vastaus1 === 'e'} />
          e) Toisten henkilöiden kanssa, mutta haluan tarkat ohjeet.
        </label>
      </div>

      <hr />

      {/* Kysymys 2 */}
      <div>
        <p><strong>2) Minkä verran haluat, että työssä on fyysisyyttä?</strong></p>
        <label>
          <input type="radio" name="q2" value="a" 
            onChange={() => setVastaus2('a')} checked={vastaus2 === 'a'} />
          a) Työ voi olla fyysisesti raskasta.
        </label><br/>
        <label>
          <input type="radio" name="q2" value="b" 
            onChange={() => setVastaus2('b')} checked={vastaus2 === 'b'} />
          b) Työ voisi olla pääasiassa fyysistä.
        </label><br/>
        <label>
          <input type="radio" name="q2" value="c" 
            onChange={() => setVastaus2('c')} checked={vastaus2 === 'c'} />
          c) Työ voisi olla pääasiassa toimistotyötä.
        </label><br/>
        <label>
          <input type="radio" name="q2" value="d" 
            onChange={() => setVastaus2('d')} checked={vastaus2 === 'd'} />
          d) Toivon toimistotyötä, jossa ei ole fyysisiä tehtäviä.
        </label>
      </div>

      <hr />

      {/* Kysymys 3 */}
      <div>
        <p><strong>3) Missä ympäristössä haluat työskennellä?</strong></p>
        <label>
          <input type="radio" name="q3" value="a" 
            onChange={() => setVastaus3('a')} checked={vastaus3 === 'a'} />
          a) Sisätiloissa (toimisto, varasto, tehdas).
        </label><br/>
        <label>
          <input type="radio" name="q3" value="b" 
            onChange={() => setVastaus3('b')} checked={vastaus3 === 'b'} />
          b) Ulkona ja liikkuvassa työssä.
        </label><br/>
        <label>
          <input type="radio" name="q3" value="c" 
            onChange={() => setVastaus3('c')} checked={vastaus3 === 'c'} />
          c) Vaihteleva ympäristö (sisä- ja ulkotyö).
        </label><br/>
        <label>
          <input type="radio" name="q3" value="d" 
            onChange={() => setVastaus3('d')} checked={vastaus3 === 'd'} />
          d) Asiakaspalvelupisteessä tai sosiaalisessa ympäristössä.
        </label>
      </div>

      <hr />

      {/* Kysymys 4 */}
      <div>
        <p><strong>4) Minkä verran haluat vuorovaikutusta muiden kanssa?</strong></p>
        <label>
          <input type="radio" name="q4" value="a" 
            onChange={() => setVastaus4('a')} checked={vastaus4 === 'a'} />
          a) Haluan työskennellä täysin itsenäisesti.
        </label><br/>
        <label>
          <input type="radio" name="q4" value="b" 
            onChange={() => setVastaus4('b')} checked={vastaus4 === 'b'} />
          b) Haluan työskennellä pääasiassa itsenäisesti.
        </label><br/>
        <label>
          <input type="radio" name="q4" value="c" 
            onChange={() => setVastaus4('c')} checked={vastaus4 === 'c'} />
          c) Haluan työskennellä pääasiassa toisten kanssa.
        </label><br/>
        <label>
          <input type="radio" name="q4" value="d" 
            onChange={() => setVastaus4('d')} checked={vastaus4 === 'd'} />
          d) Haluan työskennellä muiden ihmisten kanssa.
        </label>
      </div>

      <hr />

      {/* Kysymys 5 */}
      <div>
        <p><strong>5) Haluatko käyttää tietotekniikkaa työssäsi?</strong></p>
        <label>
          <input type="radio" name="q5" value="a" 
            onChange={() => setVastaus5('a')} checked={vastaus5 === 'a'} />
          a) Käytän mielelläni tietotekniikkaa osana työtä.
        </label><br/>
        <label>
          <input type="radio" name="q5" value="b" 
            onChange={() => setVastaus5('b')} checked={vastaus5 === 'b'} />
          b) Tietotekniikka voisi olla osa työtä, mutta ei pääosassa.
        </label><br/>
        <label>
          <input type="radio" name="q5" value="c" 
            onChange={() => setVastaus5('c')} checked={vastaus5 === 'c'} />
          c) Haluan, että työssä on vain vähän tietotekniikkaa.
        </label><br/>
        <label>
          <input type="radio" name="q5" value="d" 
            onChange={() => setVastaus5('d')} checked={vastaus5 === 'd'} />
          d) En halua käyttää tietotekniikkaa työssä.
        </label><br/>
        <label>
          <input type="radio" name="q5" value="e" 
            onChange={() => setVastaus5('e')} checked={vastaus5 === 'e'} />
          e) Ei merkitystä.
        </label>
      </div>

      <hr />

      {/* Kysymys 6 */}
      <div>
        <p><strong>6) Kuinka tärkeänä pidät työajan joustavuutta?</strong></p>
        <label>
          <input type="radio" name="q6" value="a" 
            onChange={() => setVastaus6('a')} checked={vastaus6 === 'a'} />
          a) Haluan täysin joustavat työajat.
        </label><br/>
        <label>
          <input type="radio" name="q6" value="b" 
            onChange={() => setVastaus6('b')} checked={vastaus6 === 'b'} />
          b) Työajoissa olisi hyvä olla joustavuutta.
        </label><br/>
        <label>
          <input type="radio" name="q6" value="c" 
            onChange={() => setVastaus6('c')} checked={vastaus6 === 'c'} />
          c) Kiinteät työajat sopivat minulle parhaiten.
        </label><br/>
        <label>
          <input type="radio" name="q6" value="d" 
            onChange={() => setVastaus6('d')} checked={vastaus6 === 'd'} />
          d) Minulle ei ole väliä.
        </label>
      </div>

      <hr />

      {/* Kysymys 7 */}
      <div>
        <p><strong>7) Minkälainen koulutus sinulla on?</strong></p>
        <label>
          <input type="radio" name="q7" value="a" 
            onChange={() => setVastaus7('a')} checked={vastaus7 === 'a'} />
          a) Ei erityistä koulutusta.
        </label><br/>
        <label>
          <input type="radio" name="q7" value="b" 
            onChange={() => setVastaus7('b')} checked={vastaus7 === 'b'} />
          b) Ammatillinen tai kaupallinen peruskoulutus.
        </label><br/>
        <label>
          <input type="radio" name="q7" value="c" 
            onChange={() => setVastaus7('c')} checked={vastaus7 === 'c'} />
          c) Ammattikorkeakoulutus tai korkeakoulutus.
        </label>
      </div>

      <hr />

      {/* Kysymys 8 */}
      <div>
        <p><strong>8) Haluatko opetella uusia taitoja tai vaihtaa alaa?</strong></p>
        <label>
          <input type="radio" name="q8" value="a" 
            onChange={() => setVastaus8('a')} checked={vastaus8 === 'a'} />
          a) Kyllä, olen valmis opiskelemaan ja vaihtamaan alaa.
        </label><br/>
        <label>
          <input type="radio" name="q8" value="b" 
            onChange={() => setVastaus8('b')} checked={vastaus8 === 'b'} />
          b) Kyllä, olen valmis opiskelemaan, mutta en vaihda alaa.
        </label><br/>
        <label>
          <input type="radio" name="q8" value="c" 
            onChange={() => setVastaus8('c')} checked={vastaus8 === 'c'} />
          c) En ole valmis opiskelemaan, mutta voin vaihtaa alaa.
        </label><br/>
        <label>
          <input type="radio" name="q8" value="d" 
            onChange={() => setVastaus8('d')} checked={vastaus8 === 'd'} />
          d) En ole valmis opiskelemaan, enkä vaihtamaan alaa.
        </label><br/>
        <label>
          <input type="radio" name="q8" value="e" 
            onChange={() => setVastaus8('e')} checked={vastaus8 === 'e'} />
          e) En osaa sanoa.
        </label>
      </div>

      <hr />

      {/* Kysymys 9 */}
      <div>
        <p><strong>9) Kuinka tärkeää sinulle on työn vakinaisuus?</strong></p>
        <label>
          <input type="radio" name="q9" value="a" 
            onChange={() => setVastaus9('a')} checked={vastaus9 === 'a'} />
          a) Etsin vakituista työtä.
        </label><br/>
        <label>
          <input type="radio" name="q9" value="b" 
            onChange={() => setVastaus9('b')} checked={vastaus9 === 'b'} />
          b) Etsin työtä myös määräaikaisten töiden joukosta.
        </label><br/>
        <label>
          <input type="radio" name="q9" value="c" 
            onChange={() => setVastaus9('c')} checked={vastaus9 === 'c'} />
          c) Freelancer-työ sopisi minulle.
        </label><br/>
        <label>
          <input type="radio" name="q9" value="d" 
            onChange={() => setVastaus9('d')} checked={vastaus9 === 'd'} />
          d) Minulle ei ole väliä työn vakinaisuudesta.
        </label>
      </div>

      <hr />

      {/* Kysymys 10 */}
      <div>
        <p><strong>10) Kuinka haluat kehittyä ja oppia työssäsi?</strong></p>
        <label>
          <input type="radio" name="q10" value="a" 
            onChange={() => setVastaus10('a')} checked={vastaus10 === 'a'} />
          a) Haluan jatkuvaa koulutusta ja kehitystä työssäni.
        </label><br/>
        <label>
          <input type="radio" name="q10" value="b" 
            onChange={() => setVastaus10('b')} checked={vastaus10 === 'b'} />
          b) Voin kehittää itseäni, mutta en halua jatkuvaa opettelua.
        </label><br/>
        <label>
          <input type="radio" name="q10" value="c" 
            onChange={() => setVastaus10('c')} checked={vastaus10 === 'c'} />
          c) Haluan, että työssäni riittää nykyiset taitoni.
        </label>
      </div>

      <hr />

      {/* Calculate button */}
      <button onClick={handleLaskeClick} style={{ margin: '20px 0', padding: '10px 20px' }}>
        Laske profiili
      </button>

      {/* Results */}
      {tulokset.length > 0 && (
        <div>
          <h3>Top 5 suositeltua ammattia:</h3>
          <ol>
            {tulokset.map((tulos, index) => (
              <li key={index}>
                {tulos.nimi} – {tulos.pisteet} pistettä
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
