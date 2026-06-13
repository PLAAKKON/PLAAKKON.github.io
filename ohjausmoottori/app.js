/* Yoro Ohjausmoottori — nuorten työtyyli & polkutesti */

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
    phase: 'Koulutus',
    text: 'Mikä on koulutustaustasi?',
    options: [
      { key: 'a', label: 'Olen oppinut työni käytännössä, ilman muodollista koulutusta.' },
      { key: 'b', label: 'Olen suorittanut keskiasteen koulutuksen (esim. ammattikoulu).' },
      { key: 'c', label: 'Minulla on korkeakoulututkinto.' },
    ],
    narrative: {
      a: 'Käytännön koulutus ja kokemus.',
      b: 'Keskiasteen koulutus taustalla.',
      c: 'Korkeakoulutettu.',
    },
  },
  {
    id: 'q8',
    phase: 'Oppiminen',
    text: 'Miten suhtaudut alan vaihtoon ja opiskeluun?',
    options: [
      { key: 'a', label: 'Olen avoin uusille mahdollisuuksille ja valmis opiskelemaan uutta alaa varten.' },
      { key: 'b', label: 'Haluan syventää osaamistani nykyisellä alallani.' },
      { key: 'c', label: 'Olen avoin alanvaihdolle, mutta en voi sitoutua uusiin opintoihin.' },
      { key: 'd', label: 'Haluan jatkaa nykyisellä alallani, enkä suunnittele lisäkoulutusta.' },
      { key: 'e', label: 'Olen valmis vaihtamaan alaa, jolle nykyiset taitoni riittävät.' },
    ],
    narrative: {
      a: 'Avoin uusille poluille ja opiskelulle.',
      b: 'Syvennät osaamista nykyisellä suunnalla.',
      c: 'Avoin vaihdolle ilman pitkää koulutusta.',
      d: 'Jatkat tutulla polulla.',
      e: 'Alanvaihto ilman uutta tutkintoa.',
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

const INTEREST_Q = [
  {
    id: 'i1',
    text: 'Mistä työaloista haluaisit kuulla lisää?',
    hint: 'Valitse kaksi — ajattele työtä, ei harrastusta.',
    multi: 2,
    options: [
      { key: 'tekniikka', label: 'Tekniikka & digi — koneet, ohjelmistot, pelit' },
      { key: 'terveys', label: 'Ihmiset & hoiva — terveys, kasvatus, neuvonta' },
      { key: 'luonto', label: 'Luonto & ympäristö — metsä, eläimet, ulkoilu työnä' },
      { key: 'kaytanto', label: 'Rakentaminen & kädet — korjaus, asennus, tuotanto' },
      { key: 'luova', label: 'Luova — media, design, musiikki, pelit' },
      { key: 'liiketoiminta', label: 'Liiketoiminta — myynti, hallinto, järjestäminen' },
    ],
  },
  {
    id: 'i2',
    text: 'Miltä työpäivä kuulostaa mielenkiintoisimmalta?',
    hint: 'Valitse yksi.',
    multi: 1,
    options: [
      { key: 'solve', label: 'Ratkaisen ongelman — laskenta, koodi, data tai suunnittelu' },
      { key: 'help', label: 'Autan ihmistä — hoiva, opetus, neuvonta' },
      { key: 'build', label: 'Rakennan tai korjaan jotain konkreettista' },
      { key: 'create', label: 'Luon jotain uutta — kuva, teksti, video, peli' },
      { key: 'connect', label: 'Keskustelen asiakkaiden tai tiimin kanssa' },
      { key: 'organize', label: 'Varmistan, että asiat toimivat ja sujuvat' },
    ],
  },
  {
    id: 'i3',
    text: 'Mitä aiheita seuraat tai opiskelet vapaaehtoisesti?',
    hint: 'Valitse enintään kaksi.',
    multi: 2,
    options: [
      { key: 'tech', label: 'Teknologia, pelit, ohjelmointi' },
      { key: 'people', label: 'Ihmiset, terveys, psykologia' },
      { key: 'business', label: 'Liiketoiminta, talous, some' },
      { key: 'nature', label: 'Luonto, ilmasto, eläimet' },
      { key: 'creative', label: 'Taide, design, tarinat' },
      { key: 'how', label: 'Miten asiat toimivat — koneet, rakentaminen' },
      { key: 'unsure', label: 'En osaa vielä sanoa' },
    ],
  },
  {
    id: 'i4',
    text: 'Miten haluaisit tutustua ammattiin ensin?',
    hint: 'Valitse yksi — seuraava askel.',
    multi: 1,
    options: [
      { key: 'tet', label: 'Kokeilla käytännössä — TET, kesätyö, harjoittelu' },
      { key: 'study', label: 'Lyhyt koulutus tai kurssi' },
      { key: 'mentor', label: 'Jutella ammattilaisen kanssa' },
      { key: 'explore', label: 'En tiedä vielä — näytä useita vaihtoehtoja' },
    ],
  },
];

const ARCHETYPES = [
  {
    id: 'sukeltaja',
    emoji: '🎯',
    title: 'Syvä Sukeltaja',
    tagline: 'Itsenäinen, tarkka, syvennyt kun löydät oikean jutun.',
    match: (a) => (a.q1 === 'a' || a.q1 === 'b') && a.q2 === 'c' && (a.q5 === 'a' || a.q5 === 'b'),
    traits: { itsenäisyys: 92, tarkkuus: 88, tiimi: 45, digi: 75 },
  },
  {
    id: 'ratkaisija',
    emoji: '💡',
    title: 'Ongelmanratkaisija',
    tagline: 'Analysoit, lasket, korjaat — aivot työssä.',
    match: (a) => a.q2 === 'c' && (a.q5 === 'a' || a.q5 === 'b') && (a.q4 === 'a' || a.q4 === 'b'),
    traits: { itsenäisyys: 80, tarkkuus: 90, tiimi: 55, digi: 85 },
  },
  {
    id: 'tiimipro',
    emoji: '🤝',
    title: 'Tiimipeli-Pro',
    tagline: 'Energia tulee ihmisistä ja yhteisestä tekemisestä.',
    match: (a) => (a.q1 === 'd' || a.q1 === 'e') || a.q2 === 'd' || a.q4 === 'c' || a.q4 === 'd',
    traits: { itsenäisyys: 40, tarkkuus: 55, tiimi: 95, digi: 50 },
  },
  {
    id: 'tekija',
    emoji: '🔧',
    title: 'Käytännön Tekijä',
    tagline: 'Näet kädet työssä — konkreettinen tulos motivoi.',
    match: (a) => a.q2 === 'a' || a.q5 === 'c' || a.q5 === 'd',
    traits: { itsenäisyys: 65, tarkkuus: 70, tiimi: 50, digi: 30 },
  },
  {
    id: 'monitekija',
    emoji: '🚀',
    title: 'Monitekijä',
    tagline: 'Vaihtelu pitää sinut hereillä — et jaksa rutiinia.',
    match: (a) => a.q3 === 'c' || a.q5 === 'e',
    traits: { itsenäisyys: 60, tarkkuus: 55, tiimi: 65, digi: 60 },
  },
  {
    id: 'luova',
    emoji: '✨',
    title: 'Luova Muotoilija',
    tagline: 'Ideat, kuvat, tarinat — luot uutta.',
    match: () => false,
    traits: { itsenäisyys: 70, tarkkuus: 65, tiimi: 60, digi: 70 },
  },
];

const PATHS = [
  {
    id: 'engineer',
    name: 'Tuotekehitys & insinööri',
    emoji: '⚙️',
    desc: 'Suunnittelu, laskenta, simulointi — tekniikka käytännössä ja koneella.',
    sectors: ['tekniikka'],
    subjects: ['matematiikka', 'fysiikka', 'kemia', 'kasityo'],
    workday: ['solve', 'build'],
    topics: ['tech', 'how'],
    lxp: { q2: ['c'], q5: ['a', 'b'], q1: ['a', 'b', 'd'] },
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
    workday: ['solve', 'create'],
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
    workday: ['help'],
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
    workday: ['build'],
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
    workday: ['solve', 'organize'],
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
    workday: ['connect', 'organize'],
    topics: ['business'],
    lxp: { q1: ['d'], q4: ['b', 'c'], q9: ['a', 'b'] },
    tet: 'TET yrityksessä — myynti, hallinto tai markkinointi',
    study: 'Liiketalouden opinnot tai merkonomi',
  },
  {
    id: 'nature',
    name: 'Luonto & ympäristö',
    emoji: '🌲',
    desc: 'Metsä, maatalous, ympäristö — ulkoilma ja kestävyys.',
    sectors: ['luonto'],
    subjects: ['biologia', 'maantieto'],
    workday: ['build'],
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
    workday: ['organize', 'help'],
    topics: ['people'],
    lxp: { q2: ['c', 'd'], q7: ['b', 'c'] },
    tet: 'TET kunnassa, poliisilla tai järjestössä',
    study: 'Hallinto- tai oikeusalan opinnot',
  },
];

const state = {
  screen: 'intro',
  lxpIndex: 0,
  lxp: {},
  subjects: new Set(),
  interest: {},
  interestIndex: 0,
};

function totalSteps() {
  return LXP_QUESTIONS.length + 1 + INTEREST_Q.length;
}

function currentStep() {
  if (state.screen === 'lxp') return state.lxpIndex + 1;
  if (state.screen === 'subjects') return LXP_QUESTIONS.length + 1;
  if (state.screen === 'interest') return LXP_QUESTIONS.length + 2 + state.interestIndex;
  return 0;
}

function progressPct() {
  return Math.round((currentStep() / totalSteps()) * 100);
}

function pickArchetype(answers) {
  for (const arch of ARCHETYPES) {
    if (arch.match(answers)) return arch;
  }
  const subs = [...state.subjects];
  if (subs.some((s) => ['kuvataide', 'musiikki'].includes(s))) return ARCHETYPES.find((a) => a.id === 'luova');
  return ARCHETYPES[0];
}

function scorePaths(answers, sectors, interests) {
  const sectorSet = new Set(sectors);
  const i1 = interests.i1 || [];
  const i2 = interests.i2;
  const i3 = interests.i3 || [];

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
      if (path.sectors.includes(key)) {
        score += 18;
        reasons.push('kiinnostus');
      }
    });

    if (path.workday.includes(i2)) {
      score += 15;
      reasons.push('työpäivä');
    }

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

function buildNarrative(answers) {
  const lines = [];
  LXP_QUESTIONS.forEach((q) => {
    const key = answers[q.id];
    if (key && q.narrative[key]) lines.push(q.narrative[key]);
  });
  return lines.slice(0, 5);
}

function nextStepLabel() {
  const map = {
    tet: 'Seuraavaksi: kokeile TET:llä',
    study: 'Seuraavaksi: tutustu koulutukseen',
    mentor: 'Seuraavaksi: juttele ammattilaiselle',
    explore: 'Seuraavaksi: tutki useita polkuja',
  };
  return map[state.interest.i4] || map.explore;
}

function shareText(archetype, paths) {
  const top = paths[0]?.name || 'uusia polkuja';
  return `Työtyylini on ${archetype.title} ${archetype.emoji}\n\nYoron ohjausmoottori ehdotti mulle polkua: ${top}\n\nEt tarvitse tietää vielä mitä haluat — kokeile 5 min testi:\nhttps://yoro.fi/ohjausmoottori/`;
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
    app.innerHTML = `
      <section class="hero">
        <div class="pill">Ilmainen · 5 min</div>
        <h1 style="margin-top:14px">Et tiedä mitä haluat?<br><span>Hyvä.</span></h1>
        <p>Tämä testi ei kerro sinulle ammattia. Se kertoo <strong style="color:var(--text)">miten sinä työskentelet parhaiten</strong> — ja ehdottaa polkuja kokeiltavaksi.</p>
        <p class="hook">✦ Saat oman työtyyli-tyypin + jaettavan kortin</p>
        <div class="stats-row">
          <div class="stat"><strong>10</strong><span>LxP-kysymystä</span></div>
          <div class="stat"><strong>+</strong><span>lempikouluaineet</span></div>
          <div class="stat"><strong>4</strong><span>kiinnostusta</span></div>
        </div>
        <button class="btn btn-primary" id="startBtn">Aloita testi →</button>
        <p class="disclaimer" style="margin-top:20px">Ei rekisteröitymistä. Tulos on ohjausta, ei ennustetta.</p>
      </section>`;
    document.getElementById('startBtn').onclick = () => {
      state.screen = 'lxp';
      render();
    };
    return;
  }

  const progressHtml =
    state.screen !== 'result'
      ? `<div class="progress-wrap">
          <div class="progress-label"><span>Vaihe ${step}/${totalSteps()}</span><strong>${pct}%</strong></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>`
      : '';

  if (state.screen === 'lxp') {
    const q = LXP_QUESTIONS[state.lxpIndex];
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">${state.lxpIndex + 1}/10 · ${q.phase}</div>
        <h2>${q.text}</h2>
        <p class="hint">Valitse yksi — ei oikeita tai vääriä vastauksia.</p>
        <div class="options" id="opts">
          ${q.options.map((o) => `<button type="button" class="opt${state.lxp[q.id] === o.key ? ' selected' : ''}" data-key="${o.key}">${o.label}</button>`).join('')}
        </div>
      </div>
      <div class="nav-row">
        ${state.lxpIndex > 0 ? '<button class="btn btn-ghost" id="backBtn">← Takaisin</button>' : '<span></span>'}
        <button class="btn btn-primary" id="nextBtn">${state.lxpIndex < 9 ? 'Seuraava →' : 'Lempiaineet →'}</button>
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
        state.screen = 'subjects';
      }
      render();
    };
    return;
  }

  if (state.screen === 'subjects') {
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Kouluaineet</div>
        <h2>Valitse aineet, joista pidät</h2>
        <p class="hint">1–6 kpl — ei arvosanoja, vain mistä tykkäät.</p>
        <div class="subject-grid" id="subGrid">
          ${SUBJECTS.map((s) => `<button type="button" class="opt subject-chip${state.subjects.has(s.id) ? ' multi selected' : ''}" data-id="${s.id}"><span class="emoji">${s.emoji}</span>${s.label}</button>`).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn" ${state.subjects.size >= 1 ? '' : 'disabled style="opacity:0.5"'}>Kiinnostus →</button>
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
      state.screen = 'lxp';
      state.lxpIndex = LXP_QUESTIONS.length - 1;
      render();
    };
    document.getElementById('nextBtn').onclick = () => {
      if (state.subjects.size < 1) return;
      state.screen = 'interest';
      state.interestIndex = 0;
      render();
    };
    return;
  }

  if (state.screen === 'interest') {
    const q = INTEREST_Q[state.interestIndex];
    const selected = state.interest[q.id] || (q.multi > 1 ? [] : null);
    const isSelected = (key) => {
      if (Array.isArray(selected)) return selected.includes(key);
      return selected === key;
    };

    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Kiinnostus ${state.interestIndex + 1}/4</div>
        <h2>${q.text}</h2>
        <p class="hint">${q.hint}</p>
        <div class="options" id="opts">
          ${q.options.map((o) => `<button type="button" class="opt${isSelected(o.key) ? ' selected' : ''}" data-key="${o.key}">${o.label}</button>`).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn">${state.interestIndex < INTEREST_Q.length - 1 ? 'Seuraava →' : 'Näytä tulokseni ✨'}</button>
      </div>`;

    document.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.key;
        if (q.multi > 1) {
          let arr = state.interest[q.id] || [];
          if (arr.includes(key)) arr = arr.filter((k) => k !== key);
          else if (arr.length < q.multi) arr = [...arr, key];
          state.interest[q.id] = arr;
        } else {
          state.interest[q.id] = key;
        }
        render();
      };
    });

    const sel = state.interest[q.id];
    const valid = Array.isArray(sel) ? sel.length >= (q.id === 'i3' ? 1 : q.multi) : !!sel;
    const nextBtn = document.getElementById('nextBtn');
    if (!valid) nextBtn.setAttribute('disabled', '');
    else nextBtn.removeAttribute('disabled');

    document.getElementById('backBtn').onclick = () => {
      if (state.interestIndex > 0) state.interestIndex--;
      else state.screen = 'subjects';
      render();
    };
    nextBtn.onclick = () => {
      if (!valid) return;
      if (state.interestIndex < INTEREST_Q.length - 1) {
        state.interestIndex++;
      } else {
        state.screen = 'result';
        spawnConfetti();
      }
      render();
    };
    return;
  }

  if (state.screen === 'result') {
    const answers = { ...state.lxp };
    const archetype = pickArchetype(answers);
    const sectors = getSectorWeights();
    const paths = scorePaths(answers, sectors, state.interest);
    const topPaths = paths.slice(0, 5);
    const narrative = buildNarrative(answers);
    const top = topPaths[0];
    const nextLabel = nextStepLabel();

    app.innerHTML = `
      <div class="result-hero">
        <div class="result-emoji">${archetype.emoji}</div>
        <div class="result-type">Sinun työtyyli-tyyppisi</div>
        <h2 class="result-title">${archetype.title}</h2>
        <p class="result-tagline">${archetype.tagline}</p>
      </div>

      <div class="card">
        <div class="section-title" style="margin-top:0">Työtyylisi</div>
        <ul style="padding-left:18px;color:var(--muted);font-size:0.9rem">
          ${narrative.map((n) => `<li style="margin-bottom:6px">${n}</li>`).join('')}
        </ul>

        <div class="trait-bars">
          ${Object.entries(archetype.traits).map(([name, val]) => `
            <div class="trait">
              <div class="trait-head"><strong>${name.charAt(0).toUpperCase() + name.slice(1)}</strong><span>${val}%</span></div>
              <div class="trait-bar"><div class="trait-fill" style="width:${val}%"></div></div>
            </div>`).join('')}
        </div>
      </div>

      <div class="section-title">Polkuja kokeiltavaksi</div>
      <p style="font-size:0.85rem;color:var(--muted);margin-bottom:12px">Ei lopullista uraa — ehdotuksia suuntaan, joka sopii työtyyliisi ja valintoihisi.</p>
      ${topPaths.map((p, i) => `
        <div class="path-card">
          <span class="path-emoji">${p.emoji}</span>
          <div>
            <h3>${i + 1}. ${p.name}</h3>
            <p>${p.desc}</p>
            <div class="path-score">Sopivuus ${Math.min(98, 55 + p.score)}%</div>
          </div>
        </div>`).join('')}

      <div class="next-step">
        <h3>${nextLabel}</h3>
        <p style="font-size:0.9rem;color:var(--muted)">${top ? top.tet : 'Kokeile eri aloja TET-jaksolla tai kesätyöllä.'}</p>
        ${top?.study ? `<p style="font-size:0.85rem;color:var(--muted);margin-top:8px">📚 ${top.study}</p>` : ''}
      </div>

      <button class="btn btn-share" id="shareBtn" style="margin-top:20px">Jaa kaverille 📲</button>
      <button class="btn btn-ghost" id="retryBtn">Tee testi uudelleen</button>
      <a href="https://yoro.fi/profiilitesti/" class="btn btn-ghost" style="text-decoration:none;margin-top:8px">Täysi LxP-profiilitesti →</a>

      <p class="disclaimer">Tulos perustuu työtyyliin (LxP), lempikouluaineisiin ja kiinnostukseen. Ammatti selkiytyy kokeilemalla — ei yhdestä testistä.</p>`;

    document.getElementById('shareBtn').onclick = async () => {
      const text = shareText(archetype, topPaths);
      if (navigator.share) {
        try {
          await navigator.share({ title: 'Työtyylini — Yoro', text, url: 'https://yoro.fi/ohjausmoottori/' });
          return;
        } catch (_) { /* fallback */ }
      }
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById('shareBtn');
      btn.textContent = 'Kopioitu! Lähetä kaverille ✓';
      setTimeout(() => { btn.textContent = 'Jaa kaverille 📲'; }, 2500);
    };

    document.getElementById('retryBtn').onclick = () => {
      Object.assign(state, {
        screen: 'intro',
        lxpIndex: 0,
        lxp: {},
        subjects: new Set(),
        interest: {},
        interestIndex: 0,
      });
      render();
    };
  }
}

document.addEventListener('DOMContentLoaded', () => render());
