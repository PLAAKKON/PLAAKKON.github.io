const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Korjataan kaikki rikkinäiset merkit
const fixes = [
  // Emojit
  ['­ƒæñ', '👤'],
  ['­ƒöÁ', '🔍'],
  ['­ƒöÉ', '🔑'],
  ['­ƒÅó', '🏢'],
  ['­ƒÄô', '👨‍🏫'],
  ['­ƒôä', '📄'],
  ['­ƒñû', '🤖'],
  ['­ƒö¼', '⚙️'],
  ['­ƒÄ»', '📋'],
  ['­ƒôº', '📧'],
  ['­ƒÆ╝', '💰'],
  ['­ƒåò', '⚡'],
  ['­ƒôè', '⚡'],
  ['­ƒÅ½', '🏛️'],
  ['­ƒôï', '📊'],
  ['­ƒô¼', '📞'],
  ['´┐¢', '🚀'],
  ['Ô£à', '✅'],
  ['Ôé¼', '€'],
  ['Ôëê', '→'],
  ['┬®', '©'],
  ['ÔÇô', '–'],
  
  // Ääkköset ja tekstit
  ['k├ñytt├ñj├ñryhmitt├ñin', 'käyttäjäryhmittäin'],
  ['Ty├Ânhakijat', 'Työnhakijat'],
  ['teko├ñlyll├ñ', 'tekoälyllä'],
  ['ty├Âpaikkavertailu', 'työpaikkavertailu'],
  ['Ty├Ânantajat', 'Työnantajat'],
  ['ty├Âpaikkailmoitusten', 'työpaikkailmoitusten'],
  ['henkil├Âprofiilin', 'henkilöprofiilin'],
  ['teko├ñly', 'tekoäly'],
  ['Massaty├Âst├Â', 'Massatyöstö'],
  ['henkil├Â├ñ', 'henkilöä'],
  ['Pyyd├ñ', 'Pyydä'],
  ['Teko├ñlyintegraatiot', 'Tekoälyintegraatiot'],
  ['datam├ñ├ñrille', 'datamäärille'],
  ['yhteytt├ñ', 'yhteyttä'],
  ['k├ñyt├Âss├ñ', 'käytössä'],
  ['testin├ñ', 'testinä'],
  ['koek├ñytt├Â├ñ', 'koekäyttöä'],
  ['esittely├ñ', 'esittelyä'],
  ['koululisenssi├ñ', 'koululisenssiä'],
  ['yksikk├Â', 'yksikkö'],
  ['yrityslisenssi├ñ', 'yrityslisenssiä'],
  ['AI-ty├Âkalut', 'AI-työkalut'],
  ['ty├Âel├ñm├ñpalvelut', 'työelämäpalvelut'],
  ['Yrit├ñ', 'Yritä'],
  ['sis├ñ├ñn', 'sisään'],
  ['p├ñ├ñttyi', 'päättyi'],
  ['└üåô', '€'],
  ['├ñ', 'ä'],
  ['├Â', 'ö'],
  ['├ü', 'ü'],
  ['├í', 'é'],
  ['├á', 'à']
];

// Sovella kaikki korjaukset
fixes.forEach(([wrong, correct]) => {
  content = content.replaceAll(wrong, correct);
});

fs.writeFileSync('index.html', content, 'utf8');
console.log('✅ Encoding-ongelmat korjattu!');
