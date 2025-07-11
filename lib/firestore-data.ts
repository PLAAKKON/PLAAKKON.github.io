// Firestore-pohjainen data-hallinta (korvaa file-pohjaisen)
import { db } from './firebase'
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  limit, 
  orderBy,
  startAfter,
  DocumentSnapshot,
  QueryConstraint 
} from 'firebase/firestore'

// Firestore-kokoelmat
const PROFILES_COLLECTION = 'profiles'
const APPLICATIONS_COLLECTION = 'applications'

// Lisää profiili Firestoreen (sama kuin aiemmissa projekteissa)
export async function saveProfileToFirestore(profileData: any) {
  try {
    const docRef = await addDoc(collection(db, PROFILES_COLLECTION), {
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    })
    
    console.log('Profiili tallennettu ID:', docRef.id)
    return { id: docRef.id, ...profileData }
  } catch (error) {
    console.error('Virhe tallennettaessa profiilia:', error)
    throw error
  }
}

// Hae profiileja Firestoresta (tehokas haku)
export async function searchProfilesFromFirestore(
  searchTerm: string = '',
  filters: any = {},
  pageSize: number = 50,
  lastDoc?: DocumentSnapshot
) {
  try {
    const profilesRef = collection(db, PROFILES_COLLECTION)
    const queryConstraints: QueryConstraint[] = []
    
    // Lisää suodattimet
    if (filters.location) {
      queryConstraints.push(where('location', '==', filters.location))
    }
    if (filters.skills) {
      queryConstraints.push(where('skills', 'array-contains-any', filters.skills))
    }
    if (filters.experience) {
      queryConstraints.push(where('experienceYears', '>=', filters.experience))
    }
    
    // Järjestys ja paginointi
    queryConstraints.push(orderBy('createdAt', 'desc'))
    queryConstraints.push(limit(pageSize))
    
    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc))
    }
    
    const q = query(profilesRef, ...queryConstraints)
    const querySnapshot = await getDocs(q)
    
    const profiles = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      
      // Tekstihaku client-puolella (Firestore ei tue full-text search)
      if (searchTerm) {
        const profileText = JSON.stringify(data).toLowerCase()
        if (!profileText.includes(searchTerm.toLowerCase())) {
          return // Ohita tämä profiili
        }
      }
      
      profiles.push({
        id: doc.id,
        ...data
      })
    })
    
    return {
      profiles,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: querySnapshot.docs.length === pageSize
    }
  } catch (error) {
    console.error('Virhe haettaessa profiileja:', error)
    throw error
  }
}

// Lisää uusi työhakemus Firestoreen
export async function saveApplicationToFirestore(applicationData: any) {
  try {
    const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
      ...applicationData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      processedAt: null,
      isAnonymized: false
    })
    
    console.log('Hakemus tallennettu ID:', docRef.id)
    return { id: docRef.id, ...applicationData }
  } catch (error) {
    console.error('Virhe tallennettaessa hakemusta:', error)
    throw error
  }
}

// Hae hakemuksia käsittelyä varten
export async function getPendingApplications(limitCount: number = 10) {
  try {
    const applicationsRef = collection(db, APPLICATIONS_COLLECTION)
    const q = query(
      applicationsRef,
      where('status', '==', 'pending'),
      orderBy('submittedAt', 'asc'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const applications = []
    
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    return applications
  } catch (error) {
    console.error('Virhe haettaessa hakemuksia:', error)
    throw error
  }
}

// Siirrä käsitelty hakemus profiileihin
export async function moveApplicationToProfiles(applicationId: string, anonymizedData: any) {
  try {
    // Tallenna anonymisoitu profiili
    const profileRef = await addDoc(collection(db, PROFILES_COLLECTION), {
      ...anonymizedData,
      originalApplicationId: applicationId,
      processedAt: new Date().toISOString(),
      isAnonymized: true,
      source: 'application'
    })
    
    // Päivitä alkuperäinen hakemus
    // (Tämä vaatii admin-oikeudet, toteutetaan erillisessä Cloud Function:ssa)
    
    return { profileId: profileRef.id, applicationId }
  } catch (error) {
    console.error('Virhe siirtäessä hakemusta:', error)
    throw error
  }
}

// Hae tilastoja
export async function getFirestoreStats() {
  try {
    const profilesSnapshot = await getDocs(collection(db, PROFILES_COLLECTION))
    const applicationsSnapshot = await getDocs(collection(db, APPLICATIONS_COLLECTION))
    
    return {
      totalProfiles: profilesSnapshot.size,
      totalApplications: applicationsSnapshot.size,
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error('Virhe haettaessa tilastoja:', error)
    throw error
  }
}
