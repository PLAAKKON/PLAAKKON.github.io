const { chunkLargeJsonFile } = require('../lib/data-chunking.ts');

async function main() {
  try {
    console.log('Aloitetaan datan chunkkaus...');
    await chunkLargeJsonFile('profiilit_anonymized.json', 5000);
    console.log('Chunkkaus valmis!');
  } catch (error) {
    console.error('Virhe chunkkauksessa:', error);
  }
}

main();
