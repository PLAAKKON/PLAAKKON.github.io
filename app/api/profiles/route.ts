import { NextRequest, NextResponse } from 'next/server'
import { searchAllProfiles, searchAllProfilesParallel, getProfilesByFilters } from '@/lib/data-chunking'
import { validateYoroToken, checkRateLimit } from '@/lib/yoro-auth'

// Suojattu profiilidata API - käyttää chunk-systeemiä
export async function POST(request: NextRequest) {
  try {
    // Autentikaatio
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '') || 
                     request.cookies.get('yoro-auth')?.value

    if (!authToken) {
      return NextResponse.json({ error: 'Kirjautuminen vaaditaan' }, { status: 401 })
    }

    // TODO: Aktivoi kun Yoro.fi API on valmis
    // const user = await validateYoroToken(authToken)
    // if (!user) {
    //   return NextResponse.json({ error: 'Virheellinen token' }, { status: 403 })
    // }

    // Rate limiting
    const userId = 'temp-user' // TODO: Käytä oikeaa user.id
    if (!checkRateLimit(userId, 200)) {
      return NextResponse.json({ error: 'Liikaa pyyntöjä' }, { status: 429 })
    }

    const body = await request.json()
    const { 
      filters = {},
      page = 1,
      limit = 50,
      searchTerm = '',
      useParallelSearch = false
    } = body

    // Maksimi 200 tulosta per pyyntö
    const maxLimit = Math.min(limit, 200)
    
    let profiles = []
    
    // Valitse hakustrategia
    if (searchTerm) {
      // Hakutermillä - käy läpi kaikki chunkit
      if (useParallelSearch) {
        profiles = await searchAllProfilesParallel(searchTerm, filters, maxLimit * 2)
      } else {
        profiles = await searchAllProfiles(searchTerm, filters, maxLimit * 2)
      }
    } else {
      // Ilman hakutermiä - optimoitu haku
      profiles = await getProfilesByFilters(filters, maxLimit * 2)
    }

    // Paginointi
    const startIndex = (page - 1) * maxLimit
    const endIndex = startIndex + maxLimit
    const paginatedProfiles = profiles.slice(startIndex, endIndex)

    // Poista arkaluontoisia kenttiä vaikka data on anonymisoitu
    const sanitizedProfiles = paginatedProfiles.map((profile: any) => ({
      ...profile,
      // Poista mahdolliset tunnisteet
      id: undefined,
      email: undefined,
      phone: undefined,
      exactLocation: undefined
    }))

    return NextResponse.json({
      profiles: sanitizedProfiles,
      totalCount: profiles.length,
      page,
      hasMore: endIndex < profiles.length
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Palvelinvirhe' },
      { status: 500 }
    )
  }
}

// Estä GET-pyynnöt
export async function GET() {
  return NextResponse.json(
    { error: 'Käytä POST-pyyntöjä' },
    { status: 405 }
  )
}
