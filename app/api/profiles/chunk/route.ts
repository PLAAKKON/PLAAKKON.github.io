import { NextRequest, NextResponse } from 'next/server'
import { searchAllProfilesParallel } from '@/lib/data-chunking'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Hae parametrit
    const searchTerm = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '50')
    
    // Rakenna suodattimet kaikista parametreista
    const filters: any = {}
    
    // Kaikki hakuparametrit
    const filterParams = [
      'esittely', 'työnhakualue', 'aloitusajankohta', 'ammatit', 'osaamiset',
      'työtoiveet', 'koulutus', 'työkokemus', 'muu_kokemus', 'osaamisteksti',
      'kielitaito', 'ajokortit', 'ajotiedot', 'lupatiedot', 'some', 'esittely_10sanaa'
    ]
    
    filterParams.forEach(param => {
      const value = searchParams.get(param)
      if (value) {
        // Tarkista onko monivalinta (pilkulla eroteltu)
        if (value.includes(',')) {
          filters[param] = value.split(',').map(v => v.trim()).filter(v => v)
        } else {
          filters[param] = value
        }
      }
    })
    
    console.log('Haku parametrit:', { searchTerm, filters, limit })
    
    // Hae profiilit
    const profiles = await searchAllProfilesParallel(searchTerm, filters, limit)
    
    return NextResponse.json({
      profiles,
      total: profiles.length,
      searchTerm,
      filters
    })
    
  } catch (error) {
    console.error('Virhe profiilien haussa:', error)
    return NextResponse.json(
      { error: 'Virhe profiilien haussa: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

// POST-metodi yhteensopivuuden vuoksi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      filters = {},
      limit = 50,
      searchTerm = ''
    } = body

    console.log('POST haku parametrit:', { searchTerm, filters, limit })
    
    // Hae profiilit
    const profiles = await searchAllProfilesParallel(searchTerm, filters, limit)
    
    return NextResponse.json({
      profiles,
      total: profiles.length,
      searchTerm,
      filters
    })
    
  } catch (error) {
    console.error('Virhe profiilien haussa:', error)
    return NextResponse.json(
      { error: 'Virhe profiilien haussa: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
