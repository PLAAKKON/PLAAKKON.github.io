import { 
  collection, 
  query, 
  where, 
  limit, 
  getDocs, 
  orderBy,
  startAfter,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from './firebase';

export interface Profile {
  id: string;
  sequentialId?: number;
  esittely?: string;
  tyonhakualue?: string[];
  ammatit?: string[];
  osaamiset?: string[];
  työtoiveet?: string[];
  tyotoiveet?: string[]; // Firebase variant without ö
  koulutus?: string[];
  työkokemus?: string[];
  muu_kokemus?: string[];
  osaamisteksti?: string;
  kielitaito?: string[];
  ajokortit?: string[];
  ajotiedot?: string[];
  lupatiedot?: string[];
  some?: string[];
  puhelin?: string;
  esittely_10sanaa?: string;
  sähköposti?: string;
  aloitusajankohta?: string;
  [key: string]: any;
}

export interface SearchCriteria {
  esittely?: string;
  tyonhakualue?: string[];
  ammatit?: string[];
  osaamiset?: string[];
  työtoiveet?: string[];
  koulutus?: string[];
  työkokemus?: string[];
  muu_kokemus?: string[];
  osaamisteksti?: string;
  kielitaito?: string[];
  ajokortit?: string[];
  ajotiedot?: string[];
  lupatiedot?: string[];
  some?: string[];
  puhelin?: string;
  esittely_10sanaa?: string;
  sähköposti?: string;
  aloitusajankohta?: string;
  esittelyVapaahaku?: string;
  muuKokemusVapaahaku?: string;
  osaamistekstiVapaahaku?: string;
  maakunta?: string;
  kaupunki?: string;
  limit?: number;
  isDemoUser?: boolean;
}

export async function searchProfilesClient(criteria: SearchCriteria = {}): Promise<{
  profiles: Profile[];
  total: number;
}> {
  try {
    console.log('Searching profiles with criteria:', criteria);
    
    // Debug: Show exact search terms for ammatit
    if (criteria.ammatit && criteria.ammatit.length > 0) {
      console.log('Exact profession search terms:', criteria.ammatit);
    }
    
    // Firestore has strict limitations with array-contains-any queries
    // We can only use one array-contains-any filter per query
    // So we'll fetch all profiles and filter client-side
    const profilesRef = collection(db, 'profiles');
    
    // Fetch all profiles using pagination to overcome 10k limit
    let allProfiles: Profile[] = [];
    let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
    const batchSize = 10000;
    
    // Demo users are limited to 200 profiles max - this prevents large data fetches
    // Admin users can access more profiles (30000 default)
    const maxProfiles = criteria.limit !== undefined ? criteria.limit : 30000; // Use provided limit or default to 30k for admin users
    
    console.log(`Starting to fetch profiles in batches of ${batchSize}, max total: ${maxProfiles}...`);
    
    // Early exit if limit is very small (e.g., 0 or 1)
    if (maxProfiles <= 1) {
      console.log(`⚠️ Small limit requested: ${maxProfiles}. Returning early.`);
      return {
        profiles: [],
        total: 0
      };
    }
    
    while (allProfiles.length < maxProfiles) {
      let q;
      if (lastDoc) {
        q = query(profilesRef, orderBy('__name__'), startAfter(lastDoc), limit(batchSize));
      } else {
        q = query(profilesRef, orderBy('__name__'), limit(batchSize));
      }
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('No more documents to fetch');
        break;
      }
      
      const batchProfiles: Profile[] = [];
      querySnapshot.forEach((doc) => {
        const profileData = doc.data();
        const profile = {
          id: doc.id, // Pysyvä Firestore document ID 
          ...profileData
        } as Profile;
        
        // Normalize field names - if we have tyotoiveet but not työtoiveet, copy it over
        if (!profile.työtoiveet && profile.tyotoiveet) {
          profile.työtoiveet = profile.tyotoiveet;
        }
        
        batchProfiles.push(profile);
        lastDoc = doc;
      });
      
      allProfiles = allProfiles.concat(batchProfiles);
      console.log(`Fetched batch: ${batchProfiles.length} profiles. Total so far: ${allProfiles.length}`);
      
      // If we got fewer than batchSize, we've reached the end
      if (batchProfiles.length < batchSize) {
        console.log('Reached end of collection');
        break;
      }
    }
    
    console.log(`Total profiles fetched: ${allProfiles.length}`);
    
    // Debug: Check first few profile IDs to see if they're censored
    console.log('=== PROFILE ID DEBUG ===');
    allProfiles.slice(0, 5).forEach((profile, index) => {
      console.log(`Profile ${index + 1}:`, {
        id: profile.id,
        idType: typeof profile.id,
        idLength: profile.id ? profile.id.length : 'undefined',
        rawId: JSON.stringify(profile.id),
        esittely_10sanaa: profile.esittely_10sanaa
      });
    });
    console.log('=== END PROFILE ID DEBUG ===');
    
    // Debug: Check työtoiveet field names in first few profiles
    console.log('=== TYÖTOIVEET FIELD DEBUG ===');
    allProfiles.slice(0, 3).forEach((profile, index) => {
      console.log(`Profile ${index + 1} field check:`, {
        id: profile.id,
        hasWorkPreferencesWithO: 'työtoiveet' in profile,
        hasWorkPreferencesWithoutO: 'tyotoiveet' in profile,
        workPreferencesWithO: profile.työtoiveet,
        workPreferencesWithoutO: profile.tyotoiveet,
        allKeys: Object.keys(profile).filter(key => key.includes('toiveet')).sort()
      });
    });
    console.log('=== END TYÖTOIVEET FIELD DEBUG ===');
    
    let profiles = allProfiles;
    
    // Client-side filtering
    const filteredProfiles = profiles.filter((profile) => {
      // Exact match filters for specific fields
      if (criteria.puhelin && profile.puhelin !== criteria.puhelin) return false;
      if (criteria.esittely_10sanaa && profile.esittely_10sanaa !== criteria.esittely_10sanaa) return false;
      if (criteria.sähköposti && profile.sähköposti !== criteria.sähköposti) return false;
      
      // String partial match filters (case-insensitive)
      if (criteria.esittely) {
        const esittely = profile.esittely || '';
        const ammatit = (profile.ammatit || []) as string[];
        const osaamiset = (profile.osaamiset || []) as string[];
        const searchTerm = criteria.esittely.toLowerCase();
        
        // Search in esittely, ammatit, and osaamiset fields
        const foundInEsittely = esittely.toLowerCase().includes(searchTerm);
        const foundInAmmatit = ammatit.some(ammatti => 
          ammatti && ammatti.toLowerCase().includes(searchTerm)
        );
        const foundInOsaamiset = osaamiset.some(osaaminen => 
          osaaminen && osaaminen.toLowerCase().includes(searchTerm)
        );
        
        if (!foundInEsittely && !foundInAmmatit && !foundInOsaamiset) return false;
      }
      
      if (criteria.osaamisteksti) {
        const osaamisteksti = profile.osaamisteksti || '';
        if (!osaamisteksti.toLowerCase().includes(criteria.osaamisteksti.toLowerCase())) return false;
      }
      
      // Array filters - check if any of the criteria match any of the profile's values
      if (criteria.tyonhakualue && criteria.tyonhakualue.length > 0) {
        const profileAreas = (profile.tyonhakualue || []) as string[];
        const hasMatch = criteria.tyonhakualue.some(area => 
          profileAreas.some(profileArea => 
            profileArea.toLowerCase().includes(area.toLowerCase()) ||
            area.toLowerCase().includes(profileArea.toLowerCase())
          )
        );
        if (!hasMatch) return false;
      }
      
      if (criteria.ammatit && criteria.ammatit.length > 0) {
        const profileAmmatit = (profile.ammatit || []) as string[];
        const hasMatch = criteria.ammatit.some(ammatti => {
          // Try exact match first
          if (profileAmmatit.includes(ammatti)) {
            return true;
          }
          // If no exact match, try contains match (case-insensitive) in both directions
          return profileAmmatit.some(profileAmmatti => {
            if (!profileAmmatti || !ammatti) return false;
            const lowerAmmatti = ammatti.toLowerCase();
            const lowerProfileAmmatti = profileAmmatti.toLowerCase();
            // Check if either contains the other
            return lowerProfileAmmatti.includes(lowerAmmatti) || lowerAmmatti.includes(lowerProfileAmmatti);
          });
        });
        if (!hasMatch) return false;
      }
      
      if (criteria.osaamiset && criteria.osaamiset.length > 0) {
        const profileOsaamiset = (profile.osaamiset || []) as string[];
        const hasMatch = criteria.osaamiset.some(osaaminen => 
          profileOsaamiset.includes(osaaminen)
        );
        if (!hasMatch) return false;
      }
      
      if (criteria.työtoiveet && criteria.työtoiveet.length > 0) {
        // Handle both field name variants
        const profileToiveet = (profile.työtoiveet || profile.tyotoiveet || []) as string[];
        const hasMatch = criteria.työtoiveet.some(toive => 
          profileToiveet.includes(toive)
        );
        if (!hasMatch) return false;
      }
      
      if (criteria.koulutus && criteria.koulutus.length > 0) {
        const profileKoulutus = (profile.koulutus || []) as any[];
        // Koulutus might be nested arrays, so we need to check differently
        const hasMatch = criteria.koulutus.some(koulutusItem => {
          if (Array.isArray(profileKoulutus)) {
            return profileKoulutus.some(k => {
              if (Array.isArray(k)) {
                return k.some(kItem => typeof kItem === 'string' && kItem.includes(koulutusItem));
              }
              return typeof k === 'string' && k.includes(koulutusItem);
            });
          }
          return false;
        });
        if (!hasMatch) return false;
      }
      
      if (criteria.kielitaito && criteria.kielitaito.length > 0) {
        const profileKielitaito = (profile.kielitaito || []) as string[];
        const hasMatch = criteria.kielitaito.some(kieli => 
          profileKielitaito.includes(kieli)
        );
        if (!hasMatch) return false;
      }
      
      if (criteria.ajokortit && criteria.ajokortit.length > 0) {
        const profileAjokortit = (profile.ajokortit || []) as string[];
        const hasMatch = criteria.ajokortit.some(ajokortti => 
          profileAjokortit.includes(ajokortti)
        );
        if (!hasMatch) return false;
      }
      
      if (criteria.lupatiedot && criteria.lupatiedot.length > 0) {
        const profileLupatiedot = (profile.lupatiedot || []) as string[];
        const hasMatch = criteria.lupatiedot.some(lupa => 
          profileLupatiedot.includes(lupa)
        );
        if (!hasMatch) return false;
      }
      
      if (criteria.työkokemus && criteria.työkokemus.length > 0) {
        const profileTyokokemus = (profile.työkokemus || []) as any[];
        const hasMatch = criteria.työkokemus.some(kokemusItem => {
          if (Array.isArray(profileTyokokemus)) {
            return profileTyokokemus.some(tk => {
              if (Array.isArray(tk)) {
                return tk.some(tkItem => typeof tkItem === 'string' && tkItem.toLowerCase().includes(kokemusItem.toLowerCase()));
              }
              return typeof tk === 'string' && tk.toLowerCase().includes(kokemusItem.toLowerCase());
            });
          }
          return false;
        });
        if (!hasMatch) return false;
      }
      
      if (criteria.aloitusajankohta) {
        // Simple string match for start date
        if (profile.aloitusajankohta && typeof profile.aloitusajankohta === 'string') {
          if (!profile.aloitusajankohta.toLowerCase().includes(criteria.aloitusajankohta.toLowerCase())) {
            return false;
          }
        } else {
          // If profile has no start date specified, exclude it from date-specific searches
          return false;
        }
      }
      
      // Free text search in esittely
      if (criteria.esittelyVapaahaku) {
        const esittely = profile.esittely || '';
        if (!esittely.toLowerCase().includes(criteria.esittelyVapaahaku.toLowerCase())) {
          return false;
        }
      }
      
      // Free text search in muu_kokemus
      if (criteria.muuKokemusVapaahaku) {
        const muuKokemus = profile.muu_kokemus || [];
        let found = false;
        if (Array.isArray(muuKokemus)) {
          found = muuKokemus.some((kokemus: any) => {
            if (typeof kokemus === 'string') {
              return kokemus.toLowerCase().includes(criteria.muuKokemusVapaahaku!.toLowerCase());
            }
            if (Array.isArray(kokemus)) {
              return kokemus.some((k: any) => 
                typeof k === 'string' && k.toLowerCase().includes(criteria.muuKokemusVapaahaku!.toLowerCase())
              );
            }
            return false;
          });
        }
        if (!found) return false;
      }
      
      // Free text search in osaamisteksti
      if (criteria.osaamistekstiVapaahaku) {
        const osaamisteksti = profile.osaamisteksti || '';
        if (!osaamisteksti.toLowerCase().includes(criteria.osaamistekstiVapaahaku.toLowerCase())) {
          return false;
        }
      }
      
      // Maakunta filtering - check if profile's work area matches selected region
      if (criteria.maakunta) {
        const profileAlueet = (profile.tyonhakualue || []) as string[];
        
        // If profile has no work areas specified, always include it (skip this filter)
        if (!profileAlueet || profileAlueet.length === 0) {
          // Don't filter out profiles with no area - they appear in all regional searches
        } else {
          // Define mapping of regions to cities (same as in frontend)
          const maakuntaKaupungit: Record<string, string[]> = {
            'Uusimaa': ['Helsinki', 'Espoo', 'Vantaa', 'Kauniainen', 'Järvenpää', 'Hyvinkää', 'Porvoo', 'Kerava', 'Tuusula', 'Nurmijärvi', 'Loviisa', 'Vihti', 'Sipoo', 'Karkkila', 'Askola', 'Mäntsälä', 'Pornainen', 'Pukkila'],
            'Varsinais-Suomi': ['Turku', 'Kaarina', 'Raisio', 'Naantali', 'Mynämäki', 'Loimaa', 'Salo', 'Somero', 'Paimio', 'Lieto', 'Masku'],
            'Pirkanmaa': ['Tampere', 'Nokia', 'Ylöjärvi', 'Kangasala', 'Lempäälä', 'Orivesi', 'Ikaalinen', 'Valkeakoski', 'Mänttä-Vilppula', 'Akaa', 'Sastamala'],
            'Pohjois-Pohjanmaa': ['Oulu', 'Kempele', 'Muhos', 'Oulunsalo', 'Haukipudas', 'Kiiminki', 'Ylivieska', 'Raahe', 'Ii', 'Pudasjärvi'],
            'Keski-Suomi': ['Jyväskylä', 'Äänekoski', 'Jämsä', 'Keuruu', 'Saarijärvi', 'Viitasaari', 'Muurame', 'Laukaa', 'Petäjävesi'],
            'Pohjois-Savo': ['Kuopio', 'Iisalmi', 'Varkaus', 'Siilinjärvi', 'Suonenjoki', 'Kiuruvesi', 'Nilsiä', 'Lapinlahti'],
            'Etelä-Savo': ['Mikkeli', 'Savonlinna', 'Pieksämäki', 'Heinola', 'Imatra'],
            'Pohjois-Karjala': ['Joensuu', 'Kitee', 'Lieksa', 'Nurmes', 'Outokumpu'],
            'Etelä-Karjala': ['Lappeenranta', 'Imatra', 'Hamina', 'Kotka', 'Kouvola'],
            'Kymenlaakso': ['Kotka', 'Kouvola', 'Hamina', 'Pyhtää', 'Virolahti'],
            'Päijät-Häme': ['Lahti', 'Heinola', 'Hollola', 'Nastola', 'Orimattila', 'Asikkala'],
            'Kanta-Häme': ['Hämeenlinna', 'Riihimäki', 'Forssa', 'Hattula', 'Janakkala'],
            'Satakunta': ['Pori', 'Rauma', 'Ulvila', 'Kankaanpää', 'Harjavalta', 'Kokemäki', 'Huittinen'],
            'Kainuu': ['Kajaani', 'Kuhmo', 'Sotkamo', 'Suomussalmi'],
            'Lappi': ['Rovaniemi', 'Tornio', 'Kemi', 'Kemijärvi', 'Sodankylä', 'Inari'],
            'Etelä-Pohjanmaa': ['Seinäjoki', 'Kurikka', 'Lapua', 'Ilmajoki', 'Alavus', 'Kauhava'],
            'Pohjanmaa': ['Vaasa', 'Pietarsaari', 'Kokkola', 'Kristiinankaupunki', 'Närpiö'],
            'Keski-Pohjanmaa': ['Kokkola', 'Ylivieska', 'Kalajoki', 'Kannus']
          };
          
          const selectedRegionCities = maakuntaKaupungit[criteria.maakunta] || [];
          
          // Check if profile has any work area that matches the selected region
          const hasMatch = profileAlueet.some(alue => {
            const alueNimi = alue.toLowerCase().trim();
            
            // Check if the area name directly matches the region
            if (alueNimi === criteria.maakunta!.toLowerCase()) {
              return true;
            }
            
            // Check if the area name matches any city in the selected region
            return selectedRegionCities.some(city => 
              city.toLowerCase() === alueNimi || alueNimi.includes(city.toLowerCase())
            );
          });
          
          if (!hasMatch) return false;
        }
      }
      
      return true;
    });
    
    console.log(`Filtered ${filteredProfiles.length} profiles from ${profiles.length} total`);
    
    // Debug: Special logging for taksinkuljettaja search
    if (criteria.ammatit && criteria.ammatit.some(a => a.toLowerCase().includes('taksinkuljettaja'))) {
      console.log('=== TAKSINKULJETTAJA SEARCH DEBUG ===');
      console.log('Search criteria:', criteria.ammatit);
      
      let totalTaksinkuljettajaInAll = 0;
      let exactMatches = 0;
      let containsMatches = 0;
      
      const uniqueProfessions = new Set();
      
      profiles.forEach((profile, index) => {
        const ammatit = (profile.ammatit || []) as string[];
        const hasTaksinkuljettaja = ammatit.some(ammatti => 
          ammatti && ammatti.toLowerCase().includes('taksinkuljettaja')
        );
        
        if (hasTaksinkuljettaja) {
          totalTaksinkuljettajaInAll++;
          
          // Collect unique profession strings
          ammatit.forEach(ammatti => {
            if (ammatti && ammatti.toLowerCase().includes('taksinkuljettaja')) {
              uniqueProfessions.add(ammatti);
            }
          });
          
          if (index < 10) { // Show first 10 matches
            console.log(`Profile ${index + 1}:`, ammatit.filter(a => a && a.toLowerCase().includes('taksinkuljettaja')));
          }
        }
        
        // Check if this profile matches the search criteria (exact match)
        const exactMatch = (criteria.ammatit || []).some(ammatti => 
          ammatit.includes(ammatti)
        );
        if (exactMatch) {
          exactMatches++;
        }
        
        // Check if this profile matches the search criteria (contains match)
        const containsMatch = (criteria.ammatit || []).some(ammatti => 
          ammatit.some(profileAmmatti => 
            profileAmmatti && profileAmmatti.toLowerCase().includes(ammatti.toLowerCase())
          )
        );
        if (containsMatch) {
          containsMatches++;
        }
      });
      
      console.log(`Total profiles with taksinkuljettaja in all ${profiles.length} profiles: ${totalTaksinkuljettajaInAll}`);
      console.log(`Profiles matching exact search criteria: ${exactMatches}`);
      console.log(`Profiles matching contains search criteria: ${containsMatches}`);
      console.log('Unique profession strings containing "taksinkuljettaja":');
      Array.from(uniqueProfessions).forEach(profession => {
        console.log(`  "${profession}"`);
      });
      console.log('==========================================');
    }
    
    // Debug: Show profession distribution from the first 100 profiles
    if (profiles.length > 0) {
      console.log('=== PROFESSION DISTRIBUTION DEBUG ===');
      const professionCount: Record<string, number> = {};
      const skillCount: Record<string, number> = {};
      
      profiles.slice(0, 100).forEach(profile => {
        const professions = (profile.ammatit || []) as string[];
        const skills = (profile.osaamiset || []) as string[];
        
        professions.forEach(profession => {
          professionCount[profession] = (professionCount[profession] || 0) + 1;
        });
        
        skills.forEach(skill => {
          skillCount[skill] = (skillCount[skill] || 0) + 1;
        });
      });
      
      console.log('Top 15 professions in first 100 profiles:');
      Object.entries(professionCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 15)
        .forEach(([profession, count]) => {
          console.log(`  ${profession}: ${count}`);
        });
      
      console.log('\nTop 15 skills in first 100 profiles:');
      Object.entries(skillCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 15)
        .forEach(([skill, count]) => {
          console.log(`  ${skill}: ${count}`);
        });
      
      console.log('\nRAREst professions (1-5 occurrences):');
      Object.entries(professionCount)
        .filter(([,count]) => count >= 1 && count <= 5)
        .sort(([,a], [,b]) => a - b)
        .slice(0, 10)
        .forEach(([profession, count]) => {
          console.log(`  ${profession}: ${count}`);
        });
        
      console.log('\nRAREst skills (1-5 occurrences):');
      Object.entries(skillCount)
        .filter(([,count]) => count >= 1 && count <= 5)
        .sort(([,a], [,b]) => a - b)
        .slice(0, 10)
        .forEach(([skill, count]) => {
          console.log(`  ${skill}: ${count}`);
        });
      
      const totalProfessions = Object.values(professionCount).reduce((a, b) => a + b, 0);
      const devCount = professionCount['ohjelmistokehittäjä'] || 0;
      console.log(`\nOhjelmistokehittäjä: ${devCount}/${totalProfessions} (${((devCount/totalProfessions)*100).toFixed(1)}%)`);
      console.log('=====================================');
    }
    
    // Demo user result limitations - maksimissaan 3 tulosta
    let finalProfiles = filteredProfiles;
    console.log(`🔍 isDemoUser check: ${criteria.isDemoUser}, type: ${typeof criteria.isDemoUser}`);
    
    if (criteria.isDemoUser === true) {
      finalProfiles = filteredProfiles.slice(0, 3);
      console.log(`🔒 Demo user: Limited results to ${finalProfiles.length} (max 3 total)`);
    } else {
      console.log(`✅ Admin user: Returning all ${filteredProfiles.length} results`);
    }
    
    return {
      profiles: finalProfiles,
      total: finalProfiles.length
    };
  } catch (error) {
    console.error('Virhe Firestore-haussa:', error);
    return {
      profiles: [],
      total: 0
    };
  }
}

export async function getAllProfiles(maxProfiles: number = 1000): Promise<Profile[]> {
  try {
    console.log('Starting to fetch profiles from Firestore...');
    const profilesRef = collection(db, 'profiles');
    
    // For demo mode (limited profiles), use random sampling to get better geographical distribution
    const isDemo = maxProfiles <= 1000;
    
    if (isDemo) {
      console.log('Demo mode: Using geographical quotas to match TEM statistics');
      
      // TEM official distribution percentages (2024-03)
      const temDistribution = {
        'Uusimaa': 0.259, // 84,500 / 326,400
        'Pirkanmaa': 0.099, // 32,400 / 326,400
        'Varsinais-Suomi': 0.084, // 27,300 / 326,400
        'Pohjois-Pohjanmaa': 0.080, // 26,100 / 326,400
        'Pohjois-Savo': 0.055, // 17,800 / 326,400
        'Päijät-Häme': 0.042, // 13,700 / 326,400
        'Kanta-Häme': 0.038, // 12,300 / 326,400
        'Lappi': 0.035, // 11,500 / 326,400
        'Satakunta': 0.032, // 10,500 / 326,400
        'Kymenlaakso': 0.030, // 9,900 / 326,400
        'Pohjois-Karjala': 0.028, // 9,200 / 326,400
        'Etelä-Savo': 0.029, // 9,400 / 326,400
        'Keskisuomi': 0.026, // 8,600 / 326,400
        'Pohjanmaa': 0.027, // 8,900 / 326,400
        'Etelä-Karjala': 0.022, // 7,300 / 326,400
        'Etelä-Pohjanmaa': 0.023, // 7,500 / 326,400
        'Keski-Pohjanmaa': 0.013, // 4,100 / 326,400
        'Kainuu': 0.012, // 3,900 / 326,400
        'Ahvenanmaa': 0.002  // 600 / 326,400
      };
      
      // Fetch a much larger sample to ensure we have enough profiles from each region
      const sampleSize = Math.min(maxProfiles * 10, 15000);
      const q = query(profilesRef, orderBy('__name__'), limit(sampleSize));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      
      const allProfiles: Profile[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const profileData = doc.data();
        const profile = {
          id: doc.id,
          ...profileData
        } as Profile;
        
        // Normalize field names - if we have tyotoiveet but not työtoiveet, copy it over
        if (!profile.työtoiveet && profile.tyotoiveet) {
          profile.työtoiveet = profile.tyotoiveet;
        }
        
        allProfiles.push(profile);
      });
      
      console.log(`Fetched ${allProfiles.length} profiles for geographical quota sampling`);
      
      // Group profiles by their primary county
      const maakuntaKaupungit: Record<string, string[]> = {
        'Uusimaa': ['Helsinki', 'Espoo', 'Vantaa', 'Kauniainen', 'Järvenpää', 'Hyvinkää', 'Porvoo', 'Kerava', 'Tuusula', 'Nurmijärvi', 'Loviisa', 'Vihti', 'Sipoo', 'Karkkila', 'Askola', 'Mäntsälä', 'Pornainen', 'Pukkila'],
        'Pirkanmaa': ['Tampere', 'Nokia', 'Ylöjärvi', 'Kangasala', 'Valkeakoski', 'Lempäälä', 'Pirkkala', 'Akaa', 'Ikaalinen'],
        'Varsinais-Suomi': ['Turku', 'Salo', 'Kaarina', 'Raisio', 'Naantali', 'Lieto', 'Loimaa', 'Uusikaupunki', 'Parainen', 'Paimio'],
        'Pohjois-Pohjanmaa': ['Oulu', 'Raahe', 'Ylivieska', 'Kalajoki', 'Haapajärvi', 'Liminka', 'Kempele'],
        'Pohjois-Savo': ['Kuopio', 'Iisalmi', 'Varkaus', 'Siilinjärvi', 'Lapinlahti'],
        'Päijät-Häme': ['Lahti', 'Heinola', 'Hollola', 'Orimattila', 'Asikkala', 'Kärkölä', 'Padasjoki', 'Sysmä'],
        'Kanta-Häme': ['Hämeenlinna', 'Riihimäki', 'Forssa', 'Janakkala', 'Hattula', 'Hausjärvi'],
        'Lappi': ['Rovaniemi', 'Kemi', 'Tornio', 'Kemijärvi', 'Sodankylä', 'Inari'],
        'Satakunta': ['Pori', 'Rauma', 'Harjavalta', 'Ulvila', 'Kokemäki', 'Eura', 'Huittinen', 'Kankaanpää'],
        'Kymenlaakso': ['Kotka', 'Kouvola', 'Hamina', 'Miehikkälä', 'Virolahti'],
        'Pohjois-Karjala': ['Joensuu', 'Lieksa', 'Outokumpu', 'Kontiolahti'],
        'Etelä-Savo': ['Mikkeli', 'Savonlinna', 'Pieksämäki', 'Juva', 'Kangasniemi', 'Sulkava', 'Puumala'],
        'Keskisuomi': ['Jyväskylä', 'Äänekoski', 'Jämsä', 'Laukaa', 'Hankasalmi', 'Keuruu', 'Toivakka'],
        'Pohjanmaa': ['Vaasa', 'Pietarsaari', 'Kauhava', 'Kristiinankaupunki', 'Isokyrö'],
        'Etelä-Karjala': ['Lappeenranta', 'Imatra', 'Parikkala', 'Ruokolahti', 'Rautjärvi'],
        'Etelä-Pohjanmaa': ['Seinäjoki', 'Lapua', 'Alavus', 'Kurikka', 'Kauhajoki'],
        'Keski-Pohjanmaa': ['Kokkola', 'Kannus', 'Kaustinen'],
        'Kainuu': ['Kajaani', 'Sotkamo', 'Kuhmo'],
        'Ahvenanmaa': ['Maarianhamina', 'Jomala', 'Finström', 'Lemland', 'Föglö']
      };
      
      const profilesByCounty: Record<string, Profile[]> = {};
      
      // Categorize profiles by county
      allProfiles.forEach(profile => {
        const areas = (profile.tyonhakualue || []) as string[];
        
        // Debug: Check what type of data we're getting
        if (profile.id === allProfiles[0]?.id) {
          console.log('Sample profile tyonhakualue:', {
            raw: profile.tyonhakualue,
            type: typeof profile.tyonhakualue,
            isArray: Array.isArray(profile.tyonhakualue),
            asArray: areas,
            length: areas.length
          });
        }
        
        // Find the first county match
        let assignedCounty = 'Other';
        for (const [county, cities] of Object.entries(maakuntaKaupungit)) {
          const hasMatch = areas.some(area => {
            const areaLower = area.toLowerCase().trim();
            return county.toLowerCase() === areaLower || 
                   cities.some(city => city.toLowerCase() === areaLower);
          });
          
          if (hasMatch) {
            assignedCounty = county;
            break;
          }
        }
        
        if (!profilesByCounty[assignedCounty]) {
          profilesByCounty[assignedCounty] = [];
        }
        profilesByCounty[assignedCounty].push(profile);
      });
      
      console.log('Profiles grouped by county:', Object.fromEntries(
        Object.entries(profilesByCounty).map(([county, profiles]) => [county, profiles.length])
      ));
      
      // Select profiles according to TEM distribution
      const selectedProfiles: Profile[] = [];
      const seed = 12345; // Fixed seed for consistent results
      let randomSeed = seed;
      const seededRandom = () => {
        randomSeed = (randomSeed * 9301 + 49297) % 233280;
        return randomSeed / 233280;
      };
      
      // Calculate minimum profiles needed per county for Top 20 lists
      const minProfilesPerCounty = 20; // Ensure each county has at least 20 profiles for Top 20 lists
      
      for (const [county, targetPercent] of Object.entries(temDistribution)) {
        const targetCount = Math.round(maxProfiles * targetPercent);
        const availableProfiles = profilesByCounty[county] || [];
        
        if (availableProfiles.length === 0) {
          console.warn(`No profiles found for county: ${county}`);
          continue;
        }
        
        // Ensure we have enough profiles from each county for meaningful Top 20 lists
        // Use at least minProfilesPerCounty or the target count, whichever is higher
        const actualCount = Math.max(targetCount, Math.min(minProfilesPerCounty, availableProfiles.length));
        
        // Shuffle available profiles deterministically
        const shuffled = [...availableProfiles];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(seededRandom() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Take the required amount or all available if less
        const selected = shuffled.slice(0, Math.min(actualCount, shuffled.length));
        selectedProfiles.push(...selected);
        
        console.log(`Selected ${selected.length}/${actualCount} profiles from ${county} (had ${availableProfiles.length} available, target was ${targetCount})`);
      }
      
      // If we have too many profiles, trim to maxProfiles while maintaining proportions
      if (selectedProfiles.length > maxProfiles) {
        console.log(`Trimming ${selectedProfiles.length} profiles to ${maxProfiles} while maintaining county proportions`);
        
        // Calculate how many we need to remove
        const excess = selectedProfiles.length - maxProfiles;
        const removalRate = excess / selectedProfiles.length;
        
        // Group selected profiles by county again
        const selectedByCounty: Record<string, Profile[]> = {};
        selectedProfiles.forEach(profile => {
          const areas = (profile.tyonhakualue || []) as string[];
          
          // Find the first county match
          let assignedCounty = 'Other';
          for (const [county, cities] of Object.entries(maakuntaKaupungit)) {
            const hasMatch = areas.some(area => {
              const areaLower = area.toLowerCase().trim();
              return county.toLowerCase() === areaLower || 
                     cities.some(city => city.toLowerCase() === areaLower);
            });
            
            if (hasMatch) {
              assignedCounty = county;
              break;
            }
          }
          
          if (!selectedByCounty[assignedCounty]) {
            selectedByCounty[assignedCounty] = [];
          }
          selectedByCounty[assignedCounty].push(profile);
        });
        
        // Remove excess profiles proportionally from each county
        const finalProfiles: Profile[] = [];
        for (const [county, profiles] of Object.entries(selectedByCounty)) {
          const targetRemoval = Math.floor(profiles.length * removalRate);
          const keepCount = Math.max(minProfilesPerCounty, profiles.length - targetRemoval);
          const keep = profiles.slice(0, Math.min(keepCount, profiles.length));
          finalProfiles.push(...keep);
        }
        
        console.log(`Final demo selection: ${finalProfiles.length} profiles with geographical distribution matching TEM data`);
        return finalProfiles.slice(0, maxProfiles); // Final safety check
      }
      
      // If we don't have enough profiles, fill with remaining profiles from 'Other'
      if (selectedProfiles.length < maxProfiles) {
        const remaining = maxProfiles - selectedProfiles.length;
        const otherProfiles = profilesByCounty['Other'] || [];
        
        if (otherProfiles.length > 0) {
          // Shuffle other profiles
          const shuffled = [...otherProfiles];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          
          const selected = shuffled.slice(0, Math.min(remaining, shuffled.length));
          selectedProfiles.push(...selected);
          console.log(`Filled remaining ${selected.length} slots with 'Other' profiles`);
        }
      }
      
      console.log(`Final demo selection: ${selectedProfiles.length} profiles with geographical distribution matching TEM data`);
      return selectedProfiles.slice(0, maxProfiles); // Ensure we don't exceed maxProfiles
    }
    
    // For full access (logged in users), return raw data as-is from database
    console.log('Full access mode: Using pagination to return raw database data');
    const maxQuerySize = 5000;
    const profiles: Profile[] = [];
    let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
    
    while (profiles.length < maxProfiles) {
      const querySize = Math.min(maxProfiles - profiles.length, maxQuerySize);
      console.log(`Fetching batch of ${querySize} profiles (current total: ${profiles.length})...`);
      
      let q;
      if (lastDoc) {
        // Use pagination for subsequent queries
        q = query(profilesRef, orderBy('__name__'), startAfter(lastDoc), limit(querySize));
      } else {
        // First query
        q = query(profilesRef, orderBy('__name__'), limit(querySize));
      }
      
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      console.log(`Batch query completed. Got ${querySnapshot.size} profiles`);
      
      if (querySnapshot.empty) {
        console.log('No more documents found');
        break;
      }
      
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const profileData = doc.data();
        const profile = {
          id: doc.id,
          ...profileData
        } as Profile;
        
        // Normalize field names - if we have tyotoiveet but not työtoiveet, copy it over
        if (!profile.työtoiveet && profile.tyotoiveet) {
          profile.työtoiveet = profile.tyotoiveet;
        }
        
        profiles.push(profile);
      });
      
      // Set the last document for pagination
      lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      // If we got fewer documents than requested, we've reached the end
      if (querySnapshot.size < querySize) {
        console.log('Reached end of collection');
        break;
      }
    }

    console.log(`Successfully processed ${profiles.length} profiles from raw database data`);
    return profiles;
  } catch (error) {
    console.error('Virhe kaikkien profiilien haussa:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return [];
  }
}
