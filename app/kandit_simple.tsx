'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search, Users, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface Profile {
  id: string;
  työtoiveet?: string[];
  valitut_ammatit?: string[];
  valitut_osaamiset?: string[];
  työnhakualue?: string[];
  esittely?: string;
  työkokemus?: string;
  koulutus?: string;
  [key: string]: any;
}

interface ApiResponse {
  profiles: Profile[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

export default function YksinkertainenKandidaattiselain() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProfiles = async (query: string = '', reset: boolean = false) => {
    setLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      const response = await fetch(
        `/api/profiles/simple?q=${encodeURIComponent(query)}&limit=20&offset=${currentOffset}`
      );
      
      if (response.ok) {
        const data: ApiResponse = await response.json();
        
        if (reset) {
          setProfiles(data.profiles);
          setOffset(data.limit);
        } else {
          setProfiles(prev => [...prev, ...data.profiles]);
          setOffset(prev => prev + data.limit);
        }
        
        setTotal(data.total);
        setHasMore(data.hasMore);
      } else {
        console.error('Virhe ladattaessa profiileja');
      }
    } catch (error) {
      console.error('Virhe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setOffset(0);
    setHasMore(true);
    fetchProfiles(searchTerm, true);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProfiles(searchTerm, false);
    }
  };

  useEffect(() => {
    fetchProfiles('', true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Yoro.fi Profiiliselain
          </h1>
          <p className="text-gray-600">
            Selaa ja etsi kandidaatteja anonymisoiduista profiileista
          </p>
        </div>

        {/* Hakupalkki */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Hae esim. 'web-kehittäjä', 'Helsinki', 'projektinhallinta'..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Hae
            </Button>
          </div>
        </div>

        {/* Tilastot */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Löytyi {total} profiilia</span>
            {searchTerm && (
              <span className="text-blue-600">
                hakusanalla "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        {/* Profiilit */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Profiili #{profile.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Ammatit */}
                {profile.valitut_ammatit && profile.valitut_ammatit.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Ammatit</p>
                      <p className="text-sm text-gray-600">
                        {profile.valitut_ammatit.slice(0, 3).join(', ')}
                        {profile.valitut_ammatit.length > 3 && '...'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Sijainti */}
                {profile.työnhakualue && profile.työnhakualue.length > 0 && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Sijainti</p>
                      <p className="text-sm text-gray-600">
                        {profile.työnhakualue.slice(0, 2).join(', ')}
                        {profile.työnhakualue.length > 2 && '...'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Osaaminen */}
                {profile.valitut_osaamiset && profile.valitut_osaamiset.length > 0 && (
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Osaaminen</p>
                      <p className="text-sm text-gray-600">
                        {profile.valitut_osaamiset.slice(0, 3).join(', ')}
                        {profile.valitut_osaamiset.length > 3 && '...'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Esittely */}
                {profile.esittely && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {profile.esittely.substring(0, 150)}
                      {profile.esittely.length > 150 && '...'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lataa lisää */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={loadMore}
              disabled={loading}
              variant="outline"
              className="px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Ladataan...
                </>
              ) : (
                'Lataa lisää'
              )}
            </Button>
          </div>
        )}

        {/* Ei tuloksia */}
        {!loading && profiles.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ei profiileja löytynyt
            </h3>
            <p className="text-gray-600">
              Kokeile erilaisia hakusanoja tai poista hakusuodattimet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
