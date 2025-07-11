const fs = require('fs');
const path = require('path');

// Jaa iso JSON-tiedosto pienempiin osiin
async function chunkLargeJsonFile(inputFile, chunkSize = 5000) {
  const dataPath = path.join(process.cwd(), 'private/data', inputFile);
  const outputDir = path.join(process.cwd(), 'private/data/chunks');
  
  // Luo chunks-kansio
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Ladataan dataa...');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const profiles = JSON.parse(rawData);
  
  console.log(`Yhteensä ${profiles.length} profiilia`);
  
  // Jaa osiin
  const chunks = [];
  for (let i = 0; i < profiles.length; i += chunkSize) {
    const chunk = profiles.slice(i, i + chunkSize);
    const chunkIndex = Math.floor(i / chunkSize);
    
    const chunkFile = `profiles_chunk_${chunkIndex}.json`;
    const chunkPath = path.join(outputDir, chunkFile);
    
    fs.writeFileSync(chunkPath, JSON.stringify(chunk, null, 2));
    
    chunks.push({
      file: chunkFile,
      startIndex: i,
      endIndex: Math.min(i + chunkSize - 1, profiles.length - 1),
      count: chunk.length
    });
    
    console.log(`Chunk ${chunkIndex}: ${chunk.length} profiilia`);
  }
  
  // Luo hakemisto-tiedosto
  const indexFile = path.join(outputDir, 'index.json');
  fs.writeFileSync(indexFile, JSON.stringify({
    totalProfiles: profiles.length,
    chunkSize,
    chunks,
    createdAt: new Date().toISOString()
  }, null, 2));
  
  console.log(`Luotiin ${chunks.length} osaa`);
  return chunks;
}

// Aja chunkkaus
chunkLargeJsonFile('profiilit_anonymized.json').then(() => {
  console.log('Chunkkaus valmis!');
}).catch(error => {
  console.error('Virhe chunkkauksessa:', error);
});
