'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { searchProfilesClient, Profile as FirestoreProfile } from '@/lib/firestore-client';

interface Profiili extends FirestoreProfile {
  // Compatibility interface
}

// Yoro.fi integraatio - ei tarvita Firebase Authia
export default function ProfiiliSelainYoro({ currentUser = null }: { currentUser?: any }) {
  const [profiilit, setProfiilit] = useState<Profiili[]>([]);
  const [tulokset, setTulokset] = useState<Profiili[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchCooldown, setSearchCooldown] = useState(0);
  const [lastSearchTime, setLastSearchTime] = useState(0);

  // Hakukriteerit state
  const [hakukriteerit, setHakukriteerit] = useState({
    esittely: '',
    tyonhakualue: [] as string[],
    ammatit: [] as string[],
    osaamiset: [] as string[],
    työtoiveet: [] as string[],
    koulutus: [] as string[],
    työkokemus: [] as string[],
    muu_kokemus: [] as string[],
    osaamisteksti: '',
    kielitaito: [] as string[],
    ajokortit: [] as string[],
    ajotiedot: [] as string[],
    lupatiedot: [] as string[],
    some: [] as string[],
    puhelin: '',
    esittely_10sanaa: '',
    sähköposti: '',
    aloitusajankohta: '',
    esittelyVapaahaku: '',
    muuKokemusVapaahaku: '',
    osaamistekstiVapaahaku: '',
    maakunta: '',
    kaupunki: '',
  });

  // ... [Kopioi kaikki apufunktiot ja data processing logiikka ProfiiliSelain.tsx:stä]

  // Lataa profiilit automaattisesti kun komponentti mountataan
  useEffect(() => {
    if (!currentUser) {
      console.log('No user provided - yoro.fi should handle authentication');
      return;
    }

    setLoading(true);
    console.log('Loading profiles for yoro.fi user:', currentUser);
    
    // Ei demo-rajoituksia yoro.fi:ssä
    const profileLimit = 30000;
    
    const loadingTimeout = setTimeout(() => {
      console.log('⚠️ Loading timeout reached, setting loading to false');
      setLoading(false);
    }, 10000);
    
    searchProfilesClient({ limit: profileLimit })
      .then((result) => {
        clearTimeout(loadingTimeout);
        console.log('✅ Profiles loaded from Firestore:', result.profiles.length);
        
        setProfiilit(result.profiles || []);
        setLoading(false);
      })
      .catch((error) => {
        clearTimeout(loadingTimeout);
        console.error('❌ Virhe profiilien haussa:', error);
        setProfiilit([]);
        setLoading(false);
      });
  }, [currentUser]);

  // Jos ei käyttäjää, näytä viesti
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">🔐 Kirjautuminen vaaditaan</h1>
          <p>Sinun täyty kirjautua sisään nähdäksesi profiiliselain.</p>
          <p className="text-sm text-gray-600 mt-2">
            Yoro.fi:n käyttäjät kirjautuvat automaattisesti.
          </p>
        </div>
      </div>
    );
  }

  // Yksinkertainen versio - poista auth-tarkistukset
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profiiliselain
          </h1>
          <p className="text-gray-600">
            Kirjautunut käyttäjä: {currentUser?.email || currentUser?.name || 'Yoro.fi käyttäjä'}
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="mb-4">🔄 Ladataan profiileja...</div>
            <div className="text-sm text-gray-600">
              Odotetaan Firestore-yhteyttä...
            </div>
          </div>
        )}

        {!loading && profiilit.length > 0 && (
          <div className="mb-6 p-4 bg-green-100 rounded-lg">
            <p className="text-green-700">
              ✅ {profiilit.length} profiilia ladattu onnistuneesti
            </p>
          </div>
        )}

        {/* Hakukomponentti menee tähän - kopioi ProfiiliSelain.tsx:stä */}
        {!loading && (
          <div className="text-center py-8">
            <p>Hakuominaisuudet lisätään seuraavaksi...</p>
            <p className="text-sm text-gray-600">
              Profiilit: {profiilit.length} | Tulokset: {tulokset.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
