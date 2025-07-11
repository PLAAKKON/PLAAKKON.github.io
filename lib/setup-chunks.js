const { chunkLargeJsonFile } = require('./data-chunking.ts')

async function setupChunks() {
  console.log('🚀 Alustetaan 75MB datan chunkkaus...')
  
  try {
    const chunks = await chunkLargeJsonFile('profiilit_anonymized.json', 8000)
    console.log(`✅ Luotiin ${chunks.length} chunkkia`)
    console.log('🔒 Isot datatiedostot eivät mene GitHubiin')
    console.log('📦 Chunkit mahdollistavat tehokkaan haun')
  } catch (error) {
    console.error('❌ Virhe chunkkien luomisessa:', error)
  }
}

async function rebuildChunks() {
  console.log('🔄 Rakennetaan chunkit uudelleen...')
  
  // Poista vanhat chunkit
  const fs = require('fs')
  const path = require('path')
  const chunksDir = path.join(process.cwd(), 'public/data/chunks')
  
  if (fs.existsSync(chunksDir)) {
    fs.rmSync(chunksDir, { recursive: true })
  }
  
  await setupChunks()
}

module.exports = { setupChunks, rebuildChunks }
