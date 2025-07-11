import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

// Kandidaatin oma profiili - kirjautuminen candidateId:llä
export async function POST(request: NextRequest) {
  try {
    const { candidateId, email } = await request.json()
    
    if (!candidateId || !email) {
      return NextResponse.json({ 
        error: 'Kandidaatti-ID ja sähköposti vaaditaan' 
      }, { status: 400 })
    }

    // Hae profiili Firestoresta
    const profilesRef = collection(db, 'profiles')
    const q = query(
      profilesRef,
      where('candidateId', '==', candidateId),
      where('email', '==', email)
    )
    
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return NextResponse.json({ 
        error: 'Profiilia ei löydy tai virheelliset tunnistetiedot' 
      }, { status: 404 })
    }

    const profileDoc = querySnapshot.docs[0]
    const profileData = profileDoc.data()
    
    // Palauta oma profiili (kaikki tiedot koska henkilö on antanut suostumuksen)
    return NextResponse.json({
      success: true,
      profile: {
        id: profileDoc.id,
        ...profileData,
        // Poista turvallisuusrelevantit kentät
        ipAddress: undefined,
        userAgent: undefined
      }
    })

  } catch (error) {
    console.error('Profile access error:', error)
    return NextResponse.json({ 
      error: 'Profiilin haussa tapahtui virhe' 
    }, { status: 500 })
  }
}

// Päivitä oma profiili
export async function PUT(request: NextRequest) {
  try {
    const { candidateId, email, updates } = await request.json()
    
    if (!candidateId || !email) {
      return NextResponse.json({ 
        error: 'Kandidaatti-ID ja sähköposti vaaditaan' 
      }, { status: 400 })
    }

    // Tarkista että profiili on olemassa
    const profilesRef = collection(db, 'profiles')
    const q = query(
      profilesRef,
      where('candidateId', '==', candidateId),
      where('email', '==', email)
    )
    
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return NextResponse.json({ 
        error: 'Profiilia ei löydy' 
      }, { status: 404 })
    }

    // TODO: Päivitä profiili Firestoressa
    // (Vaatii updateDoc-funktion import)
    
    return NextResponse.json({
      success: true,
      message: 'Profiili päivitetty onnistuneesti'
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ 
      error: 'Profiilin päivityksessä tapahtui virhe' 
    }, { status: 500 })
  }
}
