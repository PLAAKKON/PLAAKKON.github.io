// Vercel Postgres -konfiguraatio
import { sql } from '@vercel/postgres'

// Luo taulut ensimmäisellä kerralla
export async function createProfilesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        search_text TEXT, -- Hakuindeksi
        tags TEXT[], -- Tagit hakua varten
        status VARCHAR(50) DEFAULT 'active'
      )
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_profiles_search 
      ON profiles USING GIN(search_text gin_trgm_ops)
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_profiles_tags 
      ON profiles USING GIN(tags)
    `
    
    console.log('Taulut luotu onnistuneesti')
  } catch (error) {
    console.error('Taulun luonti epäonnistui:', error)
  }
}

// Siirrä olemassa oleva data tietokantaan
export async function migrateExistingData() {
  try {
    const fs = require('fs')
    const path = require('path')
    
    // Lue olemassa oleva anonymisoitu data
    const dataPath = path.join(process.cwd(), 'private/data/profiilit_anonymized.json')
    const rawData = fs.readFileSync(dataPath, 'utf8')
    const profiles = JSON.parse(rawData)
    
    console.log(`Siirretään ${profiles.length} profiilia tietokantaan...`)
    
    // Siirrä erissä (1000 kerrallaan)
    const batchSize = 1000
    for (let i = 0; i < profiles.length; i += batchSize) {
      const batch = profiles.slice(i, i + batchSize)
      
      for (const profile of batch) {
        const searchText = JSON.stringify(profile).toLowerCase()
        const tags = extractTags(profile)
        
        await sql`
          INSERT INTO profiles (data, search_text, tags)
          VALUES (${JSON.stringify(profile)}, ${searchText}, ${tags})
        `
      }
      
      console.log(`Siirretty ${Math.min(i + batchSize, profiles.length)} / ${profiles.length}`)
    }
    
    console.log('Migraatio valmis!')
  } catch (error) {
    console.error('Migraatio epäonnistui:', error)
  }
}

// Pura tagit profiilista hakua varten
function extractTags(profile: any): string[] {
  const tags = []
  
  // Lisää relevantit kentät tageiksi
  if (profile.skills) tags.push(...profile.skills)
  if (profile.location) tags.push(profile.location)
  if (profile.experience) tags.push(profile.experience)
  if (profile.education) tags.push(profile.education)
  if (profile.industry) tags.push(profile.industry)
  
  return tags.filter(tag => tag && typeof tag === 'string')
}

// Hae profiileita tietokannasta
export async function searchProfilesFromDB(
  searchTerm: string = '',
  filters: any = {},
  limit: number = 50,
  offset: number = 0
) {
  try {
    let query = `
      SELECT id, data, created_at, updated_at
      FROM profiles
      WHERE status = 'active'
    `
    
    const params = []
    let paramIndex = 1
    
    // Tekstihaku
    if (searchTerm) {
      query += ` AND search_text ILIKE $${paramIndex}`
      params.push(`%${searchTerm.toLowerCase()}%`)
      paramIndex++
    }
    
    // Tagit
    if (filters.tags && filters.tags.length > 0) {
      query += ` AND tags && $${paramIndex}`
      params.push(filters.tags)
      paramIndex++
    }
    
    // Järjestys ja paginointi
    query += ` ORDER BY updated_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)
    
    const result = await sql.query(query, params)
    return result.rows
  } catch (error) {
    console.error('Tietokantahaku epäonnistui:', error)
    return []
  }
}

// Lisää uusi profiili
export async function addNewProfile(profileData: any) {
  try {
    const searchText = JSON.stringify(profileData).toLowerCase()
    const tags = extractTags(profileData)
    
    const result = await sql`
      INSERT INTO profiles (data, search_text, tags)
      VALUES (${JSON.stringify(profileData)}, ${searchText}, ${tags})
      RETURNING id
    `
    
    return result.rows[0].id
  } catch (error) {
    console.error('Profiilin lisääminen epäonnistui:', error)
    throw error
  }
}
