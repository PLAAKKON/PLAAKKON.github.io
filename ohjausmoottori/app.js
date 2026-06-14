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
    hint: 'Tämä kysymys on vain uraohjaukseen — ei vaikuta työnantajan LxP-hakuun. Ei oikeaa vastausta.',
    options: [
      { key: 'a', label: 'Olen huolellinen ja tarkka — pienetkin virheet häiritsevät minua.' },
      { key: 'b', label: 'Pyrin olemaan tarkka, mutta priorisoin usein kokonaiskuvan.' },
      { key: 'c', label: 'Olen suurpiirteinen — näen mieluummin kokonaisuuden kuin yksityiskohdat.' },
      { key: 'd', label: 'Teen välillä virheitä, mutta korjaan ne nopeasti eteenpäin mennessä.' },
    ],
    narrative: {
      a: 'Tarkkuus ja huolellisuus ovat vahvuuksiasi.',
      b: 'Tasapaino tarkkuuden ja kokonaiskuvan välillä.',
      c: 'Suur kuva ja kokonaisuus edellä — sopii esim. tuotekehitykseen ja luovaan tekemiseen.',
      d: 'Ketterä eteenpäin — virheet korjataan matkan varrella; sinnikkyys vie pitkälle.',
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
    text: 'Mikä olisi sinulle luontevin tapa tutustua työelämään?',
    hint: 'Valitse yksi. Et tarvitse vielä tietää ammattia.',
    multi: 1,
    options: [
      { key: 'tet', label: 'Kokeilla käytännössä — TET, kesätyö tai harjoittelu' },
      { key: 'study', label: 'Tutustua koulutuksiin ja opintoihin' },
      { key: 'mentor', label: 'Kuulla ammattilaiselta, millaista työ on' },
      { key: 'explore', label: 'En tiedä vielä — haluan nähdä useita vaihtoehtoja' },
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
    desc: 'Ideat, prototyypit, kehitys — luovuus ja sinnikkyys ratkaisevat; pieni hajamielisyys ei haittaa.',
    sectors: ['tekniikka'],
    subjects: ['matematiikka', 'fysiikka', 'kemia', 'kasityo'],
    workday: ['solve', 'build'],
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
    study: 'Tradenomi, kauppatieteet tai liiketalous (AMK/yliopisto)',
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

function occupationsForPath(pathId, answers) {
  const tiers = OCCUPATIONS_BY_PATH[pathId];
  if (!tiers) return [];
  if (hasHigherEdBackground(answers)) {
    return tiers.higherEd.length ? [...tiers.higherEd] : [...tiers.vocational];
  }
  return [...tiers.vocational, ...tiers.higherEd];
}

function occupationCountForPath(pathId, answers) {
  return occupationsForPath(pathId, answers).length;
}

function occupationHintFor(answers) {
  if (hasHigherEdBackground(answers)) {
    return 'Esimerkkejä korkeakoulutasoiseen polkuun sopivista ammateista (TE24) — ei perustason toimisto- tai käytännön tehtäviä.';
  }
  return 'Esimerkkejä tämän polun ammateista (TE24) — kokeile TET:llä tai tutustu opintoihin.';
}

function renderOccupationList(pathId, answers) {
  const jobs = occupationsForPath(pathId, answers);
  if (!jobs.length) return '';
  return `<ul class="occupation-list">${jobs.map((j) => `<li>${j}</li>`).join('')}</ul>`;
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

const state = {
  screen: 'intro',
  lxpIndex: 0,
  lxp: {},
  tyoohjaus: {},
  subjects: new Set(),
  interest: {},
  interestIndex: 0,
};

function totalSteps() {
  return LXP_QUESTIONS.length + TYOOHJAUS_QUESTIONS.length + 1 + INTEREST_Q.length;
}

function currentStep() {
  if (state.screen === 'lxp') return state.lxpIndex + 1;
  if (state.screen === 'tyoohjaus') return LXP_QUESTIONS.length + 1;
  if (state.screen === 'subjects') return LXP_QUESTIONS.length + TYOOHJAUS_QUESTIONS.length + 1;
  if (state.screen === 'interest') {
    return LXP_QUESTIONS.length + TYOOHJAUS_QUESTIONS.length + 2 + state.interestIndex;
  }
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

function scorePaths(answers, sectors, interests, tyoohjaus = {}) {
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
        if (i2 === 'solve' || i2 === 'create') score += 8;
        i3.forEach((key) => {
          if (key === 'tech' || key === 'creative') score += 6;
        });
      }
    }

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
  return lines.slice(0, 6);
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
          <div class="stat"><strong>+</strong><span>työohjaus & kiinnostus</span></div>
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
        <div class="phase-tag">${state.lxpIndex + 1}/${LXP_QUESTIONS.length} · ${q.phase}</div>
        <h2>${q.text}</h2>
        <p class="hint">${q.hint || 'Valitse yksi — ei oikeita tai vääriä vastauksia.'}</p>
        <div class="options" id="opts">
          ${q.options.map((o) => `<button type="button" class="opt${state.lxp[q.id] === o.key ? ' selected' : ''}" data-key="${o.key}">${o.label}</button>`).join('')}
        </div>
      </div>
      <div class="nav-row">
        ${state.lxpIndex > 0 ? '<button class="btn btn-ghost" id="backBtn">← Takaisin</button>' : '<span></span>'}
        <button class="btn btn-primary" id="nextBtn">${state.lxpIndex < LXP_QUESTIONS.length - 1 ? 'Seuraava →' : 'Työohjaus →'}</button>
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
      }
      render();
    };
    return;
  }

  if (state.screen === 'tyoohjaus') {
    const q = TYOOHJAUS_QUESTIONS[0];
    app.innerHTML = `
      ${progressHtml}
      <div class="card">
        <div class="phase-tag">Työohjaus · ei LxP-hakua</div>
        <h2>${q.text}</h2>
        <p class="hint">${q.hint}</p>
        <div class="options" id="opts">
          ${q.options.map((o) => `<button type="button" class="opt${state.tyoohjaus[q.id] === o.key ? ' selected' : ''}" data-key="${o.key}">${o.label}</button>`).join('')}
        </div>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost" id="backBtn">← Takaisin</button>
        <button class="btn btn-primary" id="nextBtn">Lempiaineet →</button>
      </div>`;

    document.querySelectorAll('.opt').forEach((btn) => {
      btn.onclick = () => {
        state.tyoohjaus[q.id] = btn.dataset.key;
        render();
      };
    });
    document.getElementById('backBtn').onclick = () => {
      state.screen = 'lxp';
      state.lxpIndex = LXP_QUESTIONS.length - 1;
      render();
    };
    document.getElementById('nextBtn').onclick = () => {
      if (!state.tyoohjaus[q.id]) return;
      state.screen = 'subjects';
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
      state.screen = 'tyoohjaus';
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
    const paths = scorePaths(answers, sectors, state.interest, state.tyoohjaus);
    const topPaths = paths.slice(0, 5);
    const narrative = buildNarrative(answers, state.tyoohjaus);
    const top = topPaths[0];
    const nextLabel = nextStepLabel();
    const higherEdNote = hasHigherEdBackground(answers)
      ? '<p style="font-size:0.85rem;color:var(--accent3);margin-bottom:12px;padding:12px;background:rgba(52,211,153,0.08);border-radius:12px;border:1px solid rgba(52,211,153,0.2)">🎓 Korkeakoulutaso huomioitu — ammattilistat näyttävät vain korkeamman tason tehtäviä (ei sihteeri-, varasto- tai perushallintotyötä).</p>'
      : wantsHigherEd(answers)
        ? '<p style="font-size:0.85rem;color:var(--accent3);margin-bottom:12px;padding:12px;background:rgba(52,211,153,0.08);border-radius:12px;border:1px solid rgba(52,211,153,0.2)">🎓 Valintojesi perusteella mukana myös korkeakoulutason jatko-opintopolkuja (AMK/yliopisto).</p>'
        : '';

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
      <p style="font-size:0.85rem;color:var(--muted);margin-bottom:12px">Ei lopullista uraa — ehdotuksia suuntaan. Avaa polku nähdäksesi esimerkkiammatteja (TE24).</p>
      ${higherEdNote}
      ${topPaths.map((p, i) => {
        const study = studyLineForPath(p, answers);
        const occCount = occupationCountForPath(p.id, answers);
        const occHint = occupationHintFor(answers);
        return `
        <div class="path-card">
          <span class="path-emoji">${p.emoji}</span>
          <div class="path-card-body">
            <h3>${i + 1}. ${p.name}</h3>
            <p>${p.desc}</p>
            ${study ? `<p class="path-study">📚 ${study}</p>` : ''}
            <div class="path-score">Sopivuus ${Math.min(98, 55 + p.score)}%</div>
            ${occCount ? `
            <button type="button" class="path-toggle" data-count="${occCount}" aria-expanded="false">
              Näytä ammatit (${occCount}) ▾
            </button>
            <div class="path-occupations" hidden>
              <p class="occupation-hint">${occHint}</p>
              ${renderOccupationList(p.id, answers)}
            </div>` : ''}
          </div>
        </div>`;
      }).join('')}

      <div class="next-step">
        <h3>${nextLabel}</h3>
        <p style="font-size:0.9rem;color:var(--muted)">${top ? top.tet : 'Kokeile eri aloja TET-jaksolla tai kesätyöllä.'}</p>
        ${top && studyLineForPath(top, answers) ? `<p style="font-size:0.85rem;color:var(--muted);margin-top:8px">📚 ${studyLineForPath(top, answers)}</p>` : ''}
      </div>

      <button class="btn btn-share" id="shareBtn" style="margin-top:20px">Jaa kaverille 📲</button>
      <button class="btn btn-ghost" id="retryBtn">Tee testi uudelleen</button>
      <a href="https://yoro.fi/" class="btn btn-ghost" style="text-decoration:none;margin-top:8px">← Palaa Yoro.fi-sivuille</a>

      <p class="disclaimer">Tulos perustuu 10 kysymyksen LxP-työtyyliin, työohjauskerrokseen, lempikouluaineisiin ja kiinnostukseen. Ei vaikuta työnantajan LxP-hakuun (lxp.yoro.fi).</p>`;

    bindPathToggles();

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
        tyoohjaus: {},
        subjects: new Set(),
        interest: {},
        interestIndex: 0,
      });
      render();
    };
  }
}

document.addEventListener('DOMContentLoaded', () => render());
