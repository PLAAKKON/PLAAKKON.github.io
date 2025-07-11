import { NextRequest, NextResponse } from 'next/server'
import { validateYoroToken, hasProfileAccess } from '@/lib/yoro-auth'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Luo uusi profiili
export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!authToken) {
      return NextResponse.json({ error: 'Kirjautuminen vaaditaan' }, { status: 401 })
    }

    // TODO: Aktivoi kun Yoro.fi API on valmis
    // const user = await validateYoroToken(authToken)
    // if (!user || !hasProfileAccess(user)) {
    //   return NextResponse.json({ error: 'Ei käyttöoikeuksia' }, { status: 403 })
    // }

    const profileData = await request.json()
    
    // Validoi profiilidata
    const requiredFields = ['name', 'skills', 'location']
    const missingFields = requiredFields.filter(field => !profileData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        error: `Puuttuvat kentät: ${missingFields.join(', ')}`
      }, { status: 400 })
    }

    // Anonymisoi arkaluontoiset tiedot
    const anonymizedProfile = {
      ...profileData,
      id: generateUniqueId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Poista arkaluontoiset tiedot
      email: undefined,
      phone: undefined,
      personalId: undefined,
      exactAddress: undefined,
      // Anonymisoi sijainti
      location: anonymizeLocation(profileData.location),
      // Lisää anonymisointitunniste
      isAnonymized: true
    }

    // Tallenna profiili
    await saveNewProfile(anonymizedProfile)

    return NextResponse.json({
      message: 'Profiili luotu onnistuneesti',
      profileId: anonymizedProfile.id
    })

  } catch (error) {
    console.error('Profile creation error:', error)
    return NextResponse.json({ error: 'Palvelinvirhe' }, { status: 500 })
  }
}

// Päivitä olemassa oleva profiili
export async function PUT(request: NextRequest) {
  try {
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!authToken) {
      return NextResponse.json({ error: 'Kirjautuminen vaaditaan' }, { status: 401 })
    }

    // TODO: Aktivoi kun Yoro.fi API on valmis
    // const user = await validateYoroToken(authToken)
    // if (!user) {
    //   return NextResponse.json({ error: 'Virheellinen token' }, { status: 403 })
    // }

    const { profileId, ...updateData } = await request.json()
    
    if (!profileId) {
      return NextResponse.json({ error: 'Profiili ID vaaditaan' }, { status: 400 })
    }

    // Tarkista että käyttäjä voi muokata profiilia
    // TODO: Tarkista että user omistaa profiilin tai on admin
    
    const updatedProfile = await updateProfile(profileId, updateData)
    
    if (!updatedProfile) {
      return NextResponse.json({ error: 'Profiilia ei löydy' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Profiili päivitetty onnistuneesti',
      profile: updatedProfile
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Palvelinvirhe' }, { status: 500 })
  }
}

// Apufunktiot
function generateUniqueId(): string {
  return `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function anonymizeLocation(location: string): string {
  // Muuta tarkat osoitteet yleisemmiksi
  const parts = location.split(',')
  if (parts.length > 1) {
    // Säilytä vain kaupunki ja maakunta
    return parts.slice(-2).join(',').trim()
  }
  return location
}

async function saveNewProfile(profile: any): Promise<void> {
  // Tallenna uusi profiili seuraavaan saatavilla olevaan chunk-tiedostoon
  // tai luo uusi chunk jos tarpeellista
  
  const chunksDir = join(process.cwd(), 'private/data/chunks')
  const indexPath = join(chunksDir, 'index.json')
  
  // Lue nykyinen hakemisto
  const index = JSON.parse(readFileSync(indexPath, 'utf8'))
  
  // Etsi chunk jossa on tilaa
  const maxChunkSize = 10000
  let targetChunkIndex = -1
  
  for (let i = 0; i < index.chunks.length; i++) {
    if (index.chunks[i].count < maxChunkSize) {
      targetChunkIndex = i
      break
    }
  }
  
  // Jos ei löydy tilaa, luo uusi chunk
  if (targetChunkIndex === -1) {
    targetChunkIndex = index.chunks.length
    index.chunks.push({
      file: `profiles_chunk_${targetChunkIndex}.json`,
      startIndex: index.totalProfiles,
      endIndex: index.totalProfiles,
      count: 0
    })
  }
  
  // Lue target chunk
  const chunkPath = join(chunksDir, `profiles_chunk_${targetChunkIndex}.json`)
  const chunkData = readFileSync(chunkPath, 'utf8')
  const profiles = JSON.parse(chunkData)
  
  // Lisää uusi profiili
  profiles.push(profile)
  
  // Tallenna takaisin
  writeFileSync(chunkPath, JSON.stringify(profiles, null, 2))
  
  // Päivitä hakemisto
  index.chunks[targetChunkIndex].count = profiles.length
  index.chunks[targetChunkIndex].endIndex = index.totalProfiles
  index.totalProfiles++
  
  writeFileSync(indexPath, JSON.stringify(index, null, 2))
}

async function updateProfile(profileId: string, updateData: any): Promise<any | null> {
  // Etsi profiili kaikista chunkeista ja päivitä se
  const chunksDir = join(process.cwd(), 'private/data/chunks')
  const indexPath = join(chunksDir, 'index.json')
  const index = JSON.parse(readFileSync(indexPath, 'utf8'))
  
  for (const chunk of index.chunks) {
    const chunkPath = join(chunksDir, chunk.file)
    const chunkData = readFileSync(chunkPath, 'utf8')
    const profiles = JSON.parse(chunkData)
    
    const profileIndex = profiles.findIndex((p: any) => p.id === profileId)
    if (profileIndex !== -1) {
      // Päivitä profiili
      profiles[profileIndex] = {
        ...profiles[profileIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      }
      
      // Tallenna takaisin
      writeFileSync(chunkPath, JSON.stringify(profiles, null, 2))
      return profiles[profileIndex]
    }
  }
  
  return null
}
