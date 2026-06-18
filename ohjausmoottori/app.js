/* Yoro Ohjausmoottori — nuorten työtyyli & polkutesti
 *
 * LXP_QUESTIONS = tasan 10 kysymystä (sama kardinaliteetti kuin lxp.yoro.fi hire-workflow).
 * Ei koskaan lisätä Q11:ää LXP_QUESTIONS-taulukkoon — hire-prosessi ja profiiliavain
 * (esim. 1A2C3A4B5A6C7C8B9A) perustuvat 10 kysymykseen.
 *
 * TYOOHJAUS_QUESTIONS = vain tähän työkaluun; vaikuttaa polku-/ammattisuosituksiin,
 * ei LxP-avainta eikä työnantajan hakuprosessia.
 */

const LXP_QUESTIONS = [
  {
    id: 'q1',
    phase: 'Työskentely',
    text: 'Kuvaus työskentelytavastasi',
    options: [
      { key: 'a', label: 'Olen itsenäinen työntekijä ja voin perehtyä työohjeisiin omatoimisesti.' },
      { key: 'b', label: 'Haluan opastusta alkuun, mutta voin työskennellä itsenäisesti sen jälkeen.' },
      { key: 'c', label: 'Tykkään itsenäisestä työskentelystä, mutta tarvitsen säännöllistä apua ja ohjausta.' },
      { key: 'd', label: 'Pidän tiimityöstä, mutta myös vastuusta päätöksenteossa.' },
      { key: 'e', label: 'Tykkään tehdä tiimityötä, jossa on selkeä ohjaus.' },
    ],
    narrative: {
      a: 'Itsenäinen tekijä — pärjäät omatoimisesti.',
      b: 'Perehdyt nopeasti ja jatkat itsenäisesti.',
      c: 'Itsenäisyys + säännöllinen tuki toimii sinulle.',
      d: 'Tiimi ja vastuu — johtaja-aineista.',
      e: 'Selkeä ohjaus ja tiimi tuovat parhaan tuloksen.',
    },
  },
  {
    id: 'q2',
    phase: 'Ympäristö',
    text: 'Millaista työympäristöä arvostat?',
    options: [
      { key: 'a', label: 'Olen valmis fyysiseen työhön, joka on raskasta ja käytännönläheistä.' },
      { key: 'b', label: 'Pidän aktiivisesta työstä, joka ei ole liian kuormittavaa.' },
      { key: 'c', label: 'Pidän keskittymistä ja tarkkuutta vaativasta työstä.' },
      { key: 'd', label: 'Pidän ihmisläheisestä ja sosiaalisesta työympäristöstä.' },
    ],
    narrative: {
      a: 'Käytännön ja fyysinen työ sopii sinulle.',
      b: 'Aktiivinen työ ilman äärimmäistä rasitusta.',
      c: 'Keskittyminen ja tarkkuus ovat vahvuuksiasi.',
      d: 'Ihmisläheinen ympäristö motivoi sinua.',
    },
  },
  {
    id: 'q3',
    phase: 'Sijainti',
    text: 'Kumpi kuvaa sinua paremmin?',
    options: [
      { key: 'a', label: 'Pidän työskentelystä sisätiloissa rauhallisessa ympäristössä.' },
      { key: 'b', label: 'Tykkään työskennellä ulkona tai liikkuvassa työssä.' },
      { key: 'c', label: 'Nautin työstä, jossa työympäristö vaihtelee ja teen monenlaisia tehtäviä.' },
      { key: 'd', label: 'Sosiaaliset ympäristöt ja asiakaspalvelu motivoivat minua.' },
    ],
    narrative: {
      a: 'Rauhallinen sisätyöympäristö.',
      b: 'Ulkotyö ja liikkuminen.',
      c: 'Vaihtelu ja monipuolisuus.',
      d: 'Asiakaspalvelu ja sosiaaliset tilanteet.',
    },
  },
  {
    id: 'q4',
    phase: 'Päätökset',
    text: 'Miten suhtaudut päätöksentekoon työssä?',
    options: [
      { key: 'a', label: 'Tykkään työskennellä yksin ja kantaa vastuuta.' },
      { key: 'b', label: 'Arvostan työskentelyä yksin, mutta myös tiimityö onnistuu.' },
      { key: 'c', label: 'Työskentelen mielelläni tiimityössä, jossa yhteistyö on tärkeässä roolissa.' },
      { key: 'd', label: 'Toivon, että painopiste on ihmisten kanssa työskentelyssä.' },
    ],
    narrative: {
      a: 'Yksinvastuu ja itsenäisyys.',
      b: 'Itsenäisyys + yhteistyö tarvittaessa.',
      c: 'Tiimityö ja yhteispäätökset.',
      d: 'Ihmisten kanssa työskentely etusijalla.',
    },
  },
  {
    id: 'q5',
    phase: 'Digitaalisuus',
    text: 'Suhde tietotekniikkaan työssä',
    options: [
      { key: 'a', label: 'Olen taitava tietotekniikan käyttäjä ja hyödynnän sujuvasti erilaisia ohjelmistoja.' },
      { key: 'b', label: 'Hyödynnän tietotekniikkaa tarvittaessa ja pidän monipuolisista tehtävistä.' },
      { key: 'c', label: 'Viihdyn käytännön tekemiseen painottuvissa työtehtävissä.' },
      { key: 'd', label: 'Toivon löytäväni työn, jossa ei juuri tarvitse käyttää tietokonetta.' },
      { key: 'e', label: 'Olen joustava tehtävien suhteen, oli tietokoneen käyttöä paljon tai vähän.' },
    ],
    narrative: {
      a: 'Digitaaliset työkalut ovat vahvuus.',
      b: 'IT tarpeen mukaan, monipuolisuus tärkeää.',
      c: 'Käytännön tekeminen edellä.',
      d: 'Vähän ruutua, paljon tekemistä.',
      e: 'Joustava IT-suhteen suhteen.',
    },
  },
  {
    id: 'q6',
    phase: 'Työajat',
    text: 'Mitä ajattelet työajoista?',
    options: [
      { key: 'a', label: 'Arvostan täysin joustavia työaikoja, jotka voin päättää itse.' },
      { key: 'b', label: 'Joustavat työajat sopisivat minulle hyvin.' },
      { key: 'c', label: 'Pidän kiinteistä työajoista, jotka tuovat selkeyttä arkeen.' },
      { key: 'd', label: 'Sopeudun sekä kiinteisiin että joustaviin aikatauluihin.' },
    ],
    narrative: {
      a: 'Täysi aikatauluvapaus.',
      b: 'Joustavat työajat.',
      c: 'Selkeät, kiinteät työajat.',
      d: 'Sopeutuu molempiin.',
    },
  },
  {
    id: 'q7',
    phase: 'Koulutuspolku',
    text: 'Mikä kuvaa koulutuspolkuasi parhaiten?',
    hint: 'Valitse lähin vaihtoehto — voit olla samanaikaisesti koulussa ja suunnittelemassa jatko-opintoja.',
    options: [
      { key: 'a', label: 'Olen lukiossa tai harkitsen lukio-opintoja peruskoulun jälkeen.' },
      { key: 'b', label: 'Olen ammattikoulussa tai harkitsen ammattikoulu-opintoja peruskoulun jälkeen.' },
      { key: 'c', label: 'Minulla on keskiasteen koulutus (lukio- tai ammattitutkinto valmis).' },
      { key: 'd', label: 'Minulla on korkeakoulututkinto tai harkitsen korkeakoulu-opintoja (AMK/yliopisto).' },
      { key: 'e', label: 'En tiedä vielä — koulutusvalinta on auki.' },
    ],
    narrative: {
      a: 'Lukiopolku — nyt tai suunnitelmissa.',
      b: 'Ammattikoulupolku — nyt tai suunnitelmissa.',
      c: 'Keskiaste suoritettu — jatko-opinnot mahdollisia.',
      d: 'Korkeakoulutaso — nyt, suunnitelmissa tai valmis.',
      e: 'Koulutusvalinta vielä auki.',
    },
  },
  {
    id: 'q8',
    phase: 'Seuraava askel',
    text: 'Mikä kuvaa parhaiten seuraavaa askeltasi?',
    hint: 'Erityisesti jos sinulla on jo keskiaste — tämä auttaa näyttämään myös korkeakoulutason polkuja.',
    options: [
      { key: 'a', label: 'Haluan vielä tutkia vaihtoehtoja — en ole valmis päättämään.' },
      { key: 'b', label: 'Haluan jatkaa opiskelua korkeakoulutasolla (AMK tai yliopisto).' },
      { key: 'c', label: 'Haluan ensisijaisesti työelämään — opinnot mahdollisimman käytännönläheisesti.' },
      { key: 'd', label: 'Haluan yhdistää työn ja opinnot (esim. työssäoppiminen).' },
      { key: 'e', label: 'En osaa vielä sanoa.' },
    ],
    narrative: {
      a: 'Tutkit vielä — päätös myöhemmin.',
      b: 'Korkeakoulutason jatko-opinnot kiinnostavat.',
      c: 'Työelämä ensin — käytännönläheinen polku.',
      d: 'Työ ja opiskelu rinnakkain.',
      e: 'Seuraava askel vielä auki.',
    },
  },
  {
    id: 'q9',
    phase: 'Työsuhde',
    text: 'Millainen työsuhde sopii sinulle parhaiten?',
    options: [
      { key: 'a', label: 'Etsin vakituista työpaikkaa ja arvostan työn vakautta.' },
      { key: 'b', label: 'Voin työskennellä sekä vakituisessa että määräaikaisessa työsuhteessa.' },
      { key: 'c', label: 'Pidän freelancer-työn vapaudesta ja oman työajan hallinnasta.' },
    ],
    narrative: {
      a: 'Vakituinen työ ja vakaus.',
      b: 'Joustavuus työsuhteen muodossa.',
      c: 'Vapaus ja itsenäinen työ.',
    },
  },
  {
    id: 'q10',
    phase: 'Kehitys',
    text: 'Miten suhtaudut osaamisen kehittämiseen työssäsi?',
    options: [
      { key: 'a', label: 'Olen sitoutunut jatkuvaan oppimiseen ja kehitän aktiivisesti osaamistani.' },
      { key: 'b', label: 'Kehitän mielelläni taitojani, kunhan tahti on kohtuullinen.' },
      { key: 'c', label: 'Haluan, että työssäni riittää nykyiset taitoni.' },
    ],
    narrative: {
      a: 'Jatkuva oppija — kasvu on tärkeää.',
      b: 'Kehittyy tasaisesti.',
      c: 'Nykyiset taidot riittävät.',
    },
  },
];

if (LXP_QUESTIONS.length !== 10) {
  throw new Error('LXP_QUESTIONS must stay at 10 items (hire workflow compatibility)');
}

/** Työohjauskerros — EI osa LxP-avainta / lxp.yoro.fi hire-matchingia */
const TYOOHJAUS_QUESTIONS = [
  {
    id: 'precision',
    phase: 'Työohjaus',
    text: 'Miten kuvailisit omaa työskentelyäsi?',
    textPlain: 'Millaista tekijä olet?',
    hint: 'Tämä kysymys on vain uraohjaukseen — ei vaikuta työnantajan LxP-hakuun. Ei oikeaa vastausta.',
    hintPlain: 'Vain uraohjaukseen. Ei oikeaa vastausta.',
    options: [
      { key: 'a', label: 'Olen huolellinen ja tarkka — pienetkin virheet häiritsevät minua.', labelPlain: 'Olen tarkka. Pienet virheet häiritsevät.' },
      { key: 'b', label: 'Pyrin olemaan tarkka, mutta priorisoin usein kokonaiskuvan.', labelPlain: 'Yritän olla tarkka, mutta kokonaiskuva on tärkeämpi.' },
      { key: 'c', label: 'Olen suurpiirteinen — näen mieluummin kokonaisuuden kuin yksityiskohdat.', labelPlain: 'Olen suurpiirteinen. Näen mieluummin kokonaisuuden.' },
      { key: 'd', label: 'Teen välillä virheitä, mutta korjaan ne nopeasti eteenpäin mennessä.', labelPlain: 'Teen virheitä, mutta korjaan ne nopeasti.' },
    ],
    narrative: {
      a: 'Tarkkuus ja huolellisuus ovat vahvuuksiasi.',
      b: 'Tasapaino tarkkuuden ja kokonaiskuvan välillä.',
      c: 'Suur kuva ja kokonaisuus edellä — sopii esim. tuotekehitykseen ja luovaan tekemiseen.',
      d: 'Ketterä eteenpäin — virheet korjataan matkan varrella.',
    },
  },
  {
    id: 'drive',
    phase: 'Työohjaus',
    text: 'Mikä kuvaa sinua parhaiten työssä?',
    textPlain: 'Mikä sopii sinulle työssä?',
    hint: 'Vain uraohjaukseen — ei vaikuta työnantajan LxP-hakuun.',
    hintPlain: 'Vain uraohjaukseen.',
    options: [
      { key: 'a', label: 'Keksin mielelläni uusia ratkaisuja ja ideoita.', labelPlain: 'Keksin mielelläni uusia ideoita.' },
      { key: 'b', label: 'Vienn asiat loppuun, vaikka homma on hankala ja kestää kauan.', labelPlain: 'Vien asiat loppuun, vaikka homma on hankala.' },
      { key: 'c', label: 'Keksin mielelläni uusia ratkaisuja ja vien hankalatkin asiat loppuun saakka.', labelPlain: 'Keksin ideoita ja vien hankalat asiat loppuun.' },
      { key: 'd', label: 'Pidän työstä, jossa eteneminen on selkeää — en hae erityisesti pitkäkestoisia hankalia projekteja.', labelPlain: 'Pidän selkeästä etenemisestä. En hae pitkiä hankalia projekteja.' },
      { key: 'e', label: 'En osaa vielä sanoa.', labelPlain: 'En osaa vielä sanoa.' },
    ],
    narrative: {
      a: 'Luova ongelmanratkaisija — ideat edellä.',
      b: 'Sinnikäs tekijä — kestävyys vie pitkälle.',
      c: 'Luova ja sinnikäs — sopii erityisesti tuotekehitykseen ja vaativaan tekemiseen.',
      d: 'Selkeä eteneminen ja sopiva kuormitus — hankala grindaus ei motivoi.',
      e: 'Työtyyli vielä muotoutumassa.',
    },
  },
  {
    id: 'visibility',
    phase: 'Työohjaus',
    text: 'Miltä tuntuu puhua ihmisille, esitellä tai olla näkyvässä roolissa?',
    textPlain: 'Miltä tuntuu puhua ihmisille tai olla näkyvässä roolissa?',
    hint: 'Vain uraohjaukseen — auttaa karsimaan ammatteja, jotka vaativat paljon esiintymistä.',
    hintPlain: 'Vain uraohjaukseen. Auttaa valitsemaan sopivia ammatteja.',
    options: [
      { key: 'a', label: 'Epämukavalta — en halua olla esillä tai esiintyä.', labelPlain: 'Epämukavalta — en halua esiintyä.' },
      { key: 'b', label: 'Ihan ok pienessä porukassa tai 1:1-tilanteissa.', labelPlain: 'Ok pienessä porukassa tai 1:1.' },
      { key: 'c', label: 'Luontevaa — puhuminen ja näkyvyys sopivat minulle.', labelPlain: 'Luontevaa — puhuminen sopii minulle.' },
    ],
    narrative: {
      a: 'Esiintyminen ei ole vahvuutesi — suodatamme näkyvät roolit pois.',
      b: 'Pärjäät ihmisten kanssa pienessä porukassa — ei tarvitse olla lavalla.',
      c: 'Sosiaalinen rohkeus on vahvuus — näkyvät roolit sopivat.',
    },
  },
  {
    id: 'stress',
    phase: 'Työohjaus',
    text: 'Miten selviät, kun on kiire, häiriöitä tai epäselvää tilannetta?',
    textPlain: 'Miten selviät kiireestä tai epäselvistä tilanteista?',
    hint: 'Vain uraohjaukseen — auttaa karsimaan kiireisiä tai paineisia ammatteja.',
    hintPlain: 'Vain uraohjaukseen. Auttaa valitsemaan sopivaa työrytmiä.',
    options: [
      { key: 'a', label: 'Haluan rauhallisen ja ennustettavan työrytmin.', labelPlain: 'Haluan rauhallisen työrytmin.' },
      { key: 'b', label: 'Selviän kohtuullisesta paineesta ja kiireestä.', labelPlain: 'Selviän kohtuullisesta paineesta.' },
      { key: 'c', label: 'Paine ja kiire eivät haittaa — ne pitävät hereillä.', labelPlain: 'Paine ei haittaa.' },
    ],
    narrative: {
      a: 'Arvostat rauhallista työrytmiä — karsimme kiireisimmät ammatit.',
      b: 'Kohtuullinen paine sopii — useimmat polut käyvät.',
      c: 'Paine ei haittaa — kiireiset ja vaihtelevat työt voivat sopia.',
    },
  },
  {
    id: 'leisure',
    phase: 'Työohjaus',
    text: 'Miten vapaa-aikasi kuluu useimmiten?',
    textPlain: 'Miten vapaa-aikasi kuluu?',
    hint: 'Vain uraohjaukseen — auttaa arvioimaan, mikä työrytmi tuntuu luontevalta.',
    hintPlain: 'Vain uraohjaukseen. Auttaa valitsemaan sopivaa työrytmiä.',
    options: [
      { key: 'a', label: 'Yksin omaa juttua — pelit, sarjat, harrastus rauhassa', labelPlain: 'Yksin — pelit, sarjat tai harrastus rauhassa' },
      { key: 'b', label: 'Sekä yksin että kavereiden kanssa — riippuu päivästä', labelPlain: 'Vähän molempia — joskus yksin, joskus kavereiden kanssa' },
      { key: 'c', label: 'Usein muiden kanssa — porukassa, tapahtumissa, yhdessä tekemistä', labelPlain: 'Porukassa — tapahtumissa tai yhdessä tekemistä' },
    ],
    narrative: {
      a: 'Lataudut yksin — suosimme vähemmän jatkuvaa asiakaskontaktia.',
      b: 'Joustava vapaa-aika — emme painota sosiaalista rytmiä suuntaan tai toiseen.',
      c: 'Vietät aikaa muiden kanssa — sosiaalinen rytmi sopii ihmisläheisiin rooleihin.',
    },
  },
];

/** Motivaatiokerros — ei osa LxP-avainta */
const MOTIVATION_Q = [
  {
    id: 'meaning',
    phase: 'Motivaatio',
    type: 'multi',
    min: 1,
    max: 2,
    grid: true,
    text: 'Mistä työssä tulee sinulle merkitys?',
    textPlain: 'Mistä työssä tulee merkitys?',
    hint: 'Valitse 1–2 tärkeintä.',
    hintPlain: 'Valitse 1–2.',
    options: [
      { key: 'help', label: '❤️ Autan muita tai parannan hyvinvointia', labelPlain: '❤️ Autan muita' },
      { key: 'results', label: '📈 Näen tuloksia ja edistystä', labelPlain: '📈 Näen tuloksia' },
      { key: 'learn', label: '📚 Opin jatkuvasti uutta', labelPlain: '📚 Opin uutta' },
      { key: 'solve', label: '🔧 Ratkaisen käytännön tai teknisiä ongelmia', labelPlain: '🔧 Ratkaisen ongelmia' },
      { key: 'create', label: '💡 Keksin ja kehitän uutta', labelPlain: '💡 Keksin uutta' },
      { key: 'purpose', label: '🌍 Työllä on merkitystä yhteiskunnalle tai ympäristölle', labelPlain: '🌍 Yhteiskunta tai ympäristö' },
    ],
    narrative: {
      help: 'Merkitsevää on auttaa muita ja nähdä hyöty.',
      results: 'Motivoidut selkeistä tuloksista ja edistymisestä.',
      learn: 'Pidät työstä, jossa opit jatkuvasti.',
      solve: 'Saat virtaa ongelmien ratkaisemisesta.',
      create: 'Innostut uusien ratkaisujen keksimisestä.',
      purpose: 'Haluat työn, jolla on laajempi merkitys.',
    },
  },
  {
    id: 'recognition',
    phase: 'Motivaatio',
    type: 'single',
    text: 'Mikä pitää sinut motivoituneena, jos teet samanlaista työtä vuosia?',
    textPlain: 'Mikä pitää motivoituneena pitkään?',
    hint: 'Valitse yksi.',
    hintPlain: 'Valitse yksi.',
    options: [
      {
        key: 'praise',
        label: 'Viihdyn selkeästi paremmin, jos ansaisen työstäni kiitosta ja tunnustusta.',
        labelPlain: 'Tarvitsen kiitosta ja tunnustusta.',
      },
      {
        key: 'mastery',
        label: 'Minulle riittää viihtyvyyteen se, että näen työni onnistumisen.',
        labelPlain: 'Riittää kun näen että homma onnistuu.',
      },
      {
        key: 'calm_team',
        label: 'Minulle riittää viihtyvyyteen se, etten saa negatiivista palautetta ja työyhteisö on hyvä.',
        labelPlain: 'Riittää kun ei moitita ja tiimi on kunnossa.',
      },
    ],
    narrative: {
      praise: 'Viihdyt selkeästi paremmin, kun saat ansaitsemasi kiitoksen ja tunnustuksen — kysy työpaikoista, miten palautetta annetaan.',
      mastery: 'Sinulle riittää, että näet työn onnistumisen — tekniset asiantuntijaroolit voivat sopia hyvin.',
      calm_team: 'Sinulle riittää hyvä työyhteisö ja se, ettei työtä moitita turhaan — kiitosta et välttämättä saa paljon.',
    },
  },
];

const PATH_BY_MEANING = {
  help: ['health', 'service', 'society'],
  results: ['business', 'service'],
  learn: ['it', 'engineer', 'lab', 'creative'],
  solve: ['engineer', 'build', 'it', 'lab'],
  create: ['creative', 'engineer', 'it'],
  purpose: ['nature', 'society', 'health'],
};

const SUBJECTS = [
  { id: 'aidinkieli', label: 'Äidinkieli', emoji: '📖', sectors: ['luova', 'palvelu', 'yhteiskunta'] },
  { id: 'englanti', label: 'Englanti', emoji: '🇬🇧', sectors: ['palvelu', 'liiketoiminta', 'tekniikka'] },
  { id: 'ruotsi', label: 'Ruotsi', emoji: '🇸🇪', sectors: ['palvelu', 'yhteiskunta'] },
  { id: 'matematiikka', label: 'Matematiikka', emoji: '🔢', sectors: ['tekniikka', 'liiketoiminta'] },
  { id: 'fysiikka', label: 'Fysiikka', emoji: '⚛️', sectors: ['tekniikka'] },
  { id: 'kemia', label: 'Kemia', emoji: '🧪', sectors: ['tekniikka', 'terveys'] },
  { id: 'biologia', label: 'Biologia', emoji: '🧬', sectors: ['terveys', 'luonto'] },
  { id: 'maantieto', label: 'Maantieto', emoji: '🌍', sectors: ['luonto', 'yhteiskunta'] },
  { id: 'historia', label: 'Historia', emoji: '🏛️', sectors: ['yhteiskunta', 'luova'] },
  { id: 'yhteiskunta', label: 'Yhteiskuntaoppi', emoji: '⚖️', sectors: ['yhteiskunta', 'liiketoiminta'] },
  { id: 'uskonto', label: 'Uskonto / elämänkatsomus', emoji: '🕊️', sectors: ['palvelu', 'yhteiskunta'] },
  { id: 'kuvataide', label: 'Kuvataide', emoji: '🎨', sectors: ['luova'] },
  { id: 'musiikki', label: 'Musiikki', emoji: '🎵', sectors: ['luova'] },
  { id: 'kasityo', label: 'Käsityö / tekninen työ', emoji: '🔧', sectors: ['kaytanto', 'tekniikka'] },
  { id: 'kotitalous', label: 'Kotitalous', emoji: '🍳', sectors: ['terveys', 'palvelu'] },
  { id: 'liikunta', label: 'Liikunta', emoji: '🏃', sectors: ['palvelu'] },
];

/** Kiinnostusvastaus → polkujen sector-tagit */
function sectorsFromInterest(key) {
  const map = {
    tekniikka: ['tekniikka'],
    ihmiset: ['terveys'],
    terveys: ['terveys'],
    luonto: ['luonto'],
    kaytanto: ['kaytanto'],
    luova: ['luova'],
    liiketoiminta: ['liiketoiminta'],
    turvallisuus: ['yhteiskunta'],
    liikenne: ['palvelu'],
  };
  return map[key] || [];
}

const INTEREST_Q = [
  {
    id: 'i1',
    text: 'Mistä työaloista haluaisit kuulla lisää?',
    textPlain: 'Mistä aloista haluat kuulla lisää?',
    hint: 'Valitse kaksi — ajattele työtä, ei harrastusta.',
    hintPlain: 'Valitse kaksi. Ajattele työtä.',
    multi: 2,
    grid: true,
    options: [
      { key: 'tekniikka', label: '💻 Tekniikka ja digi', labelPlain: '💻 Tekniikka ja digi' },
      { key: 'ihmiset', label: '❤️ Ihmiset, opetus ja hoiva', labelPlain: '❤️ Ihmiset ja hoiva' },
      { key: 'luonto', label: '🌳 Luonto ja ympäristö', labelPlain: '🌳 Luonto ja ympäristö' },
      { key: 'kaytanto', label: '🔨 Rakentaminen ja käytännön työ', labelPlain: '🔨 Rakentaminen ja käytännön työ' },
      { key: 'luova', label: '🎨 Luova työ ja media', labelPlain: '🎨 Luova työ ja media' },
      { key: 'liiketoiminta', label: '📈 Liiketoiminta ja yrittäjyys', labelPlain: '📈 Liiketoiminta' },
      { key: 'turvallisuus', label: '🚓 Turvallisuus ja yhteiskunta', labelPlain: '🚓 Turvallisuus ja yhteiskunta' },
      { key: 'liikenne', label: '🚚 Liikenne, logistiikka ja palvelut', labelPlain: '🚚 Liikenne ja palvelut' },
    ],
  },
];

const EXPLORE_Q = {
  id: 'i4',
  text: 'Mikä olisi sinulle luontevin tapa tutustua työelämään?',
  textPlain: 'Miten haluat tutustua työelämään?',
  hint: 'Valitse yksi — tämä ohjaa seuraavaa askeltasi tuloksissa.',
  hintPlain: 'Valitse yksi. Tämä ohjaa seuraavaa askelta.',
  options: [
    { key: 'tet', label: 'Kokeilla käytännössä — TET, kesätyö tai harjoittelu', labelPlain: 'Kokeilla käytännössä (TET tai kesätyö)' },
    { key: 'study', label: 'Tutustua koulutuksiin ja opintoihin', labelPlain: 'Tutustua opintoihin' },
    { key: 'mentor', label: 'Kuulla ammattilaiselta, millaista työ on', labelPlain: 'Kuulla ammattilaiselta' },
    { key: 'explore', label: 'En tiedä vielä — haluan nähdä useita vaihtoehtoja', labelPlain: 'En tiedä vielä — haluan nähdä vaihtoehtoja' },
  ],
};

const ARCHETYPES = [
  {
    id: 'sukeltaja',
    emoji: '🎯',
    title: 'Syvä Sukeltaja',
    tagline: 'Itsenäinen, tarkka, syvennyt kun löydät oikean jutun.',
    strengths: [
      'Pärjäät hyvin omillasi, kun ohjeet ovat selkeät.',
      'Huolellisuus ja tarkkuus ovat vahvuuksiasi.',
      'Syvennyt mielelläsi, kun aihe tuntuu omalta.',
      'Digitaaliset työkalut tuntuvat luontevilta.',
    ],
    score(c) {
      let s = 0;
      if (c.independent) s += 8;
      if (c.precisionEnv) s += 7;
      if (c.digiStrong || c.digiOk) s += 6;
      if (c.leisureAlone) s += 6;
      if (c.visibilityLow) s += 5;
      if (c.precisionHigh) s += 5;
      if (c.recognitionMastery) s += 4;
      if (c.calmPace) s += 4;
      if (c.meaningLearn) s += 4;
      if (c.techSubject) s += 3;
      if (c.teamOriented && c.leisureSocial) s -= 6;
      return s;
    },
  },
  {
    id: 'ratkaisija',
    emoji: '💡',
    title: 'Ongelmanratkaisija',
    tagline: 'Analysoit, lasket, korjaat — aivot työssä.',
    strengths: [
      'Ratkaiset mielelläsi ongelmia ajattelemalla.',
      'Pidät työstä, jossa pitää olla tarkka.',
      'Pystyt työskentelemään itsenäisesti.',
      'Digitaaliset työkalut ovat sinulle luontevia.',
    ],
    score(c) {
      let s = 0;
      if (c.precisionEnv) s += 8;
      if (c.digiStrong) s += 8;
      if (c.soloDecisions) s += 6;
      if (c.meaningSolve) s += 8;
      if (c.interestSolve) s += 8;
      if (c.precisionHigh) s += 6;
      if (c.techSubject) s += 5;
      if (c.meaningLearn) s += 4;
      if (c.curious) s += 4;
      if (c.leisureAlone) s += 3;
      return s;
    },
  },
  {
    id: 'taustatekija',
    emoji: '🌿',
    title: 'Rauhallinen Taustatekijä',
    tagline: 'Teet parhaasi rauhassa — tarkkuus ja rytmi ennen näkyvyyttä.',
    strengths: [
      'Arvostat rauhallista ja ennustettavaa työrytmiä.',
      'Lataudut yksin — taustaroolit voivat sopia sinulle.',
      'Huolellisuus korostuu, kun kiire ei paina.',
      'Pärjäät hyvin, kun tehtävä on selkeä ja oma.',
    ],
    score(c) {
      let s = 0;
      if (c.visibilityLow) s += 10;
      if (c.leisureAlone) s += 10;
      if (c.calmPace) s += 8;
      if (c.recognitionCalm) s += 7;
      if (c.steadyProgress) s += 5;
      if (c.soloDecisions) s += 5;
      if (c.interestSolve || c.meaningResults) s += 4;
      if (c.visibilityHigh) s -= 18;
      if (c.leisureSocial) s -= 6;
      return s;
    },
  },
  {
    id: 'auttaja',
    emoji: '❤️',
    title: 'Ihmisläheinen Auttaja',
    tagline: 'Merkitsevää on auttaa — ihmiset ovat työn ydin.',
    strengths: [
      'Haluat, että työlläsi on merkitystä toisille.',
      'Auttaminen ja hoiva motivoivat sinua.',
      'Pärjäät parhaiten, kun vuorovaikutus tuntuu luontevalta.',
      'Ihmisläheiset tehtävät voivat sopia sinulle.',
    ],
    score(c) {
      let s = 0;
      if (c.meaningHelp) s += 10;
      if (c.interestHelp) s += 10;
      if (c.peopleFocus) s += 7;
      if (c.peopleEnv) s += 6;
      if (c.visibilityMid) s += 5;
      if (c.leisureMixed) s += 4;
      if (c.leisureSocial) s += 5;
      if (c.recognitionCalm) s += 4;
      if (c.leisureAlone && c.visibilityLow) s -= 22;
      if (c.visibilityLow && !c.leisureSocial) s -= 8;
      return s;
    },
  },
  {
    id: 'tiimipelaaja',
    emoji: '🤝',
    title: 'Tiimipelaaja',
    tagline: 'Energia tulee yhteisestä tekemisestä — porukassa parempi.',
    strengths: [
      'Saat energiaa tiimistä ja yhteisestä tekemisestä.',
      'Yhteistyö ja keskustelu tuovat parhaan tuloksen.',
      'Vietät vapaa-aikaasi mielelläsi muiden kanssa.',
      'Selkeä ohjaus ja tiimi tukevat sinua.',
    ],
    score(c) {
      let s = 0;
      if (c.teamOriented) s += 7;
      if (c.teamDecisions) s += 8;
      if (c.interestConnect) s += 8;
      if (c.leisureSocial) s += 8;
      if (c.leisureMixed) s += 4;
      if (c.peopleEnv) s += 5;
      if (c.recognitionCalm) s += 4;
      if (c.leisureAlone) s -= 14;
      if (c.visibilityLow) s -= 12;
      if (c.soloDecisions) s -= 6;
      const socialHits = [c.teamOriented, c.teamDecisions, c.interestConnect, c.leisureSocial].filter(Boolean).length;
      if (socialHits < 2) s -= 10;
      return s;
    },
  },
  {
    id: 'nakyva',
    emoji: '🎤',
    title: 'Näkyvä Tekijä',
    tagline: 'Esiintyminen ja vuorovaikutus ovat vahvuuksiasi.',
    strengths: [
      'Puhuminen ja näkyvyys tuntuvat luontevilta.',
      'Vietät aikaa muiden kanssa — sosiaalisuus on osa arkea.',
      'Pidät tilanteista, joissa olet esillä.',
      'Palaute ja tunnustus motivoivat sinua.',
    ],
    score(c) {
      let s = 0;
      if (c.visibilityHigh) s += 12;
      if (c.leisureSocial) s += 8;
      if (c.socialLocation) s += 7;
      if (c.recognitionPraise) s += 7;
      if (c.peopleFocus) s += 6;
      if (c.pressureOk) s += 4;
      if (c.interestConnect) s += 5;
      if (c.visibilityLow) s -= 20;
      if (c.leisureAlone) s -= 16;
      return s;
    },
  },
  {
    id: 'tekija',
    emoji: '🔧',
    title: 'Käytännön Tekijä',
    tagline: 'Näet kädet työssä — konkreettinen tulos motivoi.',
    strengths: [
      'Pidät käytännön tekemisestä ja näet työn tuloksen.',
      'Konkreettinen tekeminen motivoi sinua.',
      'Fyysinen tai käytännönläheinen työ sopii sinulle.',
      'Toimit mielelläsi ilman jatkuvaa ruutuaikaa.',
    ],
    score(c) {
      let s = 0;
      if (c.physicalEnv) s += 10;
      if (c.practicalWork) s += 9;
      if (c.interestBuild) s += 10;
      if (c.persistentDrive) s += 5;
      if (c.calmPace) s += 4;
      if (c.meaningSolve) s += 4;
      if (c.interestSolve) s += 3;
      return s;
    },
  },
  {
    id: 'luova',
    emoji: '✨',
    title: 'Luova Muotoilija',
    tagline: 'Ideat, kuvat, tarinat — luot uutta.',
    strengths: [
      'Luot mielelläsi uutta — ideat, kuvat tai tarinat.',
      'Luovuus on sinulle luonteva tapa toimia.',
      'Pidät työstä, jossa näkyy oma jälkesi.',
      'Digitaaliset ja luovat työkalut inspiroivat sinua.',
    ],
    score(c) {
      let s = 0;
      if (c.meaningCreate) s += 10;
      if (c.interestCreate) s += 10;
      if (c.creativeDrive) s += 8;
      if (c.creativeSubject) s += 12;
      if (c.precisionLow) s += 5;
      if (c.flexibleWork) s += 4;
      return s;
    },
  },
  {
    id: 'monitekija',
    emoji: '🚀',
    title: 'Monitekijä',
    tagline: 'Vaihtelu pitää sinut hereillä — et jaksa rutiinia.',
    strengths: [
      'Vaihtelu ja monipuolisuus pitävät sinut mukana.',
      'Joustat helposti erilaisissa tehtävissä.',
      'Et jaksa pitkää samanlaista rutiinia.',
      'Sovit erilaisiin työympäristöihin.',
    ],
    score(c) {
      let s = 0;
      if (c.varietyEnv) s += 10;
      if (c.flexibleWork) s += 8;
      if (c.steadyProgress) s += 6;
      if (c.meaningResults) s += 5;
      if (c.pressureOk) s += 4;
      if (c.leisureMixed) s += 5;
      if (c.meaningPurpose) s += 3;
      return s;
    },
  },
  {
    id: 'viimeistelija',
    emoji: '⚡',
    title: 'Sinnikäs Viimeistelijä',
    tagline: 'Vien asiat loppuun — tarkkuus ja kestävyys ratkaisevat.',
    strengths: [
      'Viennät hankalatkin hommat maaliin.',
      'Tarkkuus ja huolellisuus ovat vahvuuksiasi.',
      'Haluat kehittää osaamistasi jatkuvasti.',
      'Tulokset ja edistyminen motivoivat sinua.',
    ],
    score(c) {
      let s = 0;
      if (c.persistentDrive) s += 12;
      if (c.precisionHigh) s += 10;
      if (c.curious) s += 6;
      if (c.meaningResults) s += 6;
      if (c.recognitionMastery) s += 5;
      if (c.interestSolve) s += 4;
      if (c.precisionEnv) s += 4;
      return s;
    },
  },
  {
    id: 'tutkiva',
    emoji: '🔍',
    title: 'Tutkiva Tekijä',
    tagline: 'Vielä kartoitat — moni suunta voi avautua.',
    strengths: [
      'Olet avoin erilaisille työtavoille.',
      'Et ole vielä lukittu yhteen rooliin — se on vahvuus.',
      'Joustavuus auttaa löytämään oman polun.',
      'Kokeileminen käytännössä kertoo enemmän kuin testi.',
    ],
    score(c) {
      let s = 0;
      if (c.leisureMixed) s += 8;
      if (c.flexibleWork) s += 6;
      if (c.visibilityMid) s += 6;
      if (c.steadyProgress) s += 4;
      if (c.tyoohjaus.drive === 'e') s += 8;
      if (c.meaning.length >= 2) s += 5;
      if (c.teamOriented && c.soloDecisions) s += 4;
      return s;
    },
  },
];

function buildArchetypeContext(answers, tyoohjaus = {}, motivation = {}, interests = {}) {
  const meaning = motivation.meaning || [];
  const subjects = [...state.subjects];
  return {
    answers,
    tyoohjaus,
    motivation,
    interests,
    subjects,
    meaning,
    independent: answers.q1 === 'a' || answers.q1 === 'b',
    teamOriented: answers.q1 === 'd' || answers.q1 === 'e',
    precisionEnv: answers.q2 === 'c',
    physicalEnv: answers.q2 === 'a',
    peopleEnv: answers.q2 === 'd',
    varietyEnv: answers.q3 === 'c',
    socialLocation: answers.q3 === 'd',
    soloDecisions: answers.q4 === 'a' || answers.q4 === 'b',
    teamDecisions: answers.q4 === 'c',
    peopleFocus: answers.q4 === 'd',
    digiStrong: answers.q5 === 'a',
    digiOk: answers.q5 === 'b',
    practicalWork: answers.q5 === 'c' || answers.q5 === 'd',
    flexibleWork: answers.q5 === 'e',
    curious: answers.q10 === 'a' || answers.q10 === 'b',
    precisionHigh: tyoohjaus.precision === 'a',
    precisionLow: tyoohjaus.precision === 'c' || tyoohjaus.precision === 'd',
    creativeDrive: tyoohjaus.drive === 'a' || tyoohjaus.drive === 'c',
    persistentDrive: tyoohjaus.drive === 'b',
    steadyProgress: tyoohjaus.drive === 'd',
    visibilityLow: tyoohjaus.visibility === 'a',
    visibilityMid: tyoohjaus.visibility === 'b',
    visibilityHigh: tyoohjaus.visibility === 'c',
    calmPace: tyoohjaus.stress === 'a',
    pressureOk: tyoohjaus.stress === 'c',
    leisureAlone: tyoohjaus.leisure === 'a',
    leisureMixed: tyoohjaus.leisure === 'b',
    leisureSocial: tyoohjaus.leisure === 'c',
    meaningHelp: meaning.includes('help'),
    meaningCreate: meaning.includes('create'),
    meaningSolve: meaning.includes('solve'),
    meaningLearn: meaning.includes('learn'),
    meaningResults: meaning.includes('results'),
    meaningPurpose: meaning.includes('purpose'),
    recognitionPraise: motivation.recognition === 'praise',
    recognitionMastery: motivation.recognition === 'mastery',
    recognitionCalm: motivation.recognition === 'calm_team',
    interestHelp: meaning.includes('help'),
    interestConnect: tyoohjaus.visibility === 'c' || tyoohjaus.leisure === 'c',
    interestBuild: tyoohjaus.drive === 'b' || answers.q2 === 'a',
    interestCreate: meaning.includes('create') || tyoohjaus.drive === 'a' || tyoohjaus.drive === 'c',
    interestSolve: meaning.includes('solve') || meaning.includes('learn'),
    creativeSubject: subjects.some((s) => ['kuvataide', 'musiikki'].includes(s)),
    techSubject: subjects.some((s) => ['matematiikka', 'fysiikka', 'kemia'].includes(s)),
  };
}

function pickArchetype(answers, tyoohjaus = {}, motivation = {}, interests = {}) {
  const ctx = buildArchetypeContext(answers, tyoohjaus, motivation, interests);
  const ranked = ARCHETYPES
    .map((arch) => ({ arch, score: arch.score(ctx) }))
    .sort((x, y) => y.score - x.score);

  const top = ranked[0];
  const second = ranked[1];
  if (!top || top.score <= 0) {
    return ARCHETYPES.find((a) => a.id === 'tutkiva');
  }
  if (top.score < 12) {
    return ARCHETYPES.find((a) => a.id === 'tutkiva');
  }
  if (second && top.score - second.score <= 3 && second.score >= 12) {
    const layerWeight = (arch) => {
      const id = arch.id;
      if (['taustatekija', 'auttaja', 'nakyva', 'tiimipelaaja'].includes(id)) return 1;
      if (['luova', 'viimeistelija', 'ratkaisija'].includes(id)) return 1;
      return 0;
    };
    if (layerWeight(second.arch) > layerWeight(top.arch)) return second.arch;
  }
  return top.arch;
}

const PATHS = [
  {
    id: 'engineer',
    name: 'Tuotekehitys & insinööri',
    emoji: '⚙️',
    desc: 'Ideat, prototyypit, kehitys — luovuus ja sinnikkyys ratkaisevat; pieni hajamielisyys ei haittaa.',
    sectors: ['tekniikka'],
    subjects: ['matematiikka', 'fysiikka', 'kemia', 'kasityo'],
    workday: ['solve', 'build', 'data'],
    topics: ['tech', 'how'],
    lxp: { q2: ['c'], q5: ['a', 'b'], q1: ['a', 'b', 'd'], q10: ['a', 'b'] },
    tet: 'TET teknisellä alalla — tehdas, insinööritoimisto tai tuotekehitys',
    study: 'Lukio (pitkä matikka & fysiikka) tai teknillinen ammattikoulu',
  },
  {
    id: 'it',
    name: 'Ohjelmointi & digi',
    emoji: '💻',
    desc: 'Koodi, pelit, data — digitaalinen luominen ja ongelmanratkaisu.',
    sectors: ['tekniikka', 'luova'],
    subjects: ['matematiikka', 'englanti'],
    workday: ['solve', 'create', 'data'],
    topics: ['tech'],
    lxp: { q5: ['a'], q2: ['c'], q3: ['a'] },
    tet: 'TET IT-yrityksessä tai pelistudiossa',
    study: 'ICT-linja amiksessa tai tietotekniikka AMK:ssa',
  },
  {
    id: 'health',
    name: 'Terveys & hoiva',
    emoji: '🏥',
    desc: 'Auttaminen, hoiva, hyvinvointi — ihmisten parissa.',
    sectors: ['terveys'],
    subjects: ['biologia', 'kemia', 'kotitalous'],
    workday: ['help', 'connect'],
    topics: ['people'],
    lxp: { q2: ['d'], q4: ['c', 'd'], q1: ['c', 'd', 'e'] },
    tet: 'TET sairaalassa, hoivakodissa tai terveysasemalla',
    study: 'Lähihoitaja- tai sairaanhoitajaopinnot',
  },
  {
    id: 'creative',
    name: 'Luova & media',
    emoji: '🎨',
    desc: 'Design, video, musiikki, pelit — luominen ja viestintä.',
    sectors: ['luova'],
    subjects: ['kuvataide', 'musiikki', 'aidinkieli'],
    workday: ['create'],
    topics: ['creative'],
    lxp: { q2: ['c', 'd'], q5: ['a', 'b'] },
    tet: 'TET mediatalossa, peliyrityksessä tai mainostoimistossa',
    study: 'Medialinja, kuvataide tai muotoiluopinnot',
  },
  {
    id: 'build',
    name: 'Rakentaminen & käytännön tekeminen',
    emoji: '🏗️',
    desc: 'Työmaa, korjaus, asennus — näet mitä teit.',
    sectors: ['kaytanto'],
    subjects: ['kasityo', 'fysiikka', 'matematiikka'],
    workday: ['build', 'nature'],
    topics: ['how'],
    lxp: { q2: ['a', 'b'], q5: ['c', 'd'], q3: ['b'] },
    tet: 'TET rakennustyömaalla tai korjaamolla',
    study: 'Rakennusalan ammattikoulu',
  },
  {
    id: 'lab',
    name: 'Prosessi & laboratorio',
    emoji: '🔬',
    desc: 'Mittaus, testaus, laatu — tarkkuutta vaativa työ.',
    sectors: ['tekniikka', 'terveys'],
    subjects: ['kemia', 'biologia', 'fysiikka', 'matematiikka'],
    workday: ['solve', 'organize', 'data'],
    topics: ['how', 'tech'],
    lxp: { q2: ['c'], q3: ['a'], q10: ['a', 'b'] },
    tet: 'TET laboratoriossa tai tehtaalla',
    study: 'Laboratorioalan tai prosessiteollisuuden koulutus',
  },
  {
    id: 'service',
    name: 'Palvelu & asiakastyö',
    emoji: '💬',
    desc: 'Asiakaspalvelu, myynti, neuvonta — ihmisten kohtaaminen.',
    sectors: ['palvelu', 'liiketoiminta'],
    subjects: ['englanti', 'ruotsi', 'aidinkieli'],
    workday: ['connect', 'help'],
    topics: ['people', 'business'],
    lxp: { q2: ['d'], q3: ['d'], q4: ['d'] },
    tet: 'TET kaupassa, hotellissa tai asiakaspalvelussa',
    study: 'Kauppa-alan tai matkailun ammattikoulu',
  },
  {
    id: 'business',
    name: 'Liiketoiminta & järjestäminen',
    emoji: '📊',
    desc: 'Myynti, hallinto, projektit — asioiden vieminen eteenpäin.',
    sectors: ['liiketoiminta'],
    subjects: ['matematiikka', 'yhteiskunta', 'englanti'],
    workday: ['connect', 'organize', 'data'],
    topics: ['business'],
    lxp: { q1: ['d'], q4: ['b', 'c'], q9: ['a', 'b'] },
    tet: 'TET yrityksessä — myynti, hallinto tai markkinointi',
    study: 'Tradenomi, kauppatieteet tai liiketalous (AMK/yliopisto)',
  },
  {
    id: 'nature',
    name: 'Luonto & ympäristö',
    emoji: '🌲',
    desc: 'Metsä, maatalous, ympäristö — ulkoilma ja kestävyys.',
    sectors: ['luonto'],
    subjects: ['biologia', 'maantieto'],
    workday: ['build', 'nature'],
    topics: ['nature'],
    lxp: { q3: ['b'], q2: ['a', 'b'] },
    tet: 'TET metsäyrityksessä, tilalla tai ympäristötehtävissä',
    study: 'Luonnonvara-alan ammattikoulu',
  },
  {
    id: 'society',
    name: 'Yhteiskunta & turvallisuus',
    emoji: '⚖️',
    desc: 'Hallinto, oikeus, turvallisuus — yhteiskunnan toiminta.',
    sectors: ['yhteiskunta'],
    subjects: ['historia', 'yhteiskunta', 'uskonto'],
    workday: ['organize', 'help', 'connect'],
    topics: ['people'],
    lxp: { q2: ['c', 'd'], q7: ['a', 'd'], q8: ['b'] },
    tet: 'TET kunnassa, poliisilla tai järjestössä',
    study: 'Hallinto- tai oikeusalan opinnot',
  },
];

/** TE24-tyyppiset ammatit polkuryhmittäin — eroteltu perus- ja korkeakoulutaso */
const OCCUPATIONS_BY_PATH = {
  health: {
    vocational: [
      'Lähihoitaja', 'Lastenhoitaja', 'Hoiva-avustaja', 'Kodinhoitaja', 'Kuntoutusohjaaja',
    ],
    higherEd: [
      'Sairaanhoitaja', 'Fysioterapeutti', 'Toimintaterapeutti', 'Farmaseutti', 'Kätilö',
      'Ensihoitaja', 'Mielenterveyshoitaja', 'Radiograafi', 'Laboratoriohoitaja', 'Geronomi',
      'Optikko', 'Terveydenhoitaja', 'Hammashoitaja',
    ],
  },
  service: {
    vocational: [
      'Myyjä', 'Tarjoilija', 'Kokki', 'Ravintola- ja suurtaloustyöntekijä',
      'Autonkuljettaja (paketti- ja jakeluautot)', 'Kuorma-auton ja yhdistelmäajoneuvon kuljettaja',
      'Siivooja', 'Hotellityöntekijä', 'Asiakaspalvelutyöntekijä', 'Kassatyöntekijä',
      'Parturi-kampaaja', 'Kosmetologi', 'Baarimikko', 'Huoltoaseman työntekijä', 'Turistikokelas',
    ],
    higherEd: [
      'Myyntiedustaja', 'Matkailupalvelutyöntekijä', 'Ravintolapäällikkö', 'Hotellipäällikkö',
      'Tapahtumakoordinaattori', 'Matkailun tradenomi', 'Asiakaskokemusasiantuntija',
      'Myyntipäällikkö', 'Markkinoinnin asiantuntija (palveluala)',
    ],
  },
  business: {
    vocational: [
      'Toimisto- ja hallintosihteeri', 'Sihteeri', 'Toimistotyöntekijä', 'Toimistovirkailija',
      'Varastotyöntekijä', 'Varasto- ja logistiikkatyöntekijä', 'Assistentti',
      'Henkilöstöhallinnon assistentti', 'Ostorihallinnan työntekijä', 'Projektisihteeri',
      'Vienti- ja tuontisihteeri', 'Hallintovirkailija', 'Merkonomi',
    ],
    higherEd: [
      'Tradenomi', 'Kauppatieteiden tradenomi', 'Projektipäällikkö', 'Liiketoimintakonsultti',
      'Markkinoinnin asiantuntija', 'HR-asiantuntija', 'Talousanalyytikko', 'Talousjohtaja',
      'Myyntijohtaja', 'Tuotepäällikkö', 'Yrittäjä', 'Vienti-insinööri',
      'Logistiikan asiantuntija', 'Kirjanpitäjä (KTK / tradenomi)', 'Tilintarkastaja',
      'Asiantuntijasihteeri', 'Taloushallinnon asiantuntija',
    ],
  },
  society: {
    vocational: [
      'Vartija', 'Lastenohjaaja', 'Sosiaaliohjaaja', 'Ohjaaja', 'Turvallisuusalan työntekijä',
      'Vanhustenhoitaja (sosiaali)',
    ],
    higherEd: [
      'Peruskoulun opettaja', 'Päiväkodin opettaja', 'Sosiaalityöntekijä', 'Poliisi',
      'Erityisopettaja', 'Nuorisotyöntekijä', 'Kuraattori', 'Oikeusavustaja', 'Tullivirkailija',
      'Rajavartija', 'Kunnanhallinnon asiantuntija', 'Paloesimies', 'Hallintotieteiden maisteri (kunta)',
    ],
  },
  build: {
    vocational: [
      'Rakennustyöntekijä', 'Sähköasentaja', 'Kiinteistönhoitaja', 'Koneenasentaja',
      'Konepaja- ja metallityöntekijä', 'Putkiasentaja', 'Maalari', 'LVI-asentaja',
      'Rakennusapumies', 'Hitsaaja', 'Levyseppä', 'Teollisuuspuuseppä', 'Koneistaja',
      'Autokorimekaanikko', 'Ilmanvaihtoasentaja', 'Huoltoasentaja',
    ],
    higherEd: [
      'Rakennusmestari', 'Rakennusvalvoja', 'Rakennusinsinööri', 'Sähköinsinööri (rakennusala)',
      'LVI-suunnittelija', 'Kiinteistöjohtaja', 'Työmaapäällikkö', 'Projekti-insinööri (rakennus)',
    ],
  },
  engineer: {
    vocational: [
      'Koneistaja', 'Automaatioasentaja', 'Laadunvalvontatyöntekijä', 'Tuotantolinjan operaattori',
      'Huoltoasentaja', 'Mittateknikko',
    ],
    higherEd: [
      'Insinööri', 'Tuotekehittäjä', 'Konetekniikan insinööri', 'Sähköinsinööri', 'Rakennusinsinööri',
      'Prosessisuunnittelija', 'Projektisuunnittelija', 'Laatuinsinööri', 'Ympäristöinsinööri',
      'Automaatiosuunnittelija', 'Energiainsinööri', 'Koneinsinööri', 'Mekaniikkasuunnittelija',
      'Tuotantosuunnittelija', 'Geotekniikan insinööri', 'Tuote- ja muotoiluinsinööri',
      'Rakennesuunnittelija', 'Tuotanto- ja kehitysinsinööri',
    ],
  },
  it: {
    vocational: [
      'IT-tukihenkilö', 'Verkkoteknikko', 'Tietokoneasentaja',
    ],
    higherEd: [
      'Ohjelmistokehittäjä', 'Web-kehittäjä', 'Peliohjelmoija', 'Data-analyytikko',
      'Kyberturvallisuusasiantuntija', 'Pilviarkkitehti', 'DevOps-insinööri', 'UX/UI-suunnittelija',
      'Tietokantasuunnittelija', 'Tekoälyasiantuntija', 'Järjestelmäsuunnittelija',
      'Mobiilisovelluskehittäjä', 'Testausinsinööri', 'IT-projektipäällikkö', 'Pelisuunnittelija',
      'Tietoturva-asiantuntija', 'Verkkosuunnittelija',
    ],
  },
  lab: {
    vocational: [
      'Teollisuuden prosessityöntekijä', 'Laadunvalvontatyöntekijä', 'Tehdastyöntekijä',
      'Pakkauskoneen hoitaja', 'Tuotantolinjan operaattori', 'Laadunvalvojan assistentti',
    ],
    higherEd: [
      'Laboratorioanalyytikko', 'Kemian laborantti', 'Prosessinhoitaja', 'Mittateknikko',
      'Tutkimusavustaja', 'Biotekniikan laborantti', 'Ympäristöanalyytikko', 'Kemikaaliteknikko',
      'Elintarviketehdasasiantuntija', 'Laadunvalvontainsinööri', 'Tutkimusinsinööri',
    ],
  },
  nature: {
    vocational: [
      'Metsätyöntekijä', 'Maatalouskoneenkuljettaja', 'Metsäkoneenkuljettaja', 'Kalastaja',
      'Eläintenhoitaja', 'Puutarhuri', 'Maanviljelijä', 'Karjanhoitaja',
    ],
    higherEd: [
      'Maatalousyrittäjä', 'Metsänhoitaja', 'Ympäristötyöntekijä', 'Luonnonsuojelutyöntekijä',
      'Maaseutuyrittäjä', 'Viljelijä', 'Metsätalousinsinööri', 'Ympäristösuunnittelija',
      'Luonnonvara-alan asiantuntija', 'Viininviljelijä',
    ],
  },
  creative: {
    vocational: [
      'Mediapalvelutyöntekijä', 'Valokuvaaja (freelance)', 'Sisällöntuottaja',
    ],
    higherEd: [
      'Graafinen suunnittelija', 'Toimittaja', 'Muusikko', 'Näyttelijä', 'Elokuvaaja',
      'Animaattori', 'Muotoilija', 'Sisustussuunnittelija', 'Mainosgraafikko', 'Kuvataiteilija',
      'Tekstiilimuotoilija', 'Pelisuunnittelija', 'Visuaalinen suunnittelija', 'Luova kirjoittaja',
      'Koreografi', 'Medianomi', 'Viestintäasiantuntija',
    ],
  },
};

function hasHigherEdBackground(answers) {
  return answers.q7 === 'd' || answers.q8 === 'b';
}

/** Ammatin näkyvyys- ja stressiprofiili suodatusta varten */
function occupationWorkProfile(jobName) {
  const n = jobName.toLowerCase();
  let visibility = 'medium';
  let stress = 'medium';

  if (
    /myyj|myynti|myyntiedustaja|asiakaspalvelu|tarjoilija|ravintola|kokki|baarimikko|hotelli|toimittaja|näyttelijä|elokuvaaja|muusikko|koreografi|medianomi|viestintä|markkinointi|mainos|tapahtuma|turistikokelas|asiakaskokemus|myyntipäällikkö|ravintolapäällikkö|hotellipäällikkö/.test(n)
  ) {
    visibility = 'high';
  } else if (
    /opettaja|päiväkodin|erityisopettaja|nuorisotyö|luenno|esiinty/.test(n)
  ) {
    visibility = 'high';
  } else if (
    /laboratorio|analyytikko|ohjelmoija|kehittäjä|sihteeri|hallinto|kirjanpit|varasto|koneistaja|tutkija|tutkimus|metsä|maatalous|puutarhuri|ohjelmoija|data-analyytikko|testausinsinööri/.test(n)
  ) {
    visibility = 'low';
  }

  if (
    /ensihoitaja|poliisi|päivyst|vartija|turvallisuus|paloesimies|rajavartija|kokki|tarjoilija|ravintola|työmaapäällikkö|rakennusmestari|myyjä|kassatyöntekijä/.test(n)
  ) {
    stress = 'high';
  } else if (
    /laboratorio|analyytikko|hallinto|sihteeri|kirjanpit|tutkimusavustaja|ohjelmoija|kehittäjä|koneistaja|metsänhoitaja|puutarhuri|lähihoitaja|lastenhoitaja|kodinhoitaja/.test(n)
  ) {
    stress = 'low';
  }

  return { visibility, stress };
}

function hasHighHelpInterest(motivation = {}, interests = {}) {
  return (motivation.meaning || []).includes('help');
}

/** Työpäiväsignaalit motivaatiosta ja työohjauksesta (i2-kysymys poistettu) */
function workdaySignals(motivation = {}, tyoohjaus = {}) {
  const signals = new Set();
  const meaningMap = {
    help: 'help',
    solve: 'solve',
    create: 'create',
    learn: 'solve',
    results: 'organize',
    purpose: 'nature',
  };
  (motivation.meaning || []).forEach((m) => {
    if (meaningMap[m]) signals.add(meaningMap[m]);
  });
  if (tyoohjaus.drive === 'a' || tyoohjaus.drive === 'c') signals.add('create');
  if (tyoohjaus.drive === 'b') signals.add('build');
  if (tyoohjaus.precision === 'a') signals.add('solve');
  if (tyoohjaus.visibility === 'c') signals.add('connect');
  if (tyoohjaus.leisure === 'c') signals.add('connect');
  return [...signals];
}

function detectAspirationMismatch(tyoohjaus = {}, motivation = {}, interests = {}) {
  return tyoohjaus.leisure === 'a'
    && tyoohjaus.visibility === 'a'
    && hasHighHelpInterest(motivation, interests);
}

function occupationMatchesTyoohjaus(jobName, tyoohjaus = {}, motivation = {}, interests = {}) {
  const { visibility, stress } = occupationWorkProfile(jobName);
  const vis = tyoohjaus.visibility;
  const str = tyoohjaus.stress;
  const leisure = tyoohjaus.leisure;
  const n = jobName.toLowerCase();

  if (vis === 'a' && visibility === 'high') return false;
  if (vis === 'b' && visibility === 'high') return false;

  if (str === 'a' && stress === 'high') return false;

  if (leisure === 'a' && vis === 'a') {
    if (/myyj|myynti|tarjoilija|ravintola|asiakaspalvelu|myyntiedustaja|baarimikko|kassatyöntekijä/.test(n)) {
      return false;
    }
  }

  if (detectAspirationMismatch(tyoohjaus, motivation, interests)) {
    if (/myyj|myynti|tarjoilija|ravintola|asiakaspalvelu|myyntiedustaja|markkinointi/.test(n)) {
      return false;
    }
  }

  return true;
}

function occupationMeaningTags(jobName) {
  const n = jobName.toLowerCase();
  const tags = new Set();

  if (/hoiva|hoitaja|sairaan|lähihoit|fysioterap|lastenhoit|kodinhoit|sosiaal|opettaja|päiväkoti|nuorisotyö|psykolog|terapeut|kuntout/.test(n)) {
    tags.add('help');
  }
  if (/myyj|myynti|kauppa|markkinointi|kirjanpit|tilinhoit|asiakaspalvelu|yrittäj|tradenomi|prov|pankki/.test(n)) {
    tags.add('results');
  }
  if (/ohjelmoija|kehittäjä|tutkija|tutkimus|laboratorio|analyytikko|insinööri|suunnittel|data-/.test(n)) {
    tags.add('learn');
  }
  if (/asentaja|koneistaja|rakennus|sähkö|automaatio|kunnossapito|korjaus|mekaniik|lvi|hitsaa|työnjoht/.test(n)) {
    tags.add('solve');
  }
  if (/suunnittelija|muusikko|kuvataite|graafinen|medianomi|koreografi|näyttelijä|muotoil|valokuva|elokuva|mainos/.test(n)) {
    tags.add('create');
  }
  if (/metsä|maatalous|puutarh|ympäristö|luonto|poliisi|paloesimies|vartija|turvallisuus|sairaanhoit/.test(n)) {
    tags.add('purpose');
  }

  return [...tags];
}

function occupationMeaningFit(jobName, meaningPicks = []) {
  if (!meaningPicks?.length) return 'strong';
  const tags = occupationMeaningTags(jobName);
  const overlap = meaningPicks.filter((p) => tags.includes(p)).length;
  if (overlap >= 2) return 'strong';
  if (meaningPicks.length === 1 && overlap === 1) return 'strong';
  if (overlap === 1) return 'partial';
  return 'none';
}

function occupationsForPath(pathId, answers, tyoohjaus = {}, motivation = {}, interests = {}) {
  const tiers = OCCUPATIONS_BY_PATH[pathId];
  if (!tiers) return [];
  const list = hasHigherEdBackground(answers)
    ? (tiers.higherEd.length ? [...tiers.higherEd] : [...tiers.vocational])
    : [...tiers.vocational, ...tiers.higherEd];
  const meaningPicks = motivation.meaning || [];
  return list.filter((job) => {
    if (!occupationMatchesTyoohjaus(job, tyoohjaus, motivation, interests)) return false;
    if (!meaningPicks.length) return true;
    return occupationMeaningFit(job, meaningPicks) !== 'none';
  });
}

function allOccupationsForPath(pathId, answers) {
  const tiers = OCCUPATIONS_BY_PATH[pathId];
  if (!tiers) return [];
  if (hasHigherEdBackground(answers)) {
    return tiers.higherEd.length ? [...tiers.higherEd] : [...tiers.vocational];
  }
  return [...tiers.vocational, ...tiers.higherEd];
}

function occupationCountForPath(pathId, answers, tyoohjaus = {}, motivation = {}, interests = {}) {
  return occupationsForPath(pathId, answers, tyoohjaus, motivation, interests).length;
}

function occupationFilterNote(pathId, answers, tyoohjaus = {}, motivation = {}, interests = {}) {
  const all = allOccupationsForPath(pathId, answers);
  const meaningPicks = motivation.meaning || [];
  const tyoohjausFiltered = all.filter((job) => occupationMatchesTyoohjaus(job, tyoohjaus, motivation, interests));
  const shown = occupationsForPath(pathId, answers, tyoohjaus, motivation, interests);
  const notes = [];
  const tyoohjausHidden = all.length - tyoohjausFiltered.length;
  if (tyoohjausHidden > 0) {
    notes.push(`Piilotimme ${tyoohjausHidden} ammattia, jotka vaativat enemmän esiintymistä, kiirettä tai asiakaskontaktia kuin valitsit.`);
  }
  if (meaningPicks.length) {
    const meaningHidden = tyoohjausFiltered.filter((job) => occupationMeaningFit(job, meaningPicks) === 'none').length;
    if (meaningHidden > 0) {
      notes.push(`Piilotimme ${meaningHidden} ammattia, jotka eivät vastanneet merkitysvalintoihisi.`);
    }
  }
  if (!notes.length && all.length > shown.length) {
    notes.push(`Piilotimme ${all.length - shown.length} ammattia valintojesi perusteella.`);
  }
  return notes.join(' ');
}

function occupationHintFor(answers) {
  if (hasHigherEdBackground(answers)) {
    return 'Esimerkkejä korkeakoulutasoiseen polkuun sopivista ammateista (TE24) — ei perustason toimisto- tai käytännön tehtäviä. Jokainen ammatti linkittyy Opintopolkuun ja Työmarkkinatoriin.';
  }
  return 'Esimerkkejä tämän polun ammateista (TE24) — avaa opinnot tai työpaikkahaku yhdellä klikillä.';
}

/** Polkukohtaiset hakusanat ulkoisiin palveluihin (P2) */
const PATH_LINKS = {
  engineer: { opinto: 'insinööri ammattikoulu', opintoHigher: 'insinööri AMK', jobs: 'insinööri', tet: 'teknologia' },
  it: { opinto: 'tieto- ja viestintätekniikka', opintoHigher: 'tietotekniikka', jobs: 'ohjelmistokehittäjä', tet: 'tietotekniikka' },
  health: { opinto: 'lähihoitaja', opintoHigher: 'sairaanhoitaja', jobs: 'sairaanhoitaja', tet: 'sosiaali- ja terveysala' },
  creative: { opinto: 'media-alan koulutus', opintoHigher: 'medianomi', jobs: 'graafinen suunnittelija', tet: 'media' },
  build: { opinto: 'rakennusala ammattikoulu', opintoHigher: 'rakennusmestari', jobs: 'rakennustyöntekijä', tet: 'rakennus' },
  lab: { opinto: 'laboratorioala', opintoHigher: 'laboratorioanalyytikko', jobs: 'laboratorio', tet: 'teollisuus' },
  service: { opinto: 'kauppa-alan ammattikoulu', opintoHigher: 'matkailuala', jobs: 'myyjä', tet: 'asiakaspalvelu' },
  business: { opinto: 'tradenomi', opintoHigher: 'kauppatieteet', jobs: 'myynti', tet: 'yritys' },
  nature: { opinto: 'luonnonvara-ala', opintoHigher: 'metsätalous', jobs: 'metsätyöntekijä', tet: 'luonto' },
  society: { opinto: 'sosiaali- ja terveysala', opintoHigher: 'sosiaalityö', jobs: 'sosiaalityöntekijä', tet: 'kunta' },
};

const TE24_SOURCE_URL = 'https://stat.fi/fi/luokitukset/ammatti/';

function opintopolkuUrl(term) {
  return `https://opintopolku.fi/konfo/fi/haku/${encodeURIComponent(term)}`;
}

function tyomarkkinatoriUrl(term) {
  return `https://tyomarkkinatori.fi/henkiloasiakkaat/avoimet-tyopaikat?lang=fi&q=${encodeURIComponent(term)}`;
}

function tetPaikatUrl() {
  return 'https://tetpaikat.tet.fi/fi/home';
}

function ohjaamoUrl() {
  return 'https://ohjaamot.fi/';
}

function pathLinkTerms(path, answers) {
  const links = PATH_LINKS[path.id] || {};
  const opinto = (hasHigherEdBackground(answers) && links.opintoHigher)
    ? links.opintoHigher
    : (links.opinto || path.study || path.name);
  const jobs = links.jobs || opinto;
  const tet = links.tet || jobs;
  return { opinto, jobs, tet };
}

function renderOccupationItem(job) {
  const opUrl = opintopolkuUrl(job);
  const jobUrl = tyomarkkinatoriUrl(job);
  return `<li class="occupation-item">
    <span class="occupation-name">${job}</span>
    <span class="occupation-links">
      <a class="occ-link" href="${opUrl}" target="_blank" rel="noopener noreferrer" data-track="opintopolku" data-term="${job}">Opinnot</a>
      <a class="occ-link" href="${jobUrl}" target="_blank" rel="noopener noreferrer" data-track="tyomarkkinatori" data-term="${job}">Työpaikat</a>
    </span>
  </li>`;
}

function buildAspirationMismatchHtml(tyoohjaus = {}, motivation = {}, interests = {}) {
  if (!detectAspirationMismatch(tyoohjaus, motivation, interests)) return '';
  const title = state.plainLanguage
    ? 'Huomio'
    : 'Huomio: toive ja arki voivat vetää eri suuntiin';
  const body = state.plainLanguage
    ? 'Haluat auttaa ihmisiä, mutta vietät vapaa-aikasi useimmiten yksin etkä halua olla näkyvässä roolissa. Näkyvä asiakaspalvelu tai myynti voi tuntua aluksi raskaalta. Kokeile ensin TETiä tai rooleja, joissa on vähemmän jatkuvaa asiakaskontaktia.'
    : 'Haluat auttaa ihmisiä, mutta arvostat rauhallista työrytmiä ja vietät vapaa-aikasi useimmiten yksin. Näkyvä asiakaspalvelu tai myynti voi tuntua aluksi raskaalta. Kokeile ensin TETiä hoiva- tai palvelualalla tai rooleissa, joissa on vähemmän jatkuvaa asiakaskontaktia (esim. taustatyö, valmistelu, laboratorio).';
  return `<div class="aspiration-alert" role="note">
    <p class="aspiration-alert-title">${title}</p>
    <p class="aspiration-alert-body">${body}</p>
    <a class="aspiration-alert-link" href="${tetPaikatUrl()}" target="_blank" rel="noopener noreferrer" data-track="aspiration_tet">Etsi TET-paikka (TET.fi) →</a>
  </div>`;
}

function renderOccupationList(pathId, answers, tyoohjaus = {}, motivation = {}, interests = {}) {
  const jobs = occupationsForPath(pathId, answers, tyoohjaus, motivation, interests);
  if (!jobs.length) {
    return '<p class="occupation-hint">Yksikään ammatti ei täsmännyt kaikkiin valintoihisi — kokeile toista polkua tai tee testi uudelleen myöhemmin.</p>';
  }
  const filterNote = occupationFilterNote(pathId, answers, tyoohjaus, motivation, interests);
  return `<ul class="occupation-list">${jobs.map((j) => renderOccupationItem(j)).join('')}</ul>
  ${filterNote ? `<p class="occupation-filter-note">${filterNote}</p>` : ''}
  <p class="te24-source">Ammattinimet perustuvat <a href="${TE24_SOURCE_URL}" target="_blank" rel="noopener noreferrer">TE24-luokitukseen</a> (Tilastokeskus).</p>`;
}

function bindPathToggles() {
  document.querySelectorAll('.path-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.parentElement.querySelector('.path-occupations');
      if (!panel) return;
      const open = panel.classList.toggle('open');
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const count = btn.dataset.count || '';
      btn.textContent = open ? `Piilota ammatit ▴` : `Näytä ammatit (${count}) ▾`;
    });
  });
}

const ANALYTICS_KEY = 'yoro_ohjaus_events_v1';
const FEEDBACK_KEY = 'yoro_ohjaus_feedback_v1';
const FEEDBACK_DONE_KEY = 'yoro_ohjaus_feedback_done_v1';
const RESULT_STORAGE_KEY = 'yoro_ohjaus_result_v1';
const PLAIN_LANG_KEY = 'yoro_plain_lang_v1';
const RESULT_HASH_PREFIX = '#r=';
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBdY2Xl5q2gW0ZlqjvHwmx2wIo1c3vZKfA',
  authDomain: 'urapolku-7781a.firebaseapp.com',
  projectId: 'urapolku-7781a',
};
/** Sama LxP-projektin Cloud Function kuin analysoi — HTTP, ei callable */
const ADVISOR_API_URL = 'https://europe-west1-urapolku-7780a.cloudfunctions.net/ohjausmoottoriAdvisor';
const FEEDBACK_COLLECTION = 'ohjausmoottori_feedback';

const COPY = {
  trustBanner: {
    fi: 'Tämä ei ole arvosana eikä uraennuste — vain suuntaa kokeiltavaksi.',
    plain: 'Tämä ei ole arvosana. Se on vain ehdotus suunnasta.',
  },
  resultType: { fi: 'Sinun tekijätyyppisi', plain: 'Sinun tyyppisi' },
  strengthsTitle: { fi: 'Vahvuutesi työssä', plain: 'Miten työskentelet' },
  pathsTitle: { fi: '3 polkua kokeiltavaksi', plain: '3 polkua kokeiltavaksi' },
  pathsLead: {
    fi: 'Ei lopullista uraa — valitse yksi ja kokeile käytännössä. Avaa polku nähdäksesi miksi se ehdotettiin.',
    plain: 'Valitse yksi polku ja kokeile sitä käytännössä. Voit avata polun ja lukea miksi se sopii.',
  },
  savedBanner: { fi: 'Sinulla on tallennettu tulos tästä selaimesta.', plain: 'Tuloksesi on tallessa tässä selaimessa.' },
  resumeResult: { fi: 'Palaa tulokseesi →', plain: 'Näytä tulos uudelleen →' },
  copyResultLink: { fi: 'Kopioi linkki', plain: 'Kopioi linkki' },
  shareToggle: { fi: 'Jaa tulos', plain: 'Jaa tulos' },
  shareDownloadCard: { fi: 'Lataa jaettava kortti (PNG)', plain: 'Lataa kortti (PNG)' },
  shareText: { fi: 'Jaa tekstinä', plain: 'Jaa tekstinä' },
  linkCopied: { fi: 'Linkki kopioitu!', plain: 'Kopioitu!' },
  plainToggle: { fi: 'Selkokieli', plain: 'Normaali kieli' },
  defaultHint: {
    fi: 'Valitse yksi — ei oikeita tai vääriä vastauksia.',
    plain: 'Valitse yksi. Kaikki vastaukset käyvät.',
  },
  progressAlmost: { fi: ' · melkein valmis!', plain: ' · melkein valmis!' },
  introTitle1: { fi: 'Et tiedä mitä haluat?', plain: 'Et tiedä vielä mitä haluat?' },
  introTitle2: { fi: 'Hyvä.', plain: 'Se on ok.' },
  introBody: {
    fi: 'Tämä testi ei kerro sinulle ammattia. Se kertoo <strong style="color:var(--text)">miten sinä työskentelet parhaiten</strong> — ja ehdottaa <strong style="color:var(--text)">3 polkua</strong> kokeiltavaksi.',
    plain: 'Testi ei kerro ammattia. Se kertoo <strong style="color:var(--text)">miten työskentelet</strong>. Saat <strong style="color:var(--text)">3 polkua</strong> kokeiltavaksi.',
  },
  introHook: { fi: '✦ Saat oman tekijätyypin + jaettavan kortin', plain: '✦ Saat oman tyypin ja kuvan jaettavaksi' },
  startBtn: { fi: 'Aloita testi →', plain: 'Aloita →' },
  introDisclaimer: { fi: 'Ei rekisteröitymistä. Tulos on ohjausta, ei ennustetta.', plain: 'Ei tarvitse rekisteröityä. Tulos on vain ohjausta.' },
  shareToCounselor: { fi: 'Lähetä ohjaajalle', plain: 'Lähetä ohjaajalle' },
  counselorModalTitle: { fi: 'Lähetä tulos ohjaajalle', plain: 'Lähetä tulos ohjaajalle' },
  counselorEmailLabel: { fi: 'Ohjaajan sähköpostiosoite', plain: 'Ohjaajan sähköposti' },
  counselorEmailHint: { fi: 'Lähetys avaa sähköpostiohjelmasi — viesti lähtee sinun osoitteestasi.', plain: 'Lähetys avaa sähköpostin. Viesti lähtee sinun osoitteestasi.' },
  counselorNameLabel: { fi: 'Sinun nimesi', plain: 'Nimesi' },
  counselorNameHint: { fi: 'Nimi allekirjoitukseen, esim. T. Pasi Laakkonen', plain: 'Nimi allekirjoitukseen' },
  counselorMessageLabel: { fi: 'Lyhyt viesti', plain: 'Lyhyt viesti' },
  counselorMessageDefault: { fi: 'Tässä testini.', plain: 'Tässä testini.' },
  counselorPrivacy: { fi: 'Linkissä on testituloksesi — lähetä vain luotetulle ohjaajalle.', plain: 'Linkissä on tuloksesi. Lähetä vain luotetulle ohjaajalle.' },
  counselorInvalidEmail: { fi: 'Tarkista sähköpostiosoite.', plain: 'Tarkista sähköposti.' },
  counselorNameRequired: { fi: 'Kirjoita nimesi allekirjoitukseen.', plain: 'Kirjoita nimesi.' },
  shareToFriend: { fi: 'Lähetä ystävälle', plain: 'Lähetä ystävälle' },
  friendModalTitle: { fi: 'Lähetä tulos ystävälle', plain: 'Lähetä tulos ystävälle' },
  friendEmailLabel: { fi: 'Ystäväsi sähköpostiosoite', plain: 'Ystävän sähköposti' },
  friendEmailHint: { fi: 'Lähetys avaa sähköpostiohjelmasi — viesti lähtee sinun osoitteestasi.', plain: 'Lähetys avaa sähköpostin. Viesti lähtee sinun osoitteestasi.' },
  friendMessageDefault: { fi: 'Tein tämän testin — kokeile sinäkin!', plain: 'Tein tämän testin. Kokeile sinäkin!' },
  friendPrivacy: { fi: 'Viestissä on linkki tulokseesi ja linkki testiin. Lähetä vain luotetulle ystävälle.', plain: 'Viestissä on linkki tulokseesi ja testiin. Lähetä vain luotetulle ystävälle.' },
  advisorCtaTitle: { fi: 'Yoro Valmentaja', plain: 'Yoro Valmentaja' },
  advisorCtaBody: {
    fi: 'Haluatko jutella tuloksistasi? Tunnen testivastauksesi ja voin auttaa työllistymisessä, koulutuksessa ja seuraavissa askeleissa.',
    plain: 'Haluatko jutella tuloksistasi? Voin auttaa työllistymisessä ja koulutuksessa.',
  },
  advisorCtaBtn: { fi: 'Keskustele valmentajan kanssa →', plain: 'Keskustele valmentajan kanssa →' },
  advisorChatTitle: { fi: 'Yoro Valmentaja', plain: 'Yoro Valmentaja' },
  advisorDisclaimer: {
    fi: 'Yoro Valmentaja on tekoälyavusteinen valmentaja — ei virallinen ohjaus eikä uraennuste. Tärkeissä päätöksissä keskustele aina opettajan tai Ohjaamon kanssa.',
    plain: 'Yoro Valmentaja on tekoälyavusteinen. Keskustele aina opettajan tai Ohjaamon kanssa.',
  },
  advisorChipEmploymentPlan: { fi: 'Työllistymissuunnitelma', plain: 'Työllistymissuunnitelma' },
  advisorPromptEmploymentPlan: {
    fi: 'Haluan henkilökohtaisen työllistymissuunnitelman.',
    plain: 'Haluan henkilökohtaisen työllistymissuunnitelman.',
  },
  advisorChipTraining: { fi: 'Lisäkoulutusvaihtoehdot', plain: 'Lisäkoulutusvaihtoehdot' },
  advisorPromptTraining: {
    fi: 'Kerro minulle lisäkoulutusvaihtoehdoista.',
    plain: 'Kerro minulle lisäkoulutusvaihtoehdoista.',
  },
  advisorChipJobHelp: { fi: 'Auta työllistymään', plain: 'Auta työllistymään' },
  advisorPromptJobHelp: {
    fi: 'Auta minua työllistymään.',
    plain: 'Auta minua työllistymään.',
  },
  advisorPlaceholder: { fi: 'Kirjoita kysymys…', plain: 'Kirjoita kysymys…' },
  advisorSend: { fi: 'Lähetä', plain: 'Lähetä' },
  advisorClose: { fi: 'Sulje chat', plain: 'Sulje' },
  advisorThinking: { fi: 'Kirjoittaa…', plain: 'Kirjoittaa…' },
  advisorError: { fi: 'Viesti ei mennyt läpi. Yritä uudelleen tai ota yhteyttä Ohjaamoon.', plain: 'Viesti ei mennyt läpi. Yritä uudelleen.' },
  advisorOffline: { fi: 'Yoro Valmentaja ei ole vielä käytössä tässä ympäristössä. Voit silti käyttää linkkejä Opintopolkuun ja Ohjaamoon.', plain: 'Yoro Valmentaja ei ole vielä käytössä. Käytä linkkejä Opintopolkuun ja Ohjaamoon.' },
};

function txt(key) {
  const entry = COPY[key];
  if (!entry) return key;
  return state.plainLanguage ? entry.plain : entry.fi;
}

function qText(q) {
  if (state.plainLanguage && q.textPlain) return q.textPlain;
  return q.text;
}

function qHint(q, fallbackKey = 'defaultHint') {
  if (state.plainLanguage && q.hintPlain) return q.hintPlain;
  if (q.hint) return q.hint;
  return txt(fallbackKey);
}

function optLabel(o) {
  if (state.plainLanguage && o.labelPlain) return o.labelPlain;
  return o.label;
}

function renderStrengths(archetype) {
  const items = archetype.strengths || [];
  return `<ul class="strength-list">${items.map((s) => `<li>${s}</li>`).join('')}</ul>`;
}

function serializeResultState() {
  return {
    v: 1,
    l: state.lxp,
    t: state.tyoohjaus,
    m: state.motivation,
    s: [...state.subjects],
    i: state.interest,
    p: state.plainLanguage ? 1 : 0,
  };
}

function currentResultFingerprint() {
  return encodeResultPayload(serializeResultState());
}

function hasFeedbackForCurrentResult() {
  try {
    return localStorage.getItem(FEEDBACK_DONE_KEY) === currentResultFingerprint();
  } catch (_) {
    return false;
  }
}

function markFeedbackForCurrentResult() {
  try {
    localStorage.setItem(FEEDBACK_DONE_KEY, currentResultFingerprint());
  } catch (_) { /* ignore */ }
}

function encodeResultPayload(payload) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function decodeResultPayload(encoded) {
  try {
    const json = decodeURIComponent(escape(atob(encoded.replace(/-/g, '+').replace(/_/g, '/'))));
    const data = JSON.parse(json);
    if (data.v !== 1 || !data.l || !data.i) return null;
    return data;
  } catch (_) {
    return null;
  }
}

function applyResultPayload(data) {
  state.lxp = { ...data.l };
  state.tyoohjaus = { ...data.t };
  state.motivation = data.m
    ? { meaning: [...(data.m.meaning || [])], recognition: data.m.recognition || '' }
    : { meaning: [], recognition: '' };
  state.subjects = new Set(data.s || []);
  state.interest = { ...data.i };
  if (Array.isArray(state.interest.i1)) {
    state.interest.i1 = state.interest.i1.map((k) => (k === 'terveys' ? 'ihmiset' : k));
  }
  state.plainLanguage = !!data.p;
  state.screen = 'result';
  state.lxpIndex = 0;
  state.tyoohjausIndex = 0;
  state.motivationIndex = 0;
  localStorage.setItem(PLAIN_LANG_KEY, state.plainLanguage ? '1' : '0');
  document.body.classList.toggle('plain-language', state.plainLanguage);
  syncPlainToggle();
}

function persistResult() {
  const encoded = encodeResultPayload(serializeResultState());
  localStorage.setItem(RESULT_STORAGE_KEY, encoded);
  history.replaceState(null, '', `${location.pathname}${location.search}${RESULT_HASH_PREFIX}${encoded}`);
}

function resultPageUrl() {
  const encoded = encodeResultPayload(serializeResultState());
  return `${location.origin}${location.pathname}${RESULT_HASH_PREFIX}${encoded}`;
}

function loadSavedResultEncoded() {
  if (location.hash.startsWith(RESULT_HASH_PREFIX)) {
    return location.hash.slice(RESULT_HASH_PREFIX.length);
  }
  try {
    return localStorage.getItem(RESULT_STORAGE_KEY);
  } catch (_) {
    return null;
  }
}

function tryRestoreResultFromUrl() {
  const encoded = location.hash.startsWith(RESULT_HASH_PREFIX)
    ? location.hash.slice(RESULT_HASH_PREFIX.length)
    : null;
  if (!encoded) return false;
  const data = decodeResultPayload(encoded);
  if (!data) return false;
  applyResultPayload(data);
  return true;
}

function loadPreferences() {
  try {
    state.plainLanguage = localStorage.getItem(PLAIN_LANG_KEY) === '1';
  } catch (_) {
    state.plainLanguage = false;
  }
  document.body.classList.toggle('plain-language', state.plainLanguage);
}

function syncPlainToggle() {
  const btn = document.getElementById('plainLangToggle');
  if (!btn) return;
  btn.setAttribute('aria-pressed', state.plainLanguage ? 'true' : 'false');
  btn.textContent = state.plainLanguage ? COPY.plainToggle.plain : COPY.plainToggle.fi;
}

function bindAccessibilityControls() {
  const btn = document.getElementById('plainLangToggle');
  if (!btn) return;
  syncPlainToggle();
  btn.addEventListener('click', () => {
    state.plainLanguage = !state.plainLanguage;
    try {
      localStorage.setItem(PLAIN_LANG_KEY, state.plainLanguage ? '1' : '0');
    } catch (_) { /* ignore */ }
    document.body.classList.toggle('plain-language', state.plainLanguage);
    syncPlainToggle();
    render();
  });
}

function announceProgress(step, total, pct) {
  const el = document.getElementById('liveStatus');
  if (!el) return;
  el.textContent = `Vaihe ${step} / ${total}, ${pct} prosenttia valmis.`;
}

function focusMainHeading() {
  requestAnimationFrame(() => {
    const target = document.querySelector('#app h1, #app h2, #app .result-title');
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

function track(event, data = {}) {
  try {
    const row = { event, data, t: Date.now(), screen: state.screen, step: currentStep() };
    const log = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY) || '[]');
    log.push(row);
    sessionStorage.setItem(ANALYTICS_KEY, JSON.stringify(log.slice(-80)));
  } catch (_) { /* ignore */ }
}

function getDefaultFirebaseApp() {
  try {
    return firebase.app();
  } catch (_) {
    return firebase.initializeApp(FIREBASE_CONFIG);
  }
}

function getFeedbackFirestore() {
  if (typeof firebase === 'undefined') return null;
  try {
    return getDefaultFirebaseApp().firestore();
  } catch (_) {
    return null;
  }
}

function submitFeedbackPayload(payload) {
  const db = getFeedbackFirestore();
  if (!db) return;
  db.collection(FEEDBACK_COLLECTION).add({
    source: 'ohjausmoottori',
    v: 1,
    rating: payload.rating || '',
    archetype: payload.archetype || '',
    path: payload.path || '',
    motivation: payload.motivation || {},
    interest: payload.interest || {},
    events: payload.events || [],
    clientTs: payload.t || Date.now(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  }).catch(() => {});
}

function inferTopics(interests) {
  const topics = new Set();
  (interests.i1 || []).forEach((key) => {
    if (key === 'tekniikka') { topics.add('tech'); topics.add('how'); }
    if (key === 'ihmiset' || key === 'terveys') topics.add('people');
    if (key === 'luonto') topics.add('nature');
    if (key === 'kaytanto') topics.add('how');
    if (key === 'luova') topics.add('creative');
    if (key === 'liiketoiminta' || key === 'liikenne') topics.add('business');
    if (key === 'turvallisuus') topics.add('people');
  });
  state.subjects.forEach((subId) => {
    if (['matematiikka', 'fysiikka', 'kemia', 'kasityo'].includes(subId)) topics.add('tech');
    if (['biologia', 'kotitalous'].includes(subId)) topics.add('people');
    if (['maantieto'].includes(subId)) topics.add('nature');
    if (['kuvataide', 'musiikki', 'aidinkieli'].includes(subId)) topics.add('creative');
    if (['yhteiskunta', 'englanti'].includes(subId)) topics.add('business');
  });
  return [...topics];
}

function tyoohjausStepValid(index) {
  const q = TYOOHJAUS_QUESTIONS[index];
  return !!state.tyoohjaus[q?.id];
}

function motivationStepValid(index) {
  const q = MOTIVATION_Q[index];
  if (!q) return false;
  if (q.id === 'meaning') {
    const m = state.motivation.meaning || [];
    return m.length >= q.min && m.length <= q.max;
  }
  return !!state.motivation.recognition;
}

function interestStepValid() {
  return Array.isArray(state.interest.i1) && state.interest.i1.length >= 2;
}

function exploreStepValid() {
  return !!state.interest.i4;
}

const state = {
  screen: 'intro',
  lxpIndex: 0,
  tyoohjausIndex: 0,
  motivationIndex: 0,
  lxp: {},
  tyoohjaus: {},
  motivation: { meaning: [], recognition: '' },
  subjects: new Set(),
  interest: {},
  plainLanguage: false,
  shareOpen: false,
  advisorChat: { open: false, messages: [], loading: false, error: '' },
};

function totalSteps() {
  return LXP_QUESTIONS.length
    + TYOOHJAUS_QUESTIONS.length
    + MOTIVATION_Q.length
    + 1
    + INTEREST_Q.length
    + 1;
}

function currentStep() {
  if (state.screen === 'lxp') return state.lxpIndex + 1;
  if (state.screen === 'tyoohjaus') return LXP_QUESTIONS.length + state.tyoohjausIndex + 1;
  if (state.screen === 'motivation') {
    return LXP_QUESTIONS.length + TYOOHJAUS_QUESTIONS.length + state.motivationIndex + 1;
  }
  if (state.screen === 'subjects') {
    return LXP_QUESTIONS.length + TYOOHJAUS_QUESTIONS.length + MOTIVATION_Q.length + 1;
  }
  if (state.screen === 'interest') {
    return LXP_QUESTIONS.length + TYOOHJAUS_QUESTIONS.length + MOTIVATION_Q.length + 2;
  }
  if (state.screen === 'explore') return totalSteps();
  return 0;
}

function progressPct() {
  return Math.round((currentStep() / totalSteps()) * 100);
}

function scorePaths(answers, sectors, interests, tyoohjaus = {}, motivation = {}) {
  const sectorSet = new Set(sectors);
  const i1 = interests.i1 || [];
  const i3 = interests.i3?.length ? interests.i3 : inferTopics(interests);
  const workdays = workdaySignals(motivation, tyoohjaus);
  const techWorkday = workdays.some((wd) => ['solve', 'create', 'data'].includes(wd));

  return PATHS.map((path) => {
    let score = 0;
    let reasons = [];

    state.subjects.forEach((subId) => {
      if (path.subjects.includes(subId)) {
        score += 12;
        reasons.push('kouluaine');
      }
    });

    i1.forEach((key) => {
      sectorsFromInterest(key).forEach((sec) => {
        if (path.sectors.includes(sec)) {
          score += 18;
          reasons.push('kiinnostus');
        }
      });
    });

    workdays.forEach((wd) => {
      if (path.workday.includes(wd)) {
        score += 10;
        reasons.push('työpäivä');
      }
    });

    i3.forEach((key) => {
      if (key === 'unsure') return;
      if (path.topics.includes(key)) {
        score += 10;
      }
    });

    Object.entries(path.lxp || {}).forEach(([qKey, vals]) => {
      const ans = answers[qKey];
      if (ans && vals.includes(ans)) {
        score += 8;
      }
    });

    const academicPaths = ['engineer', 'it', 'lab', 'society', 'creative', 'business'];
    const vocationalPaths = ['build', 'health', 'service', 'nature'];

    switch (answers.q7) {
      case 'a':
        if (academicPaths.includes(path.id)) score += 8;
        break;
      case 'b':
        if (vocationalPaths.includes(path.id)) score += 8;
        if (['it', 'engineer', 'lab'].includes(path.id)) score += 4;
        break;
      case 'c':
        score += 4;
        if (academicPaths.includes(path.id)) score += 8;
        break;
      case 'd':
        if (academicPaths.includes(path.id)) score += 12;
        break;
      case 'e':
        score += 3;
        break;
      default:
        break;
    }

    switch (answers.q8) {
      case 'b':
        if (academicPaths.includes(path.id)) score += 10;
        break;
      case 'c':
        if (vocationalPaths.includes(path.id)) score += 8;
        break;
      case 'd':
        score += 5;
        break;
      case 'a':
      case 'e':
        score += 2;
        break;
      default:
        break;
    }

    const precision = tyoohjaus.precision;
    if (precision === 'a') {
      if (['lab', 'engineer', 'it', 'health'].includes(path.id)) score += 14;
      if (path.id === 'business') score -= 20;
      if (path.id === 'service') score -= 10;
    } else if (precision === 'b') {
      if (['lab', 'engineer', 'it', 'business', 'society'].includes(path.id)) score += 5;
    } else if (precision === 'c' || precision === 'd') {
      if (['business', 'creative', 'service', 'society'].includes(path.id)) score += 10;
      if (path.id === 'lab') score -= 18;
      // Tuotekehitys & digi: hajamielisyys ok — painotus luovuuteen ja sinnikkyyteen
      if (path.id === 'engineer' || path.id === 'it') {
        score += 10;
        if (answers.q10 === 'a' || answers.q10 === 'b') score += 12;
        if (i1.includes('tekniikka') || i1.includes('luova')) score += 8;
        if (techWorkday) score += 8;
        i3.forEach((key) => {
          if (key === 'tech' || key === 'creative') score += 6;
        });
      }
    }

    const drive = tyoohjaus.drive;
    if (drive === 'a') {
      if (['creative', 'engineer', 'it'].includes(path.id)) score += 12;
    } else if (drive === 'b') {
      if (['engineer', 'lab', 'build', 'health'].includes(path.id)) score += 12;
    } else if (drive === 'c') {
      if (['engineer', 'it', 'creative'].includes(path.id)) score += 18;
      if (i1.includes('tekniikka') || i1.includes('luova')) score += 8;
      if (techWorkday) score += 8;
    } else if (drive === 'd') {
      if (['engineer', 'lab'].includes(path.id)) score -= 14;
      if (['service', 'build', 'health'].includes(path.id)) score += 8;
    }

    const visibility = tyoohjaus.visibility;
    if (visibility === 'a') {
      if (['service', 'creative', 'business', 'society'].includes(path.id)) score -= 14;
      if (['lab', 'it', 'health'].includes(path.id)) score += 6;
    } else if (visibility === 'c') {
      if (['service', 'creative', 'business', 'society'].includes(path.id)) score += 10;
    }

    const stressLevel = tyoohjaus.stress;
    if (stressLevel === 'a') {
      if (['health', 'service', 'build'].includes(path.id)) score -= 12;
      if (['lab', 'business', 'it'].includes(path.id)) score += 8;
    } else if (stressLevel === 'c') {
      if (['health', 'service', 'society', 'build'].includes(path.id)) score += 10;
    }

    const leisure = tyoohjaus.leisure;
    const highHelp = hasHighHelpInterest(motivation, interests);
    const aspirationMismatch = leisure === 'a' && visibility === 'a' && highHelp;

    if (leisure === 'a' && visibility === 'a') {
      if (['service', 'business'].includes(path.id)) score -= 12;
      if (['lab', 'it'].includes(path.id)) score += 6;
      if (path.id === 'health') score += 2;
    } else if (leisure === 'c' && (highHelp || workdays.includes('connect'))) {
      if (['service', 'health', 'society'].includes(path.id)) score += 8;
    }

    if (aspirationMismatch) {
      if (['service', 'business'].includes(path.id)) score -= 10;
      if (path.id === 'health') score -= 4;
      if (['lab', 'it'].includes(path.id)) score += 8;
    }

    (motivation.meaning || []).forEach((key) => {
      if ((PATH_BY_MEANING[key] || []).includes(path.id)) score += 10;
    });

    if (hasHigherEdBackground(answers)) {
      const vocationalHeavy = ['build', 'service', 'nature'];
      if (vocationalHeavy.includes(path.id)) score -= 6;
      if (['engineer', 'it', 'lab', 'society', 'creative', 'business'].includes(path.id)) score += 4;
    }

  if (sectorSet.size) {
      path.sectors.forEach((s) => {
        if (sectorSet.has(s)) score += 5;
      });
    }

    return { ...path, score, reasons: [...new Set(reasons)] };
  })
    .sort((a, b) => b.score - a.score)
    .filter((p) => p.score > 0);
}

function wantsHigherEd(answers) {
  return hasHigherEdBackground(answers) || answers.q7 === 'c';
}

function studyLineForPath(path, answers) {
  let line = path.study;
  if (!line) return '';
  if (wantsHigherEd(answers) && ['engineer', 'it', 'lab', 'society', 'health', 'creative', 'business'].includes(path.id)) {
    if (!line.toLowerCase().includes('amk') && !line.toLowerCase().includes('yliopisto') && !line.toLowerCase().includes('korkeakoulu')) {
      line += ' · Jatko: AMK tai yliopisto mahdollinen';
    }
  }
  return line;
}

function getSectorWeights() {
  const weights = {};
  state.subjects.forEach((id) => {
    const sub = SUBJECTS.find((s) => s.id === id);
    sub?.sectors.forEach((sec) => {
      weights[sec] = (weights[sec] || 0) + 1;
    });
  });
  return Object.entries(weights).sort((a, b) => b[1] - a[1]).map(([s]) => s);
}

function buildMotivationNarrative(motivation = {}) {
  const lines = [];
  const meaningQ = MOTIVATION_Q.find((q) => q.id === 'meaning');
  const recognitionQ = MOTIVATION_Q.find((q) => q.id === 'recognition');
  (motivation.meaning || []).forEach((key) => {
    if (meaningQ?.narrative?.[key]) lines.push(meaningQ.narrative[key]);
  });
  if (motivation.recognition && recognitionQ?.narrative?.[motivation.recognition]) {
    lines.push(recognitionQ.narrative[motivation.recognition]);
  }
  return lines;
}

function buildNarrative(answers, tyoohjaus = {}) {
  const lines = [];
  LXP_QUESTIONS.forEach((q) => {
    const key = answers[q.id];
    if (key && q.narrative[key]) lines.push(q.narrative[key]);
  });
  TYOOHJAUS_QUESTIONS.forEach((q) => {
    const key = tyoohjaus[q.id];
    if (key && q.narrative[key]) lines.push(q.narrative[key]);
  });
  return lines.slice(0, 4);
}

const SECTOR_WHY = {
  tekniikka: 'Valitsit kiinnostukseksi tekniikan ja digin',
  ihmiset: 'Valitsit kiinnostukseksi ihmiset, opetuksen ja hoidon',
  terveys: 'Valitsit kiinnostukseksi ihmiset, opetuksen ja hoidon',
  luonto: 'Valitsit kiinnostukseksi luonnon ja ympäristön',
  kaytanto: 'Valitsit kiinnostukseksi rakentamisen ja käytännön työn',
  luova: 'Valitsit kiinnostukseksi luovan työn ja median',
  liiketoiminta: 'Valitsit kiinnostukseksi liiketoiminnan ja yrittäjyyden',
  turvallisuus: 'Valitsit kiinnostukseksi turvallisuuden ja yhteiskunnan',
  liikenne: 'Valitsit kiinnostukseksi liikenteen, logistiikan ja palvelut',
};

const WORKDAY_WHY = {
  solve: 'Työpäiväsi unelma: ratkaista ongelmia',
  help: 'Työpäiväsi unelma: auttaa ihmisiä käytännössä',
  build: 'Työpäiväsi unelma: rakentaa tai korjata',
  connect: 'Työpäiväsi unelma: keskustella ja tehdä yhteistyötä',
  organize: 'Työpäiväsi unelma: suunnitella ja järjestää asioita',
  create: 'Työpäiväsi unelma: keksiä ja luoda uutta',
  nature: 'Työpäiväsi unelma: työskennellä luonnon ja ympäristön parissa',
  data: 'Työpäiväsi unelma: työskennellä numeroiden, tiedon tai talouden parissa',
};

const TOPIC_WHY = {
  tech: 'Seuraat vapaaehtoisesti teknologiaa tai pelejä',
  people: 'Kiinnostuksen aiheena ihmiset ja hyvinvointi',
  business: 'Kiinnostuksen aiheena liiketoiminta ja talous',
  nature: 'Kiinnostuksen aiheena luonto ja ilmasto',
  creative: 'Kiinnostuksen aiheena taide, design tai tarinat',
  how: 'Kiinnostuksen aiheena miten asiat toimivat',
};

const LXP_WHY = {
  q1: 'Työtyylisi: itsenäinen tai vastuullinen tekeminen',
  q2: 'Arvostat työympäristöä, joka sopii tälle polulle',
  q5: 'Digitaaliset työkalut sopivat työtyyliisi',
  q10: 'Haluat kehittää osaamistasi — sinnikkyyttä polulle',
};

const MEANING_WHY = {
  help: 'Valitsit merkitykseksi auttaa muita',
  results: 'Valitsit merkitykseksi nähdä tuloksia',
  learn: 'Valitsit merkitykseksi oppimisen',
  solve: 'Valitsit merkitykseksi ongelmien ratkaisemisen',
  create: 'Valitsit merkitykseksi uuden kehittämisen',
  purpose: 'Valitsit merkitykseksi yhteiskunta- ja ympäristötyön',
};

function explainPathWhy(path, answers, interests, tyoohjaus, motivation = {}) {
  const bullets = [];
  const i1 = interests.i1 || [];
  const i3 = interests.i3 || [];
  const workdays = workdaySignals(motivation, tyoohjaus);

  i1.forEach((key) => {
    const matched = sectorsFromInterest(key).some((sec) => path.sectors.includes(sec));
    if (matched && SECTOR_WHY[key]) bullets.push(SECTOR_WHY[key]);
  });

  workdays.forEach((wd) => {
    if (path.workday.includes(wd) && WORKDAY_WHY[wd]) {
      bullets.push(WORKDAY_WHY[wd]);
    }
  });

  (i3 || []).forEach((key) => {
    if (path.topics.includes(key) && TOPIC_WHY[key]) bullets.push(TOPIC_WHY[key]);
  });

  state.subjects.forEach((subId) => {
    if (path.subjects.includes(subId)) {
      const sub = SUBJECTS.find((s) => s.id === subId);
      if (sub) bullets.push(`Pidät kouluaineesta: ${sub.label}`);
    }
  });

  Object.keys(path.lxp || {}).forEach((qKey) => {
    const ans = answers[qKey];
    if (ans && path.lxp[qKey].includes(ans) && LXP_WHY[qKey]) {
      bullets.push(LXP_WHY[qKey]);
    }
  });

  const precision = tyoohjaus.precision;
  if (precision === 'a' && ['lab', 'engineer', 'it', 'health'].includes(path.id)) {
    bullets.push('Olet tarkka tekijä — tämä polku arvostaa huolellisuutta');
  }
  if ((precision === 'c' || precision === 'd') && ['engineer', 'it', 'creative'].includes(path.id)) {
    bullets.push('Suurpiirteinen työtyyli sopii ideointiin ja tuotekehitykseen');
  }

  const drive = tyoohjaus.drive;
  if (drive === 'c' && ['engineer', 'it', 'creative'].includes(path.id)) {
    bullets.push('Luovuus ja sinnikkyys — vahva yhdistelmä tälle polulle');
  }
  if (drive === 'd' && ['service', 'build', 'health'].includes(path.id)) {
    bullets.push('Arvostat selkeää etenemistä — käytännön polku voi sopia');
  }

  const visibility = tyoohjaus.visibility;
  if (visibility === 'a' && ['lab', 'it', 'health'].includes(path.id)) {
    bullets.push('Esiintyminen ei ole vahvuutesi — tämä polku sopii taustarooliin');
  }
  if (visibility === 'c' && ['service', 'creative', 'business', 'society'].includes(path.id)) {
    bullets.push('Sosiaalinen rohkeus sopii näkyviin ja ihmisläheisiin rooleihin');
  }

  const stressLevel = tyoohjaus.stress;
  if (stressLevel === 'a' && ['lab', 'business', 'it'].includes(path.id)) {
    bullets.push('Arvostat rauhallista työrytmiä — tämä polku on ennustettavampi');
  }
  if (stressLevel === 'c' && ['health', 'service', 'society', 'build'].includes(path.id)) {
    bullets.push('Paine ei haittaa — kiireiset ja vaihtelevat työt voivat sopia');
  }

  const leisure = tyoohjaus.leisure;
  if (leisure === 'a' && visibility === 'a' && ['lab', 'it'].includes(path.id)) {
    bullets.push('Vietät vapaa-aikasi useimmiten yksin — tämä polku sopii taustarooliin');
  }
  if (leisure === 'c' && ['service', 'health', 'society'].includes(path.id)) {
    bullets.push('Vietät aikaa muiden kanssa — sosiaalinen rytmi sopii tälle polulle');
  }

  (motivation.meaning || []).forEach((key) => {
    if (MEANING_WHY[key]) bullets.push(MEANING_WHY[key]);
  });

  if (hasHigherEdBackground(answers) && ['engineer', 'it', 'lab', 'society', 'creative', 'business'].includes(path.id)) {
    bullets.push('Korkeakoulutaso huomioitu — ammatit korkeamman tason tehtävistä');
  }

  return [...new Set(bullets)].slice(0, 4);
}

function fitBadge(rank, score, topScore) {
  if (rank === 0 && score >= topScore * 0.82) {
    return { label: 'Vahva osuma', className: 'fit-strong' };
  }
  if (rank <= 1 && score >= topScore * 0.6) {
    return { label: 'Sopii sinulle', className: 'fit-good' };
  }
  return { label: 'Kokeile ensin', className: 'fit-try' };
}

function buildHeroSentence(archetype, tyoohjaus, topPath) {
  const driveLines = {
    a: 'keksit mielellään uusia ratkaisuja',
    b: 'viennät asiat loppuun, vaikka homma on hankala',
    c: 'yhdistät ideoinnin ja sinnikkyyden',
    d: 'arvostat selkeää etenemistä etkä hae turhaan pitkiä grindausprojekteja',
    e: 'työtyylisi on vielä muotoutumassa',
  };
  const drive = tyoohjaus.drive;
  const styleBit = drive && driveLines[drive] ? driveLines[drive] : archetype.tagline.toLowerCase();
  const pathBit = topPath
    ? ` Ensisijainen suunta kokeiltavaksi: ${topPath.name.toLowerCase()}.`
    : '';
  return `Olet ${archetype.title} — ${styleBit}.${pathBit} Tämä ei ole lopullinen ura vaan suunta, jota kannattaa testata käytännössä.`;
}

function primaryCta(interest, topPath, answers) {
  const i4 = interest.i4 || 'explore';
  const terms = topPath ? pathLinkTerms(topPath, answers) : { opinto: 'ammattikoulu', jobs: '', tet: '' };
  const study = topPath ? studyLineForPath(topPath, answers) : '';
  const ctas = {
    tet: {
      label: 'Seuraava askel: Etsi TET-paikka (TET.fi)',
      url: tetPaikatUrl(),
      secondary: { label: 'Tarvitsetko apua? Ohjaamo →', url: ohjaamoUrl() },
      desc: topPath
        ? `${topPath.tet}. Hae paikkoja TET.fi:stä — Ohjaamo auttaa alle 30-vuotiaita.`
        : 'TET.fi kokoaa avoimet harjoittelupaikat. Ohjaamo auttaa hakemisessa.',
    },
    study: {
      label: 'Seuraava askel: Katso koulutukset Opintopolussa',
      url: opintopolkuUrl(terms.opinto),
      secondary: { label: 'Katso myös työpaikkoja →', url: tyomarkkinatoriUrl(terms.jobs) },
      desc: study
        ? `Hae Opintopolusta: “${terms.opinto}”. ${study}`
        : `Hae Opintopolusta koulutuksia hakusanalla “${terms.opinto}”.`,
    },
    mentor: {
      label: 'Seuraava askel: Varaa aika Ohjaamoon',
      url: ohjaamoUrl(),
      secondary: topPath
        ? { label: 'Tutustu opintoihin polulle →', url: opintopolkuUrl(terms.opinto) }
        : null,
      desc: 'Ohjaamossa voit kuulla, millaista työ on oikeassa elämässä — ilman että päätät vielä ammattia.',
    },
    explore: {
      label: 'Seuraava askel: Tutki opintoja Opintopolussa',
      url: topPath ? opintopolkuUrl(terms.opinto) : 'https://opintopolku.fi/konfo/fi/ohjaava-haku',
      secondary: topPath
        ? { label: 'Katso työpaikkoja →', url: tyomarkkinatoriUrl(terms.jobs) }
        : { label: 'En tiedä mitä opiskella →', url: 'https://opintopolku.fi/konfo/fi/ohjaava-haku' },
      desc: topPath
        ? `Pidä ${topPath.name.toLowerCase()} mielessä. Aloita Opintopolusta: “${terms.opinto}”.`
        : 'Opintopolun ohjaava haku auttaa, jos et vielä tiedä mitä haluat opiskella.',
    },
  };
  return ctas[i4] || ctas.explore;
}

function renderPathCard(p, i, answers, interests, tyoohjaus, motivation, topScore) {
  const study = studyLineForPath(p, answers);
  const occCount = occupationCountForPath(p.id, answers, tyoohjaus, motivation, interests);
  const occHint = occupationHintFor(answers);
  const fit = fitBadge(i, p.score, topScore);
  const why = explainPathWhy(p, answers, interests, tyoohjaus, motivation);
  const terms = pathLinkTerms(p, answers);

  return `
    <div class="path-card">
      <span class="path-emoji">${p.emoji}</span>
      <div class="path-card-body">
        <h3>${i + 1}. ${p.name}</h3>
        <span class="fit-badge ${fit.className}">${fit.label}</span>
        <p>${p.desc}</p>
        ${study ? `<p class="path-study">📚 ${study}</p>` : ''}
        <div class="path-actions">
          <a class="path-action" href="${opintopolkuUrl(terms.opinto)}" target="_blank" rel="noopener noreferrer" data-track="path_opinto" data-path="${p.id}">Opinnot Opintopolussa →</a>
          <a class="path-action" href="${tyomarkkinatoriUrl(terms.jobs)}" target="_blank" rel="noopener noreferrer" data-track="path_jobs" data-path="${p.id}">Työpaikat Työmarkkinatorilla →</a>
        </div>
        ${why.length ? `
        <button type="button" class="path-why-toggle" aria-expanded="false">Miksi tämä polku? ▾</button>
        <div class="path-why" hidden>
          <ul class="why-list">${why.map((w) => `<li>${w}</li>`).join('')}</ul>
        </div>` : ''}
        ${occCount ? `
        <button type="button" class="path-toggle" data-count="${occCount}" aria-expanded="false">
          Näytä ammatit (${occCount}) ▾
        </button>
        <div class="path-occupations" hidden>
          <p class="occupation-hint">${occHint}</p>
          ${renderOccupationList(p.id, answers, tyoohjaus, motivation, interests)}
        </div>` : ''}
      </div>
    </div>`;
}

function bindPathWhyToggles() {
  document.querySelectorAll('.path-why-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.parentElement.querySelector('.path-why');
      if (!panel) return;
      const open = panel.classList.toggle('open');
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Piilota selitys ▴' : 'Miksi tämä polku? ▾';
    });
  });
}

function bindShowMorePaths(extraCount) {
  const btn = document.getElementById('showMorePathsBtn');
  const extra = document.getElementById('extraPaths');
  if (!btn || !extra) return;
  btn.addEventListener('click', () => {
    const open = extra.classList.toggle('open');
    extra.hidden = !open;
    btn.textContent = open ? 'Piilota lisäpolkut ▴' : `Näytä ${extraCount} muuta polkua ▾`;
  });
}

function nextStepLabel() {
  const map = {
    tet: 'Seuraavaksi: kokeile työtä käytännössä',
    study: 'Seuraavaksi: tutustu opintoihin',
    mentor: 'Seuraavaksi: kuule ammattilaiselta',
    explore: 'Seuraavaksi: tutki useita polkuja',
  };
  return map[state.interest.i4] || map.explore;
}

function shareText(archetype, paths) {
  const top = paths[0]?.name || 'uusia polkuja';
  const url = state.screen === 'result' ? resultPageUrl() : 'https://yoro.fi/ohjausmoottori/';
  return `Työtyylini on ${archetype.title} ${archetype.emoji}\n\nYoron ohjausmoottori ehdotti mulle polkua: ${top}\n\nEi yhtä oikeaa ammattia — kokeile noin 10–12 min:\n${url}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function shareSignature(senderName) {
  const n = senderName.trim();
  return n.startsWith('T.') ? n : `T. ${n}`;
}

function testStartUrl() {
  return `${location.origin}${location.pathname}${location.search || ''}`;
}

function buildCounselorEmailBody(archetype, paths, senderName, message) {
  const url = resultPageUrl();
  const pathLines = paths.slice(0, 3).map((p, i) => `${i + 1}. ${p.name}`).join('\n');
  const intro = (message || txt('counselorMessageDefault')).trim();
  return `${intro}

${shareSignature(senderName)}

---
Tekijätyyppi: ${archetype.title} ${archetype.emoji}
Polkuja kokeiltavaksi:
${pathLines}

Tuloslinkki (sisältää testivastaukset):
${url}

Tämä on suuntaa antava ohjaustulos, ei ammattivalinta eikä arvosana.
Yoro Ohjausmoottori — yoro.fi/ohjausmoottori`;
}

function buildFriendEmailBody(archetype, paths, senderName, message) {
  const resultUrl = resultPageUrl();
  const testUrl = testStartUrl();
  const pathLines = paths.slice(0, 3).map((p, i) => `${i + 1}. ${p.name}`).join('\n');
  const intro = (message || txt('friendMessageDefault')).trim();
  return `${intro}

${shareSignature(senderName)}

---
Minun tekijätyyppi: ${archetype.title} ${archetype.emoji}
Polkuja kokeiltavaksi:
${pathLines}

Katso minun tulokseni:
${resultUrl}

Kokeile testiä itse (noin 10–12 min, ilmainen):
${testUrl}

Tämä on suuntaa antava ohjaustulos, ei ammattivalinta eikä arvosana.
Yoro Ohjausmoottori`;
}

function buildCounselorMailto(counselorEmail, archetype, paths, senderName, message) {
  const subject = `Ohjausmoottorin tulos — ${senderName.trim()}`;
  const body = buildCounselorEmailBody(archetype, paths, senderName, message);
  return `mailto:${encodeURIComponent(counselorEmail.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildFriendMailto(friendEmail, archetype, paths, senderName, message) {
  const subject = state.plainLanguage
    ? `Kokeile tätä testiä — ${senderName.trim()}`
    : `Katso testitulokseni ja kokeile itse — ${senderName.trim()}`;
  const body = buildFriendEmailBody(archetype, paths, senderName, message);
  return `mailto:${encodeURIComponent(friendEmail.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function bindShareEmailWizard({
  modalId,
  buttonId,
  titleId,
  copy,
  buildMailto,
  trackEvent,
  trackData = {},
}) {
  const existing = document.getElementById(modalId);
  if (existing) existing.remove();

  const wizard = { step: 1, recipientEmail: '' };

  const modal = document.createElement('div');
  modal.id = modalId;
  modal.className = 'share-modal';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', titleId);

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    document.getElementById(buttonId)?.focus();
  }

  function renderStep() {
    const panel = modal.querySelector('.share-modal-panel');
    if (!panel) return;

    if (wizard.step === 1) {
      panel.innerHTML = `
        <button type="button" class="share-modal-close" aria-label="Sulje">×</button>
        <h2 id="${titleId}" class="share-modal-title">${copy.title}</h2>
        <p class="share-modal-lead">${copy.emailHint}</p>
        <label class="share-field">
          <span class="share-field-label">${copy.emailLabel}</span>
          <input type="email" id="shareEmailInput" class="share-input" autocomplete="email" inputmode="email" value="${wizard.recipientEmail}" placeholder="${copy.emailPlaceholder || 'sahko@posti.fi'}" />
        </label>
        <p class="share-field-error" id="shareEmailError" hidden>${copy.invalidEmail}</p>
        <div class="share-modal-actions">
          <button type="button" class="btn btn-ghost" id="shareCancelBtn">Peruuta</button>
          <button type="button" class="btn btn-primary" id="shareNextBtn">Seuraava →</button>
        </div>`;

      const input = panel.querySelector('#shareEmailInput');
      input?.focus();
      panel.querySelector('#shareCancelBtn')?.addEventListener('click', closeModal);
      panel.querySelector('.share-modal-close')?.addEventListener('click', closeModal);
      panel.querySelector('#shareNextBtn')?.addEventListener('click', () => {
        const email = input?.value || '';
        if (!isValidEmail(email)) {
          const err = panel.querySelector('#shareEmailError');
          if (err) err.hidden = false;
          input?.focus();
          return;
        }
        wizard.recipientEmail = email.trim();
        wizard.step = 2;
        renderStep();
      });
      input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') panel.querySelector('#shareNextBtn')?.click();
      });
      return;
    }

    panel.innerHTML = `
      <button type="button" class="share-modal-close" aria-label="Sulje">×</button>
      <h2 id="${titleId}" class="share-modal-title">${copy.title}</h2>
      <p class="share-modal-lead">${copy.nameHint}</p>
      <label class="share-field">
        <span class="share-field-label">${copy.nameLabel}</span>
        <input type="text" id="shareNameInput" class="share-input" autocomplete="name" placeholder="${copy.namePlaceholder || 'Pasi Laakkonen'}" />
      </label>
      <p class="share-field-error" id="shareNameError" hidden>${copy.nameRequired}</p>
      <label class="share-field">
        <span class="share-field-label">${copy.messageLabel}</span>
        <textarea id="shareMessageInput" class="share-textarea" rows="3">${copy.messageDefault}</textarea>
      </label>
      <p class="share-modal-privacy">${copy.privacy}</p>
      <div class="share-modal-actions">
        <button type="button" class="btn btn-ghost" id="shareBackBtn">← Takaisin</button>
        <button type="button" class="btn btn-primary" id="shareSendBtn">${copy.sendLabel}</button>
      </div>`;

    const nameInput = panel.querySelector('#shareNameInput');
    nameInput?.focus();
    panel.querySelector('.share-modal-close')?.addEventListener('click', closeModal);
    panel.querySelector('#shareBackBtn')?.addEventListener('click', () => {
      wizard.step = 1;
      renderStep();
    });
    panel.querySelector('#shareSendBtn')?.addEventListener('click', () => {
      const name = nameInput?.value?.trim() || '';
      if (!name) {
        const err = panel.querySelector('#shareNameError');
        if (err) err.hidden = false;
        nameInput?.focus();
        return;
      }
      const message = panel.querySelector('#shareMessageInput')?.value || '';
      const mailto = buildMailto(wizard.recipientEmail, name, message);
      track(trackEvent, trackData);
      window.location.href = mailto;
      closeModal();
    });
  }

  modal.innerHTML = '<div class="share-modal-backdrop" data-close="1"></div><div class="share-modal-panel"></div>';
  document.body.appendChild(modal);

  modal.querySelector('.share-modal-backdrop')?.addEventListener('click', closeModal);
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const openBtn = document.getElementById(buttonId);
  if (!openBtn) return;
  openBtn.addEventListener('click', () => {
    wizard.step = 1;
    wizard.recipientEmail = '';
    modal.hidden = false;
    document.body.classList.add('modal-open');
    renderStep();
  });
}

function bindShareToCounselor(archetype, topPaths) {
  bindShareEmailWizard({
    modalId: 'shareCounselorModal',
    buttonId: 'shareToCounselorBtn',
    titleId: 'shareCounselorTitle',
    copy: {
      title: txt('counselorModalTitle'),
      emailHint: txt('counselorEmailHint'),
      emailLabel: txt('counselorEmailLabel'),
      emailPlaceholder: 'ohjaaja@koulu.fi',
      nameHint: txt('counselorNameHint'),
      nameLabel: txt('counselorNameLabel'),
      namePlaceholder: 'Pasi Laakkonen',
      messageLabel: txt('counselorMessageLabel'),
      messageDefault: txt('counselorMessageDefault'),
      privacy: txt('counselorPrivacy'),
      invalidEmail: txt('counselorInvalidEmail'),
      nameRequired: txt('counselorNameRequired'),
      sendLabel: 'Lähetä sähköpostilla',
    },
    buildMailto: (email, name, message) => buildCounselorMailto(email, archetype, topPaths, name, message),
    trackEvent: 'share_to_counselor',
    trackData: { archetype: archetype.id },
  });
}

function bindShareToFriend(archetype, topPaths) {
  bindShareEmailWizard({
    modalId: 'shareFriendModal',
    buttonId: 'shareToFriendBtn',
    titleId: 'shareFriendTitle',
    copy: {
      title: txt('friendModalTitle'),
      emailHint: txt('friendEmailHint'),
      emailLabel: txt('friendEmailLabel'),
      emailPlaceholder: 'ystava@posti.fi',
      nameHint: txt('counselorNameHint'),
      nameLabel: txt('counselorNameLabel'),
      namePlaceholder: 'Pasi Laakkonen',
      messageLabel: txt('counselorMessageLabel'),
      messageDefault: txt('friendMessageDefault'),
      privacy: txt('friendPrivacy'),
      invalidEmail: txt('counselorInvalidEmail'),
      nameRequired: txt('counselorNameRequired'),
      sendLabel: 'Lähetä sähköpostilla',
    },
    buildMailto: (email, name, message) => buildFriendMailto(email, archetype, topPaths, name, message),
    trackEvent: 'share_to_friend',
    trackData: { archetype: archetype.id },
  });
}

function answerLabelForQuestion(questionList, qId, key) {
  if (!key) return '';
  const q = questionList.find((item) => item.id === qId);
  const o = q?.options?.find((opt) => opt.key === key);
  if (!o) return key;
  return state.plainLanguage && o.labelPlain ? o.labelPlain : o.label;
}

function buildAdvisorContext(archetype, topPaths, answers, tyoohjaus, motivation, interests) {
  const meaningQ = MOTIVATION_Q.find((q) => q.id === 'meaning');
  const meaningLabels = (motivation.meaning || []).map((key) => {
    const o = meaningQ?.options?.find((opt) => opt.key === key);
    return o ? optLabel(o) : key;
  });
  const recognitionQ = MOTIVATION_Q.find((q) => q.id === 'recognition');
  const recognitionOpt = recognitionQ?.options?.find((o) => o.key === motivation.recognition);

  const interestLabels = (interests.i1 || []).map((key) => {
    const q = INTEREST_Q[0];
    const o = q?.options?.find((opt) => opt.key === key);
    return o ? optLabel(o) : key;
  });

  const exploreOpt = EXPLORE_Q.options.find((o) => o.key === interests.i4);
  const subjectLabels = [...state.subjects].map((id) => SUBJECTS.find((s) => s.id === id)?.label).filter(Boolean);

  const tyoohjausSummary = {};
  TYOOHJAUS_QUESTIONS.forEach((q) => {
    const key = tyoohjaus[q.id];
    if (key) tyoohjausSummary[q.id] = answerLabelForQuestion(TYOOHJAUS_QUESTIONS, q.id, key);
  });

  const lxpSummary = {};
  ['q1', 'q2', 'q4', 'q7'].forEach((qId) => {
    if (answers[qId]) lxpSummary[qId] = answerLabelForQuestion(LXP_QUESTIONS, qId, answers[qId]);
  });

  return {
    plainLanguage: state.plainLanguage,
    archetype: {
      id: archetype.id,
      title: archetype.title,
      tagline: archetype.tagline,
    },
    topPaths: topPaths.slice(0, 3).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.desc,
      study: studyLineForPath(p, answers),
    })),
    motivation: {
      meaning: meaningLabels,
      recognition: recognitionOpt ? optLabel(recognitionOpt) : '',
    },
    interests: {
      sectors: interestLabels,
      nextStep: exploreOpt ? optLabel(exploreOpt) : '',
    },
    favoriteSubjects: subjectLabels,
    workStyle: tyoohjausSummary,
    lxpHighlights: lxpSummary,
    aspirationMismatch: detectAspirationMismatch(tyoohjaus, motivation, interests),
    disclaimer: 'Suuntaa antava ohjaustulos, ei uraennuste',
  };
}

function advisorWelcomeMessage(archetype, topPaths) {
  const paths = topPaths.slice(0, 3).map((p) => p.name).join(', ');
  if (state.plainLanguage) {
    return `Hei! Olen Yoro Valmentaja. Tyyppisi on ${archetype.title}. Polkusi: ${paths}. Voinko auttaa työllistymissuunnitelmassa, koulutuksessa tai työnhaussa?`;
  }
  return `Hei! Olen Yoro Valmentaja — tunnen testituloksesi. Tekijätyyppisi on ${archetype.title} ${archetype.emoji}, ja ehdotetut polut ovat: ${paths}. Voinko auttaa henkilökohtaisessa työllistymissuunnitelmassa, lisäkoulutusvaihtoehdoissa tai työllistymisessä?`;
}

function renderAdvisorChips() {
  const chips = [
    { label: txt('advisorChipEmploymentPlan'), prompt: txt('advisorPromptEmploymentPlan') },
    { label: txt('advisorChipTraining'), prompt: txt('advisorPromptTraining') },
    { label: txt('advisorChipJobHelp'), prompt: txt('advisorPromptJobHelp') },
  ];
  return chips.map((chip) => {
    const safePrompt = chip.prompt.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return `<button type="button" class="advisor-chip" data-prompt="${safePrompt}">${chip.label}</button>`;
  }).join('');
}

async function callAdvisorApi(messages, context) {
  const res = await fetch(ADVISOR_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, context }),
  });
  let data = {};
  try {
    data = await res.json();
  } catch (_) {
    /* ignore */
  }
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  if (!data.reply) {
    throw new Error('empty');
  }
  return data.reply;
}

function renderAdvisorMessages(messages) {
  return messages.map((m) => {
    const roleClass = m.role === 'user' ? 'advisor-msg-user' : 'advisor-msg-bot';
    const safe = m.content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    return `<div class="advisor-msg ${roleClass}"><div class="advisor-msg-bubble">${safe}</div></div>`;
  }).join('');
}

function renderAdvisorChatHtml(archetype, topPaths) {
  const chat = state.advisorChat;
  if (!chat.open) {
    return `
      <div class="advisor-cta card">
        <div class="advisor-cta-icon" aria-hidden="true">🎯</div>
        <div class="advisor-cta-body">
          <h3 class="advisor-cta-title">${txt('advisorCtaTitle')}</h3>
          <p class="advisor-cta-text">${txt('advisorCtaBody')}</p>
          <button type="button" class="btn btn-primary" id="openAdvisorBtn">${txt('advisorCtaBtn')}</button>
        </div>
      </div>`;
  }

  const messages = chat.messages.length
    ? chat.messages
    : [{ role: 'assistant', content: advisorWelcomeMessage(archetype, topPaths) }];

  return `
    <div class="advisor-chat card" id="advisorChatPanel">
      <div class="advisor-chat-header">
        <h3 class="advisor-chat-title">🎯 ${txt('advisorChatTitle')}</h3>
        <button type="button" class="advisor-chat-close" id="closeAdvisorBtn" aria-label="${txt('advisorClose')}">×</button>
      </div>
      <p class="advisor-chat-disclaimer">${txt('advisorDisclaimer')}</p>
      <div class="advisor-suggestions" id="advisorSuggestions">
        ${renderAdvisorChips()}
      </div>
      <div class="advisor-messages" id="advisorMessages" role="log" aria-live="polite" aria-relevant="additions">
        ${renderAdvisorMessages(messages)}
        ${chat.loading ? `<div class="advisor-msg advisor-msg-bot"><div class="advisor-msg-bubble advisor-thinking">${txt('advisorThinking')}</div></div>` : ''}
      </div>
      ${chat.error ? `<p class="advisor-error" role="alert">${chat.error}</p>` : ''}
      <form class="advisor-form" id="advisorForm">
        <label class="sr-only" for="advisorInput">${txt('advisorPlaceholder')}</label>
        <textarea id="advisorInput" class="advisor-input" rows="2" maxlength="600" placeholder="${txt('advisorPlaceholder')}" ${chat.loading ? 'disabled' : ''}></textarea>
        <button type="submit" class="btn btn-primary advisor-send" ${chat.loading ? 'disabled' : ''}>${txt('advisorSend')}</button>
      </form>
    </div>`;
}

function bindAdvisorChat(archetype, topPaths, answers, tyoohjaus, motivation, interests) {
  const openBtn = document.getElementById('openAdvisorBtn');
  if (openBtn) {
    openBtn.onclick = () => {
      state.advisorChat.open = true;
      if (!state.advisorChat.messages.length) {
        state.advisorChat.messages = [{ role: 'assistant', content: advisorWelcomeMessage(archetype, topPaths) }];
      }
      track('advisor_open', { archetype: archetype.id });
      render();
    };
    return;
  }

  const closeBtn = document.getElementById('closeAdvisorBtn');
  closeBtn?.addEventListener('click', () => {
    state.advisorChat.open = false;
    render();
  });

  const context = buildAdvisorContext(archetype, topPaths, answers, tyoohjaus, motivation, interests);

  async function sendUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || state.advisorChat.loading) return;

    const messages = [...state.advisorChat.messages, { role: 'user', content: trimmed }];
    state.advisorChat.messages = messages;
    state.advisorChat.loading = true;
    state.advisorChat.error = '';
    render();

    try {
      const reply = await callAdvisorApi(messages, context);
      state.advisorChat.messages = [...messages, { role: 'assistant', content: reply }];
      track('advisor_message', { archetype: archetype.id, len: trimmed.length });
    } catch (err) {
      state.advisorChat.error = txt('advisorError');
      console.warn('advisor chat failed', err?.message || err);
    } finally {
      state.advisorChat.loading = false;
      render();
      document.getElementById('advisorInput')?.focus();
    }
  }

  document.getElementById('advisorForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('advisorInput');
    const text = input?.value || '';
    if (input) input.value = '';
    sendUserMessage(text);
  });

  document.querySelectorAll('.advisor-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      sendUserMessage(chip.dataset.prompt || chip.textContent || '');
    });
  });

  const msgBox = document.getElementById('advisorMessages');
  if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
}

function drawGlowCurve(ctx, x1, y1, cx, cy, x2, y2, color, width = 3.5) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cx, cy, x2, y2);
  ctx.stroke();
  ctx.restore();
}

function drawPathNode(ctx, x, y, color, glyph) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 22;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(11, 15, 26, 0.92)';
  ctx.beginPath();
  ctx.arc(x, y, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#f8fafc';
  ctx.font = '28px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(glyph, x, y + 1);
  ctx.restore();
}

function drawBranchingPathsArt(ctx, originX, originY) {
  const nodes = [
    { x: originX - 130, y: originY - 210, cx: originX - 95, cy: originY - 120, color: '#22d3ee', glyph: '💼' },
    { x: originX, y: originY - 250, cx: originX, cy: originY - 140, color: '#a78bfa', glyph: '🧭' },
    { x: originX + 130, y: originY - 210, cx: originX + 95, cy: originY - 120, color: '#c084fc', glyph: '🚩' },
  ];

  nodes.forEach((node) => drawGlowCurve(ctx, originX, originY, node.cx, node.cy, node.x, node.y, node.color));
  nodes.forEach((node) => drawPathNode(ctx, node.x, node.y, node.color, node.glyph));

  ctx.save();
  ctx.fillStyle = '#22d3ee';
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(originX, originY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawYoroMark(ctx, x, y) {
  ctx.save();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 34px Inter, system-ui, sans-serif';
  ctx.fillText('Yor', x, y);
  const oX = x + ctx.measureText('Yor').width;
  const grad = ctx.createLinearGradient(oX, y - 28, oX + 24, y);
  grad.addColorStop(0, '#22d3ee');
  grad.addColorStop(1, '#a78bfa');
  const cx = oX + 12;
  const cy = y - 14;
  const r = 12.5;
  ctx.strokeStyle = grad;
  ctx.lineWidth = 5.5;
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(34, 211, 238, 0.45)';
  ctx.shadowBlur = 6;
  ctx.translate(cx, cy);
  ctx.rotate(0.84);
  ctx.beginPath();
  ctx.setLineDash([68, 15]);
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.shadowBlur = 0;
  ctx.restore();
  ctx.save();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 11px Inter, system-ui, sans-serif';
  ctx.fillText('OHJAUSMOOTTORI', x, y + 22);
  ctx.restore();
}

function drawShareCard(archetype, topPath) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#0b0f1a';
  ctx.fillRect(0, 0, 1200, 630);

  [
    { x: 880, y: 140, r: 360, c: 'rgba(34, 211, 238, 0.16)' },
    { x: 1020, y: 280, r: 300, c: 'rgba(167, 139, 250, 0.14)' },
  ].forEach((g) => {
    const glow = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
    glow.addColorStop(0, g.c);
    glow.addColorStop(1, 'rgba(11, 15, 26, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1200, 630);
  });

  drawBranchingPathsArt(ctx, 900, 500);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 52px Inter, system-ui, sans-serif';
  ctx.fillText('Millainen tekijä olet?', 72, 108);

  ctx.font = '64px Inter, system-ui, sans-serif';
  ctx.fillText(`${archetype.emoji}  ${archetype.title}`, 72, 210);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '28px Inter, system-ui, sans-serif';
  const pathLine = topPath ? `Polku: ${topPath.name}` : '3 polkua kokeiltavaksi';
  ctx.fillText(pathLine, 72, 278);

  ctx.font = '36px Inter, system-ui, sans-serif';
  ctx.fillText('🎯', 72, 338);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '26px Inter, system-ui, sans-serif';
  ctx.fillText('kokeiltavaksi', 118, 338);

  ctx.fillStyle = '#64748b';
  ctx.font = '22px Inter, system-ui, sans-serif';
  ctx.fillText('Noin 10–12 min · ilmainen · ei uraennustetta', 72, 392);

  ctx.fillStyle = '#22d3ee';
  ctx.font = '600 24px Inter, system-ui, sans-serif';
  ctx.fillText('yoro.fi/ohjausmoottori', 72, 560);

  drawYoroMark(ctx, 980, 580);

  return canvas;
}

function downloadShareCard(archetype, topPath) {
  const canvas = drawShareCard(archetype, topPath);
  if (!canvas) return;
  const a = document.createElement('a');
  a.download = 'yoro-tyotyyli.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
  track('share_card_download', { archetype: archetype.id, path: topPath?.id });
}

function bindFeedback(archetype, topPath) {
  const card = document.getElementById('feedbackCard');
  if (!card) return;
  const thanks = document.getElementById('feedbackThanks');
  card.querySelectorAll('[data-feedback]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rating = btn.dataset.feedback;
      const events = JSON.parse(sessionStorage.getItem(ANALYTICS_KEY) || '[]').slice(-20);
      const entry = {
        rating,
        archetype: archetype.id,
        path: topPath?.id,
        motivation: { ...state.motivation },
        interest: {
          i1: state.interest.i1,
          i4: state.interest.i4,
        },
        t: Date.now(),
        events,
      };
      try {
        const all = JSON.parse(sessionStorage.getItem(FEEDBACK_KEY) || '[]');
        all.push(entry);
        sessionStorage.setItem(FEEDBACK_KEY, JSON.stringify(all.slice(-50)));
      } catch (_) { /* ignore */ }
      submitFeedbackPayload(entry);
      markFeedbackForCurrentResult();
      track('feedback', { rating });
      card.querySelectorAll('[data-feedback]').forEach((b) => { b.disabled = true; });
      if (thanks) thanks.hidden = false;
    });
  });
}

function bindCtaTracking() {
  document.querySelectorAll('.cta-primary').forEach((a) => {
    a.addEventListener('click', () => {
      track('cta_click', { href: a.getAttribute('href'), type: 'primary' });
    });
  });
  document.querySelectorAll('.cta-secondary').forEach((a) => {
    a.addEventListener('click', () => {
      track('cta_click', { href: a.getAttribute('href'), type: 'secondary' });
    });
  });
  document.querySelectorAll('[data-track]').forEach((a) => {
    a.addEventListener('click', () => {
      track('external_link', {
        service: a.dataset.track,
        term: a.dataset.term || null,
        path: a.dataset.path || null,
        href: a.getAttribute('href'),
      });
    });
  });
}

function spawnConfetti() {
  const el = document.getElementById('confetti');
  if (!el) return;
  el.innerHTML = '';
  const colors = ['#22d3ee', '#a78bfa', '#34d399', '#fb7185', '#fbbf24'];
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = '-10px';
    s.style.background = colors[i % colors.length];
    s.style.animationDelay = Math.random() * 0.8 + 's';
    s.style.animationDuration = 1.5 + Math.random() * 1.5 + 's';
    el.appendChild(s);
  }
  setTimeout(() => { el.innerHTML = ''; }, 3500);
}

function render() {
  const app = document.getElementById('app');
  const step = currentStep();
  const pct = progressPct();

  if (state.screen === 'intro') {
    const savedEncoded = loadSavedResultEncoded();
    const savedBanner = savedEncoded && decodeResultPayload(savedEncoded) ? `
      <div class="saved-result-banner" id="savedResultBanner">
        <p>${txt('savedBanner')}</p>
        <button type="button" class="btn btn-ghost" id="resumeResultBtn">${txt('resumeResult')}</button>
      </div>` : '';

    app.innerHTML = `
      <section class="hero">
        ${savedBanner}
        <div class="pill">Ilmainen · n. 10–12 min</div>
        <img src="/yoro-paths.svg" class="hero-art yoro-paths-art" width="480" height="310" alt="" aria-hidden="true"/>
        <h1 style="margin-top:0">${txt('introTitle1')}<br><span>${txt('introTitle2')}</span></h1>
        <p>${txt('introBody')}</p>
        <p class="hook">${txt('introHook')}</p>
        <div class="stats-row">
          <div class="stat"><strong>10</strong><span>LxP-kysymystä</span></div>
          <div class="stat"><strong>4</strong><span>työohjauskysymystä</span></div>
          <div class="stat"><strong>2</strong><span>motivaatiota</span></div>
          <div class="stat"><strong>2</strong><span>kiinnostusta</span></div>
        </div>
        <button class="btn btn-primary" id="startBtn">${txt('startBtn')}</button>
        <p class="disclaimer" style="margin-top:20px">${txt('introDisclaimer')}</p>
      </section>`;
    const resumeBtn = document.getElementById('resumeResultBtn');
    if (resumeBtn) {
      resumeBtn.onclick = () => {
        const data = decodeResultPayload(savedEncoded);
        if (!data) return;
        applyResultPayload(data);
        persistResult();
        spawnConfetti();
        render();
      };
    }
    document.getElementById('startBtn').onclick = () => {
      track('start');
      history.replaceState(null, '', `${location.pathname}${location.search}`);
      state.screen = 'lxp';
      render();
    };
    focusMainHeading();
    return;
  }

  const progressHtml =
    state.screen !== 'result'
      ? `<div class="progress-wrap">
          <div class="progress-label"><span>Vaihe ${step}/${totalSteps()}${pct >= 85 ? txt('progressAlmost') : ''}</span><strong>${pct}%</strong></div>
          <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Testin eteneminen">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
        </div>`
      : '';

  if (state.screen === 'lxp') {
    const q = LXP_QUESTIONS[state.lxpIndex];
    const headingId = `q-${q.id}`;
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">${state.lxpIndex + 1}/${LXP_QUESTIONS.length} · ${q.phase}</div>
        <h2 id="${headingId}">${qText(q)}</h2>
        <p class="hint">${qHint(q)}</p>
        <div class="options" id="opts" role="radiogroup" aria-labelledby="${headingId}">
          ${q.options.map((o) => {
            const selected = state.lxp[q.id] === o.key;
            return `<button type="button" class="opt${selected ? ' selected' : ''}" data-key="${o.key}" role="radio" aria-checked="${selected ? 'true' : 'false'}">${optLabel(o)}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="nav-row">
        ${state.lxpIndex > 0 ? '<button class="btn btn-ghost" id="backBtn">← Takaisin</button>' : '<span></span>'}
        <button class="btn btn-primary" id="nextBtn" ${state.lxp[q.id] ? '' : 'disabled style="opacity:0.5"'}>Seuraava →</button>
      </div>`;

    document.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        state.lxp[q.id] = btn.dataset.key;
        render();
      };
    });
    const back = document.getElementById('backBtn');
    if (back) back.onclick = () => { state.lxpIndex--; render(); };
    document.getElementById('nextBtn').onclick = () => {
      if (!state.lxp[q.id]) return;
      if (state.lxpIndex < LXP_QUESTIONS.length - 1) {
        state.lxpIndex++;
      } else {
        state.screen = 'tyoohjaus';
        state.tyoohjausIndex = 0;
      }
      render();
    };
    announceProgress(step, totalSteps(), pct);
    focusMainHeading();
    return;
  }

  if (state.screen === 'tyoohjaus') {
    const q = TYOOHJAUS_QUESTIONS[state.tyoohjausIndex];
    const headingId = `q-${q.id}`;
    const valid = tyoohjausStepValid(state.tyoohjausIndex);
    const isLast = state.tyoohjausIndex >= TYOOHJAUS_QUESTIONS.length - 1;
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Työohjaus ${state.tyoohjausIndex + 1}/${TYOOHJAUS_QUESTIONS.length} · ei LxP-hakua</div>
        <h2 id="${headingId}">${qText(q)}</h2>
        <p class="hint">${qHint(q)}</p>
        <div class="options" id="opts" data-qid="${q.id}" role="radiogroup" aria-labelledby="${headingId}">
          ${q.options.map((o) => {
            const selected = state.tyoohjaus[q.id] === o.key;
            return `<button type="button" class="opt${selected ? ' selected' : ''}" data-key="${o.key}" role="radio" aria-checked="${selected ? 'true' : 'false'}">${optLabel(o)}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn" ${valid ? '' : 'disabled style="opacity:0.5"'}>Seuraava →</button>
      </div>`;

    document.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        state.tyoohjaus[q.id] = btn.dataset.key;
        render();
      };
    });
    document.getElementById('backBtn').onclick = () => {
      if (state.tyoohjausIndex > 0) {
        state.tyoohjausIndex--;
      } else {
        state.screen = 'lxp';
        state.lxpIndex = LXP_QUESTIONS.length - 1;
      }
      render();
    };
    document.getElementById('nextBtn').onclick = () => {
      if (!tyoohjausStepValid(state.tyoohjausIndex)) return;
      if (isLast) {
        track('tyoohjaus_complete', { ...state.tyoohjaus });
        state.screen = 'motivation';
        state.motivationIndex = 0;
      } else {
        state.tyoohjausIndex++;
      }
      render();
    };
    announceProgress(step, totalSteps(), pct);
    focusMainHeading();
    return;
  }

  if (state.screen === 'motivation') {
    const q = MOTIVATION_Q[state.motivationIndex];
    const headingId = `q-${q.id}`;
    const valid = motivationStepValid(state.motivationIndex);
    const isLast = state.motivationIndex >= MOTIVATION_Q.length - 1;
    const isMulti = q.type === 'multi';
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Motivaatio ${state.motivationIndex + 1}/${MOTIVATION_Q.length} · ei LxP-hakua</div>
        <h2 id="${headingId}">${qText(q)}</h2>
        <p class="hint">${qHint(q)}</p>
        <div class="options${q.grid ? ' interest-sector-grid' : ''}" id="opts" data-qid="${q.id}" role="${isMulti ? 'group' : 'radiogroup'}" aria-labelledby="${headingId}">
          ${q.options.map((o) => {
            const selected = isMulti
              ? (state.motivation.meaning || []).includes(o.key)
              : state.motivation.recognition === o.key;
            return `<button type="button" class="opt${selected ? (isMulti ? ' multi selected' : ' selected') : ''}" data-key="${o.key}" role="${isMulti ? 'checkbox' : 'radio'}" aria-checked="${selected ? 'true' : 'false'}">${optLabel(o)}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn" ${valid ? '' : 'disabled style="opacity:0.5"'}>Seuraava →</button>
      </div>`;

    document.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.key;
        if (q.id === 'meaning') {
          let arr = state.motivation.meaning || [];
          if (arr.includes(key)) arr = arr.filter((k) => k !== key);
          else if (arr.length < q.max) arr = [...arr, key];
          state.motivation.meaning = arr;
        } else {
          state.motivation.recognition = key;
        }
        render();
      };
    });
    document.getElementById('backBtn').onclick = () => {
      if (state.motivationIndex > 0) {
        state.motivationIndex--;
      } else {
        state.screen = 'tyoohjaus';
        state.tyoohjausIndex = TYOOHJAUS_QUESTIONS.length - 1;
      }
      render();
    };
    document.getElementById('nextBtn').onclick = () => {
      if (!motivationStepValid(state.motivationIndex)) return;
      if (isLast) {
        track('motivation_complete', { ...state.motivation });
        state.screen = 'subjects';
      } else {
        state.motivationIndex++;
      }
      render();
    };
    announceProgress(step, totalSteps(), pct);
    focusMainHeading();
    return;
  }

  if (state.screen === 'subjects') {
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Kouluaineet</div>
        <h2 id="subjects-heading">${state.plainLanguage ? 'Valitse aineet joista pidät' : 'Valitse aineet, joista pidät'}</h2>
        <p class="hint">${state.plainLanguage ? '1–6 kpl. Ei arvosanoja.' : '1–6 kpl — ei arvosanoja, vain mistä tykkäät.'}</p>
        <div class="subject-grid" id="subGrid" role="group" aria-labelledby="subjects-heading">
          ${SUBJECTS.map((s) => {
            const selected = state.subjects.has(s.id);
            return `<button type="button" class="opt subject-chip${selected ? ' multi selected' : ''}" data-id="${s.id}" role="checkbox" aria-checked="${selected ? 'true' : 'false'}"><span class="emoji" aria-hidden="true">${s.emoji}</span>${s.label}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn" ${state.subjects.size >= 1 ? '' : 'disabled style="opacity:0.5"'}>Seuraava →</button>
      </div>`;

    document.querySelectorAll('#subGrid .opt').forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (state.subjects.has(id)) state.subjects.delete(id);
        else if (state.subjects.size < 6) state.subjects.add(id);
        render();
      };
    });
    document.getElementById('backBtn').onclick = () => {
      state.screen = 'motivation';
      state.motivationIndex = MOTIVATION_Q.length - 1;
      render();
    };
    document.getElementById('nextBtn').onclick = () => {
      if (state.subjects.size < 1) return;
      track('subjects_complete', { count: state.subjects.size });
      state.screen = 'interest';
      render();
    };
    announceProgress(step, totalSteps(), pct);
    focusMainHeading();
    return;
  }

  if (state.screen === 'interest') {
    const q = INTEREST_Q[0];
    const headingId = `q-${q.id}`;
    const valid = interestStepValid();
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Kiinnostus · ${currentStep()}/${totalSteps()}</div>
        <h2 id="${headingId}">${qText(q)}</h2>
        <p class="hint">${qHint(q)}</p>
        <div class="options interest-sector-grid" id="opts" data-qid="${q.id}" role="group" aria-labelledby="${headingId}">
          ${q.options.map((o) => {
            const sel = (state.interest.i1 || []).includes(o.key);
            return `<button type="button" class="opt${sel ? ' multi selected' : ''}" data-key="${o.key}" role="checkbox" aria-checked="${sel ? 'true' : 'false'}">${optLabel(o)}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn" ${valid ? '' : 'disabled style="opacity:0.5"'}>Seuraava →</button>
      </div>`;

    document.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.key;
        let arr = state.interest.i1 || [];
        if (arr.includes(key)) arr = arr.filter((k) => k !== key);
        else if (arr.length < q.multi) arr = [...arr, key];
        state.interest.i1 = arr;
        render();
      };
    });

    document.getElementById('backBtn').onclick = () => {
      state.screen = 'subjects';
      render();
    };
    document.getElementById('nextBtn').onclick = () => {
      if (!interestStepValid()) return;
      state.screen = 'explore';
      render();
    };
    announceProgress(step, totalSteps(), pct);
    focusMainHeading();
    return;
  }

  if (state.screen === 'explore') {
    const headingId = 'q-i4';
    const valid = exploreStepValid();
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Seuraava askel · ${currentStep()}/${totalSteps()}</div>
        <h2 id="${headingId}">${qText(EXPLORE_Q)}</h2>
        <p class="hint">${qHint(EXPLORE_Q)}</p>
        <div class="options" id="opts" data-qid="i4" role="radiogroup" aria-labelledby="${headingId}">
          ${EXPLORE_Q.options.map((o) => {
            const selected = state.interest.i4 === o.key;
            return `<button type="button" class="opt${selected ? ' selected' : ''}" data-key="${o.key}" role="radio" aria-checked="${selected ? 'true' : 'false'}">${optLabel(o)}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn" ${valid ? '' : 'disabled style="opacity:0.5"'}>Näytä tulokseni ✨</button>
      </div>`;

    document.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        state.interest.i4 = btn.dataset.key;
        render();
      };
    });

    document.getElementById('backBtn').onclick = () => {
      state.screen = 'interest';
      render();
    };
    document.getElementById('nextBtn').onclick = () => {
      if (!exploreStepValid()) return;
      track('interest_complete', { i1: state.interest.i1, i4: state.interest.i4 });
      state.screen = 'result';
      spawnConfetti();
      render();
    };
    announceProgress(step, totalSteps(), pct);
    focusMainHeading();
    return;
  }

  if (state.screen === 'result') {
    persistResult();
    const answers = { ...state.lxp };
    const archetype = pickArchetype(answers, state.tyoohjaus, state.motivation, state.interest);
    const sectors = getSectorWeights();
    const paths = scorePaths(answers, sectors, state.interest, state.tyoohjaus, state.motivation);
    const topPaths = paths.slice(0, 3);
    const extraPaths = paths.slice(3, 5);
    const topScore = topPaths[0]?.score || 1;
    const narrative = buildNarrative(answers, state.tyoohjaus);
    const motivationLines = buildMotivationNarrative(state.motivation);
    const top = topPaths[0];
    const heroSentence = buildHeroSentence(archetype, state.tyoohjaus, top);
    const cta = primaryCta(state.interest, top, answers);
    const higherEdNote = hasHigherEdBackground(answers)
      ? '<p class="trust-inline">Korkeakoulutaso huomioitu — ammattilistat näyttävät vain korkeamman tason tehtäviä.</p>'
      : wantsHigherEd(answers)
        ? '<p class="trust-inline">Mukana myös korkeakoulutason jatko-opintopolkuja (AMK/yliopisto).</p>'
        : '';

    const aspirationAlert = buildAspirationMismatchHtml(state.tyoohjaus, state.motivation, state.interest);

    app.innerHTML = `
      <p class="trust-banner">${txt('trustBanner')}</p>

      <div class="result-visual">
      <img src="/yoro-paths.svg" class="result-path-art yoro-paths-art" width="480" height="310" alt="" aria-hidden="true"/>
      <div class="result-hero">
        <div class="result-emoji" aria-hidden="true">${archetype.emoji}</div>
        <div class="result-type">${txt('resultType')}</div>
        <h2 class="result-title" tabindex="-1">${archetype.title}</h2>
        <p class="hero-sentence">${heroSentence}</p>
      </div>
      </div>

      ${aspirationAlert}

      <div class="card">
        <div class="section-title" style="margin-top:0">${txt('strengthsTitle')}</div>
        ${renderStrengths(archetype)}
        <div class="section-title" style="margin-top:18px">${state.plainLanguage ? 'Lisää sinusta' : 'Työtyylisi lyhyesti'}</div>
        <ul class="narrative-list">
          ${narrative.slice(0, 4).map((n) => `<li>${n}</li>`).join('')}
        </ul>
        ${motivationLines.length ? `
        <div class="section-title" style="margin-top:18px">${state.plainLanguage ? 'Motivaatio' : 'Motivaatio pitkällä aikavälillä'}</div>
        <ul class="narrative-list motivation-list">
          ${motivationLines.map((n) => `<li>${n}</li>`).join('')}
        </ul>` : ''}
      </div>

      <a class="btn btn-primary cta-primary" href="${cta.url}" target="_blank" rel="noopener noreferrer">${cta.label}</a>
      ${cta.secondary ? `<a class="btn btn-ghost cta-secondary" href="${cta.secondary.url}" target="_blank" rel="noopener noreferrer">${cta.secondary.label}</a>` : ''}
      <p class="cta-desc">${cta.desc}</p>

      <div class="section-title">${txt('pathsTitle')}</div>
      <p class="section-lead">${txt('pathsLead')}</p>
      ${higherEdNote}
      <div class="path-list">
      ${topPaths.map((p, i) => renderPathCard(p, i, answers, state.interest, state.tyoohjaus, state.motivation, topScore)).join('')}
      </div>
      ${extraPaths.length ? `
      <div id="extraPaths" class="extra-paths path-list" hidden>
        ${extraPaths.map((p, i) => renderPathCard(p, i + 3, answers, state.interest, state.tyoohjaus, state.motivation, topScore)).join('')}
      </div>
      <button type="button" class="btn btn-ghost" id="showMorePathsBtn">Näytä ${extraPaths.length} muuta polkua ▾</button>` : ''}

      ${renderAdvisorChatHtml(archetype, topPaths)}

      ${hasFeedbackForCurrentResult() ? '' : `
      <div class="feedback-card" id="feedbackCard">
        <p class="feedback-title">Osuiko tulos sinuun?</p>
        <div class="feedback-btns">
          <button type="button" class="feedback-btn" data-feedback="yes">Kyllä</button>
          <button type="button" class="feedback-btn" data-feedback="partly">Osittain</button>
          <button type="button" class="feedback-btn" data-feedback="no">Ei juuri</button>
        </div>
        <p class="feedback-thanks" id="feedbackThanks" hidden>Kiitos palautteesta — auttaa meitä kehittämään testiä.</p>
      </div>`}

      <div class="share-section">
        <button type="button" class="btn btn-share btn-share-toggle" id="shareToggleBtn" aria-expanded="${state.shareOpen ? 'true' : 'false'}" aria-controls="shareOptions">
          ${txt('shareToggle')}${state.shareOpen ? ' ▴' : ' ▾'}
        </button>
        <div class="share-options" id="shareOptions" ${state.shareOpen ? '' : 'hidden'}>
          <button type="button" class="btn btn-share btn-share-option" id="shareToCounselorBtn">${txt('shareToCounselor')}</button>
          <button type="button" class="btn btn-share btn-share-option" id="shareToFriendBtn">${txt('shareToFriend')}</button>
          <button type="button" class="btn btn-share btn-share-option" id="copyResultLinkBtn">${txt('copyResultLink')}</button>
          <button type="button" class="btn btn-share btn-share-option" id="downloadCardBtn">${txt('shareDownloadCard')}</button>
          <button type="button" class="btn btn-share btn-share-option" id="shareBtn">${txt('shareText')}</button>
        </div>
      </div>
      <button class="btn btn-ghost" id="retryBtn">Tee testi uudelleen</button>
      <a href="https://yoro.fi/" class="btn btn-ghost" style="text-decoration:none;margin-top:8px">← Palaa Yoro.fi-sivuille</a>

      <p class="disclaimer">Tulos perustuu 10 kysymyksen LxP-työtyyliin, työohjauskerrokseen (mukaan lukien vapaa-aika), motivaatioon, lempikouluaineisiin ja kiinnostukseen. Ammattinimet noudattavat <a href="${TE24_SOURCE_URL}" target="_blank" rel="noopener noreferrer">TE24-luokitusta</a>. Ei vaikuta työnantajan LxP-hakuun (lxp.yoro.fi). Emme mittaa älykkyyttä tai arvosanoja.</p>`;

    track('result_view', {
      archetype: archetype.id,
      topPath: top?.id,
      aspirationMismatch: detectAspirationMismatch(state.tyoohjaus, state.motivation, state.interest),
    });
    bindPathToggles();
    bindPathWhyToggles();
    bindShowMorePaths(extraPaths.length);
    if (!hasFeedbackForCurrentResult()) bindFeedback(archetype, top);
    bindShareToCounselor(archetype, topPaths);
    bindShareToFriend(archetype, topPaths);
    bindAdvisorChat(archetype, topPaths, answers, state.tyoohjaus, state.motivation, state.interest);
    bindCtaTracking();

    document.getElementById('shareToggleBtn')?.addEventListener('click', () => {
      state.shareOpen = !state.shareOpen;
      track('share_toggle', { open: state.shareOpen });
      render();
    });

    const downloadCardBtn = document.getElementById('downloadCardBtn');
    if (downloadCardBtn) downloadCardBtn.onclick = () => downloadShareCard(archetype, top);

    document.getElementById('copyResultLinkBtn').onclick = async () => {
      const url = resultPageUrl();
      track('copy_result_link');
      try {
        await navigator.clipboard.writeText(url);
        const btn = document.getElementById('copyResultLinkBtn');
        btn.textContent = txt('linkCopied');
        setTimeout(() => { btn.textContent = txt('copyResultLink'); }, 2500);
      } catch (_) { /* ignore */ }
    };

    document.getElementById('shareBtn').onclick = async () => {
      const text = shareText(archetype, topPaths);
      const url = resultPageUrl();
      track('share_text');
      if (navigator.share) {
        try {
          await navigator.share({ title: 'Millainen tekijä olet? — Yoro', text, url });
          return;
        } catch (_) { /* fallback */ }
      }
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById('shareBtn');
      btn.textContent = 'Kopioitu! Lähetä kaverille ✓';
      setTimeout(() => { btn.textContent = txt('shareText'); }, 2500);
    };

    document.getElementById('retryBtn').onclick = () => {
      track('retry');
      document.getElementById('shareCounselorModal')?.remove();
      document.getElementById('shareFriendModal')?.remove();
      document.body.classList.remove('modal-open');
      history.replaceState(null, '', `${location.pathname}${location.search}`);
      try { localStorage.removeItem(RESULT_STORAGE_KEY); } catch (_) { /* ignore */ }
      try { localStorage.removeItem(FEEDBACK_DONE_KEY); } catch (_) { /* ignore */ }
      Object.assign(state, {
        screen: 'intro',
        lxpIndex: 0,
        tyoohjausIndex: 0,
        motivationIndex: 0,
        lxp: {},
        tyoohjaus: {},
        motivation: { meaning: [], recognition: '' },
        subjects: new Set(),
        interest: {},
        advisorChat: { open: false, messages: [], loading: false, error: '' },
        shareOpen: false,
      });
      render();
    };
    focusMainHeading();
  }
}

function initApp() {
  loadPreferences();
  bindAccessibilityControls();
  if (tryRestoreResultFromUrl()) {
    render();
    return;
  }
  render();
}

document.addEventListener('DOMContentLoaded', initApp);
