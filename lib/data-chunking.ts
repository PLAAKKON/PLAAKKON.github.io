import fs from 'fs'
import path from 'path'

// Jaa iso JSON-tiedosto pienempiin osiin
export async function chunkLargeJsonFile(
  inputFile: string,
  chunkSize: number = 10000
) {
  const dataPath = path.join(process.cwd(), 'private/data', inputFile)
  const outputDir = path.join(process.cwd(), 'private/data/chunks')
  
  // Luo chunks-kansio
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  console.log('Ladataan dataa...')
  const rawData = fs.readFileSync(dataPath, 'utf8')
  const profiles = JSON.parse(rawData)
  
  console.log(`Yhteensä ${profiles.length} profiilia`)
  
  // Jaa osiin
  const chunks = []
  for (let i = 0; i < profiles.length; i += chunkSize) {
    const chunk = profiles.slice(i, i + chunkSize)
    const chunkIndex = Math.floor(i / chunkSize)
    
    const chunkFile = `profiles_chunk_${chunkIndex}.json`
    const chunkPath = path.join(outputDir, chunkFile)
    
    fs.writeFileSync(chunkPath, JSON.stringify(chunk, null, 2))
    
    chunks.push({
      file: chunkFile,
      startIndex: i,
      endIndex: Math.min(i + chunkSize - 1, profiles.length - 1),
      count: chunk.length
    })
    
    console.log(`Chunk ${chunkIndex}: ${chunk.length} profiilia`)
  }
  
  // Luo hakemisto-tiedosto
  const indexFile = path.join(outputDir, 'index.json')
  fs.writeFileSync(indexFile, JSON.stringify({
    totalProfiles: profiles.length,
    chunkSize,
    chunks,
    createdAt: new Date().toISOString()
  }, null, 2))
  
  console.log(`Luotiin ${chunks.length} osaa`)
  return chunks
}

// Hae profiileita tehokkaasti
export async function getProfilesChunk(
  chunkIndex: number,
  filters: any = {},
  searchTerm: string = ''
) {
  const chunkPath = path.join(process.cwd(), 'private/data/chunks', `profiles_chunk_${chunkIndex}.json`)
  
  if (!fs.existsSync(chunkPath)) {
    throw new Error(`Chunk ${chunkIndex} ei löydy`)
  }
  
  const rawData = fs.readFileSync(chunkPath, 'utf8')
  let profiles = JSON.parse(rawData)
  
  // Suodata
  if (searchTerm) {
    profiles = profiles.filter((profile: any) => 
      JSON.stringify(profile).toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  // Lisäsuodattimet
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      profiles = profiles.filter((profile: any) => profile[key] === value)
    }
  })
  
  return profiles
}

// Etsi profiileja kaikista chunkeista
export async function searchAllProfiles(
  searchTerm: string = '',
  filters: any = {},
  limit: number = 50
) {
  const indexPath = path.join(process.cwd(), 'private/data/chunks/index.json')
  
  if (!fs.existsSync(indexPath)) {
    throw new Error('Chunks-hakemisto puuttuu. Aja ensin chunkLargeJsonFile()')
  }
  
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))
  const allResults = []
  
  // Käy läpi KAIKKI chunkit - sopivia kandidaatteja voi olla missä tahansa
  for (let i = 0; i < index.chunks.length; i++) {
    try {
      const chunkResults = await getProfilesChunk(
        i,
        filters,
        searchTerm
      )
      
      allResults.push(...chunkResults)
      
      // Näytä edistyminen
      if (chunkResults.length > 0) {
        console.log(`Chunk ${i}: löytyi ${chunkResults.length} osumaa`)
      }
    } catch (error) {
      console.warn(`Varoitus: Chunk ${i} ei latautunut:`, error)
    }
  }
  
  // Järjestä tulokset relevanssin mukaan (jos hakutermi on annettu)
  if (searchTerm) {
    allResults.sort((a, b) => {
      const aRelevance = calculateRelevance(a, searchTerm)
      const bRelevance = calculateRelevance(b, searchTerm)
      return bRelevance - aRelevance
    })
  }
  
  // Palauta rajattu määrä tuloksia
  return allResults.slice(0, limit)
}

// Laske hakutermin relevanssi profiiliin
function calculateRelevance(profile: any, searchTerm: string): number {
  const lowerSearchTerm = searchTerm.toLowerCase()
  const profileText = JSON.stringify(profile).toLowerCase()
  
  let score = 0
  
  // Exact match korkeampi pisteet
  if (profileText.includes(lowerSearchTerm)) {
    score += 10
  }
  
  // Yksittäiset sanat
  const searchWords = lowerSearchTerm.split(' ')
  searchWords.forEach(word => {
    if (profileText.includes(word)) {
      score += 1
    }
  })
  
  return score
}

// Rinnakkainen haku suurille hauille (nopeampi)
export async function searchAllProfilesParallel(
  searchTerm: string = '',
  filters: any = {},
  limit: number = 50
) {
  const indexPath = path.join(process.cwd(), 'private/data/chunks/index.json')
  
  if (!fs.existsSync(indexPath)) {
    throw new Error('Chunks-hakemisto puuttuu. Aja ensin chunkLargeJsonFile()')
  }
  
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))
  
  // Hae kaikista chunkeista rinnakkain
  const chunkPromises = []
  for (let i = 0; i < index.chunks.length; i++) {
    chunkPromises.push(
      getProfilesChunk(i, filters, searchTerm).catch(error => {
        console.warn(`Chunk ${i} virhe:`, error)
        return [] // Palauta tyhjä array virhetilanteessa
      })
    )
  }
  
  const allChunkResults = await Promise.all(chunkPromises)
  const allResults = allChunkResults.flat()
  
  console.log(`Haettiin ${index.chunks.length} chunkista, löytyi ${allResults.length} osumaa`)
  
  // Järjestä relevanssin mukaan
  if (searchTerm) {
    allResults.sort((a, b) => {
      const aRelevance = calculateRelevance(a, searchTerm)
      const bRelevance = calculateRelevance(b, searchTerm)
      return bRelevance - aRelevance
    })
  }
  
  return allResults.slice(0, limit)
}

// Hae profiileja tiettyjen kriteerien perusteella (ei hakutermiä)
export async function getProfilesByFilters(
  filters: any = {},
  limit: number = 100
) {
  const indexPath = path.join(process.cwd(), 'private/data/chunks/index.json')
  
  if (!fs.existsSync(indexPath)) {
    throw new Error('Chunks-hakemisto puuttuu. Aja ensin chunkLargeJsonFile()')
  }
  
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))
  const results = []
  
  // Optimointi: Jos ei ole filttereitä, hae vain ensimmäisistä chunkeista
  if (Object.keys(filters).length === 0) {
    const chunksToCheck = Math.min(3, index.chunks.length)
    for (let i = 0; i < chunksToCheck; i++) {
      const chunkResults = await getProfilesChunk(i, {}, '')
      results.push(...chunkResults.slice(0, limit - results.length))
      if (results.length >= limit) break
    }
  } else {
    // Filttereiden kanssa käy läpi kaikki chunkit
    for (let i = 0; i < index.chunks.length; i++) {
      const chunkResults = await getProfilesChunk(i, filters, '')
      results.push(...chunkResults)
      if (results.length >= limit) break
    }
  }
  
  return results.slice(0, limit)
}
