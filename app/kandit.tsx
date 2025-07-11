'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import KarttaKomponentti from "@/components/KarttaKomponentti";
import TEMYhteenveto from "./TEMYhteenveto";
import YlikoulutetutYhteenveto from "./YlikoulutetutYhteenveto";
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import TyoymparistoProfiili from './profilointi'; // tai '../profilointi' riippuen tiedostopolusta

// Apufunktiot
const suodattamattomatToiveet = [
  "Asiointi",
  "Oma työpolku",
  "Työnhakuprofiili",
  "Avoimet työpaikat",
  "Tietoa muilla kielillä",
  "TE24, KOTO24, KEHA24 – kolme mittavaa uudistusta",
  "Henkilöauto (B)",
  "Moottoripyörä (A1, A2 tai A)",
  "Henkilöauto ja perävaunu (B96 tai BE)",
  "Kuorma-auto (C1 tai C)",
  "Kuorma-auto ja perävaunu (C1E tai CE)",
  "Hygieniapassi"
];

const suodattamattomatKoulutukset = [
  "Ylioppilastutkinto",
  "Peruskoulu",
  "Ei tutkinnon nimeä tai oppilaitosta",
  "Missing: undefined fi",
  "Lukion oppimäärä"
];

const laskeEsiintymät = (profiilit: any[], kentta: string, pois: string[] = []) => {
  const laskuri: { [avain: string]: number } = {};
  profiilit.forEach((p) => {
    const arvot = p[kentta];
    if (Array.isArray(arvot)) {
      arvot.forEach((arvo: string) => {
        if (!arvo || pois.includes(arvo)) return;
        laskuri[arvo] = (laskuri[arvo] || 0) + 1;
      });
    }
  });
  return laskuri;
};

const järjestäLukumääränMukaan = (laskuri: { [avain: string]: number }) =>
  Object.entries(laskuri)
    .sort((a, b) => b[1] - a[1])
    .map(([nimi, lkm]) => ({ nimi, lkm }));

const laskeMaakuntaEsiintymät = (profiilit: any[]) => {
  const laskuri: { [maakunta: string]: Set<string> } = {};

  profiilit.forEach((p) => {
    const id = p.id;
    const alueet = p.työnhakualue || [];
    const maakuntaSet = new Set<string>();

    alueet.forEach((alue: string) => {
      const alueNimi = alue.toLowerCase().trim();

      const mk = Object.entries(maakuntaKaupungit).find(
        ([maakunta, kaupungit]) =>
          maakunta.toLowerCase() === alueNimi ||
          kaupungit.map(k => k.toLowerCase()).includes(alueNimi)
      );

      if (mk) {
        maakuntaSet.add(mk[0]);
      }
    });

    maakuntaSet.forEach((mk) => {
      if (!laskuri[mk]) laskuri[mk] = new Set();
      laskuri[mk].add(id); // Vain 1 kerta per maakunta, vaikka sama ID esiintyisi useassa kaupungissa
    });
  });

  const tulos: { [maakunta: string]: number } = {};
  for (const [maakunta, idSet] of Object.entries(laskuri)) {
    tulos[maakunta] = idSet.size;
  }

  return tulos;
};


const hakukentat = [
  'työtoiveet',
  'valitut_ammatit',
  'valitut_osaamiset',
  'esittely',
  'työkokemus',
  'koulutus',
  'osaamiset',
  'ammatit',
  'kielitaito',
  'ajokortit'
];

const maakunnat = Array.from(
  new Set([
    'Uusimaa', 'Varsinais-Suomi', 'Kanta-Häme', 'Päijät-Häme', 'Kymenlaakso',
    'Etelä-Karjala', 'Etelä-Savo', 'Keskisuomi', 'Pirkanmaa', 'Satakunta',
    'Pohjanmaa', 'Etelä-Pohjanmaa', 'Keski-Pohjanmaa', 'Pohjois-Savo',
    'Pohjois-Karjala', 'Pohjois-Pohjanmaa', 'Kainuu', 'Lappi', 'Ahvenanmaa'
  ])
);

const maakuntaKaupungit: Record<string, string[]> = {
  'Uusimaa': ['Helsinki', 'Espoo', 'Vantaa', 'Kauniainen', 'Järvenpää', 'Hyvinkää', 'Porvoo', 'Kerava', 'Tuusula', 'Nurmijärvi', 'Loviisa', 'Vihti', 'Sipoo', 'Karkkila', 'Askola', 'Mäntsälä', 'Pornainen', 'Pukkila'],
  'Varsinais-Suomi': ['Turku', 'Salo', 'Kaarina', 'Raisio', 'Naantali', 'Lieto', 'Loimaa', 'Uusikaupunki', 'Parainen', 'Paimio'],
  'Kanta-Häme': ['Hämeenlinna', 'Riihimäki', 'Forssa', 'Janakkala', 'Hattula', 'Hausjärvi'],
  'Päijät-Häme': ['Lahti', 'Heinola', 'Hollola', 'Orimattila', 'Asikkala', 'Kärkölä', 'Padasjoki', 'Sysmä'],
  'Kymenlaakso': ['Kotka', 'Kouvola', 'Hamina', 'Miehikkälä', 'Virolahti'],
  'Etelä-Karjala': ['Lappeenranta', 'Imatra', 'Parikkala', 'Ruokolahti', 'Rautjärvi'],
  'Etelä-Savo': ['Mikkeli', 'Savonlinna', 'Pieksämäki', 'Juva', 'Kangasniemi', 'Sulkava', 'Puumala'],
  'Keskisuomi': ['Jyväskylä', 'Äänekoski', 'Jämsä', 'Laukaa', 'Hankasalmi', 'Keuruu', 'Toivakka'],
  'Pirkanmaa': ['Tampere', 'Nokia', 'Ylöjärvi', 'Kangasala', 'Valkeakoski', 'Lempäälä', 'Pirkkala', 'Akaa', 'Ikaalinen'],
  'Satakunta': ['Pori', 'Rauma', 'Harjavalta', 'Ulvila', 'Kokemäki', 'Eura', 'Huittinen', 'Kankaanpää'],
  'Pohjanmaa': ['Vaasa', 'Pietarsaari', 'Kauhava', 'Kristiinankaupunki', 'Isokyrö'],
  'Etelä-Pohjanmaa': ['Seinäjoki', 'Lapua', 'Alavus', 'Kurikka', 'Kauhajoki'],
  'Keski-Pohjanmaa': ['Kokkola', 'Kannus', 'Kaustinen'],
  'Pohjois-Savo': ['Kuopio', 'Iisalmi', 'Varkaus', 'Siilinjärvi', 'Lapinlahti'],
  'Pohjois-Karjala': ['Joensuu', 'Lieksa', 'Outokumpu', 'Kontiolahti'],
  'Pohjois-Pohjanmaa': ['Oulu', 'Raahe', 'Ylivieska', 'Kalajoki', 'Haapajärvi', 'Liminka', 'Kempele'],
  'Kainuu': ['Kajaani', 'Sotkamo', 'Kuhmo'],
  'Lappi': ['Rovaniemi', 'Kemi', 'Tornio', 'Kemijärvi', 'Sodankylä', 'Inari'],
  'Ahvenanmaa': ['Maarianhamina', 'Jomala', 'Finström', 'Lemland', 'Föglö']
};

export default function Kandit() {
  const [profiilit, setProfiilit] = useState<any[]>([]);
  const [temTilasto, setTemTilasto] = useState<any>(null);
  const [temKuukausi, setTemKuukausi] = useState<string>("");
  const [maakuntaValinta, setMaakuntaValinta] = useState("");
  const [kaupunkiValinta, setKaupunkiValinta] = useState("");
  const [valittuAmmattiKartalle, setValittuAmmattiKartalle] = useState("");
  const [näytäKartta, setNäytäKartta] = useState(false);
  const [ammattivalinnat, setAmmattivalinnat] = useState<string[]>([]);
  const [toivevalinnat, setToivevalinnat] = useState<string[]>([]);
  const [koulutusvalinnat, setKoulutusvalinnat] = useState<string[]>([]);
  const [osaamisvalinnat, setOsaamisvalinnat] = useState<string[]>([]);
  const [haku, setHaku] = useState("");
  const [tulokset, setTulokset] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

const kaikkiAmmattidata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "ammatit"));
const kaikkiToivedata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "työtoiveet", suodattamattomatToiveet));
const kaikkiKoulutusdata = järjestäLukumääränMukaan(
  profiilit.reduce((acc: any, p) => {
    if (Array.isArray(p.koulutus)) {
      p.koulutus.forEach((k: any) => {
        const koulutusNimi = k[0]?.split(' / ')[0]?.trim();
        if (
          koulutusNimi &&
          !suodattamattomatKoulutukset.includes(koulutusNimi)
        ) {
          acc[koulutusNimi] = (acc[koulutusNimi] || 0) + 1;
        }
      });
    }
    return acc;
  }, {})
);
const kaikkiOsaamisdata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "osaamiset"));

  useEffect(() => {
    // Haetaan alkuperäinen data chunked API:sta
    fetch("/api/profiles/chunked?limit=1000")
      .then((res) => res.json())
      .then((data) => setProfiilit(data.profiles || []))
      .catch((error) => {
        console.error('Virhe datan haussa:', error);
        setProfiilit([]);
      });
  }, []);

  useEffect(() => {
    fetch("/data/tem_tyottomat.json")
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  
        if (data[currentMonth]) {
          setTemTilasto(data[currentMonth]);
          setTemKuukausi(currentMonth);
        } else {
          const latest = Object.keys(data).sort().reverse()[0];
          setTemTilasto(data[latest]);
          setTemKuukausi(latest);
        }
      });
  }, []);

  const hae = async () => {
    setLoading(true);
    try {
      // Rakenna hakuparametrit
      const params = new URLSearchParams();
      
      if (haku.trim()) {
        params.append('q', haku.trim());
      }
      
      if (maakuntaValinta) {
        params.append('työnhakualue', maakuntaValinta);
      }
      
      if (kaupunkiValinta) {
        params.append('työnhakualue', kaupunkiValinta);
      }
      
      if (ammattivalinnat.length > 0) {
        params.append('ammatit', ammattivalinnat.join(','));
      }
      
      if (toivevalinnat.length > 0) {
        params.append('työtoiveet', toivevalinnat.join(','));
      }
      
      if (osaamisvalinnat.length > 0) {
        params.append('osaamiset', osaamisvalinnat.join(','));
      }
      
      if (koulutusvalinnat.length > 0) {
        params.append('koulutus', koulutusvalinnat.join(','));
      }
      
      params.append('limit', '200');
      
      const response = await fetch(`/api/profiles/chunked?${params}`);
      const data = await response.json();
      
      setTulokset(data.profiles || []);
      console.log(`Löytyi ${data.total} profiilia`);
      
    } catch (error) {
      console.error('Hakuvirhe:', error);
      setTulokset([]);
    } finally {
      setLoading(false);
    }
  };

  const skaalauskerroin = temTilasto && profiilit.length > 0
  ? temTilasto.kokonaismaara / profiilit.length
  : 1;

const ammattidata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "ammatit"))
  .map(({ nimi, lkm }) => ({
    nimi,
    lkm: Math.round(lkm)
  }))
  .slice(0, 20);
const toivedata = järjestäLukumääränMukaan(
    laskeEsiintymät(profiilit, "työtoiveet", suodattamattomatToiveet)
  )
    .map(({ nimi, lkm }) => ({
      nimi,
      lkm: Math.round(lkm)
    }))
    .slice(0, 20);
    const osaamisdata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "osaamiset"))
    .map(({ nimi, lkm }) => ({
      nimi,
      lkm: Math.round(lkm)
    }))
    .slice(0, 20);
    const maakuntadata = järjestäLukumääränMukaan(laskeMaakuntaEsiintymät(profiilit))
    .map(({ nimi, lkm }) => ({
      nimi,
      lkm: Math.round(lkm)
    }))
    .slice(0, 20);
const koulutusdata = järjestäLukumääränMukaan(
  profiilit.reduce((acc: any, p) => {
    if (Array.isArray(p.koulutus)) {
      p.koulutus.forEach((k: any) => {
        const koulutusNimi = k[0]?.split(' / ')[0]?.trim();
        if (
          koulutusNimi &&
          !suodattamattomatKoulutukset.includes(koulutusNimi)
        ) {
          acc[koulutusNimi] = (acc[koulutusNimi] || 0) + 1;
        }
      });
    }
    return acc;
  }, {})
)
  .map(({ nimi, lkm }) => ({
    nimi,
    lkm: Math.round(lkm)
  }))
  .slice(0, 20);
const skaalaaAmmatit = () => {
  if (!temTilasto || (!maakuntaValinta && !kaupunkiValinta)) return [];

  // Suodata profiilit maakunnan ja kaupungin perusteella
  const profiilitAlueelta = profiilit.filter((p) => {
    const alueet = p.työnhakualue || [];
    return (
      (!maakuntaValinta || alueet.includes(maakuntaValinta)) &&
      (!kaupunkiValinta || alueet.includes(kaupunkiValinta))
    );
  });

  // Laske ammatit suodatetuista profiileista
  const laskuri = laskeEsiintymät(profiilitAlueelta, "ammatit");
  const yhteensa = Object.values(laskuri).reduce((a, b) => a + b, 0);
  const alueenKoko = temTilasto.maakunnat[maakuntaValinta] || yhteensa;

  if (yhteensa === 0) return [];

  return järjestäLukumääränMukaan(laskuri)
    .map(({ nimi, lkm }) => ({
      nimi,
      skaala: Math.round((lkm / yhteensa) * alueenKoko),
    }))
    .filter((a) => a.skaala > 0);
};

  const [näytäAmmattijakauma, setNäytäAmmattijakauma] = useState(false);
const skaalatutAmmatit = skaalaaAmmatit();

{näytäKartta && valittuAmmattiKartalle && (
  <div className="mt-6">
    {/* Tässä näkyisi karttakomponentti – voit lisätä sen erillisenä myöhemmin */}
    <div className="bg-white border p-4 rounded shadow text-sm">
      <strong>{valittuAmmattiKartalle}</strong> – työttömyysprosentti kunnittain (tähän tulee kartta)
    </div>
  </div>
)}

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Kandidaattien hakukone</h1>

      {näytäKartta && valittuAmmattiKartalle && (
  <div className="mt-6">
      <KarttaKomponentti
      ammatti={valittuAmmattiKartalle}
      profiilit={profiilit}
      temTilasto={temTilasto}
      kaikkiAmmattidata={kaikkiAmmattidata}
      kaupungitMaakunnittain={maakuntaKaupungit}
      />
  </div>
)}    

<div className="flex gap-4 items-center mt-2">
  <select
    value={valittuAmmattiKartalle}
    onChange={(e) => setValittuAmmattiKartalle(e.target.value)}
    className="border border-gray-300 rounded px-2 py-1"
  >
    <option value="">Valitse ammatti kartalle</option>
    {kaikkiAmmattidata.map(({ nimi }) => (
      <option key={nimi} value={nimi}>{nimi}</option>
    ))}
  </select>

  <button
    onClick={() => setNäytäKartta(true)}
    disabled={!valittuAmmattiKartalle}
    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
  >
    Näytä kartalla
  </button>
</div>


      {/* TOP 20 DASHBOARD */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Työttömien ammatit</h2>
    <ul className="list-disc pl-5 text-sm">
      {ammattidata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm} henkilöä)</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Työtoiveet</h2>
    <ul className="list-disc pl-5 text-sm">
      {toivedata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm} henkilöä)</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Koulutukset</h2>
    <ul className="list-disc pl-5 text-sm">
      {koulutusdata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm} henkilöä)</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Osaamiset</h2>
    <ul className="list-disc pl-5 text-sm">
      {osaamisdata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm} henkilöä)</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Suosituimmat työnhakumaakunnat</h2>
    <ul className="list-disc pl-5 text-sm">
      {maakuntadata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm} henkilöä)</li>
      ))}
    </ul>
  </div>
</div>

{temTilasto && (
  <div className="mt-10 bg-blue-50 border border-blue-200 rounded p-6 max-w-3xl mx-auto">
    <h3 className="text-xl font-bold text-center text-blue-900 mb-4">
      Työttömät työnhakijat maakunnittain (skaalattu kokonaismäärään – {temKuukausi})
    </h3>
    <p className="text-center text-sm text-gray-700 mb-4">
      TEM:n ilmoittama kokonaismäärä: <strong>{temTilasto.kokonaismaara.toLocaleString()} hlö</strong>
    </p>

    {(() => {
      const maakunnat = temTilasto.maakunnat || {};
      const summa = Object.values(maakunnat).reduce((acc, val) => acc + val, 0);
      const kerroin = temTilasto.kokonaismaara / summa;

      // Skaalaa ja säilytä desimaalit tarkasti
      const skaalatutRaw = Object.entries(maakunnat).map(([nimi, lkm]) => ({
        nimi,
        alkuperainen: lkm,
        skaalaamaton: lkm * kerroin,
        pyoristetty: Math.round(lkm * kerroin)
      }));

      // Korjaa mahdollinen pyöristysvirhe tarkalleen 326400:aan
      let erotus = temTilasto.kokonaismaara - skaalatutRaw.reduce((sum, m) => sum + m.pyoristetty, 0);
      while (erotus !== 0) {
        for (let i = 0; i < skaalatutRaw.length && erotus !== 0; i++) {
          skaalatutRaw[i].pyoristetty += erotus > 0 ? 1 : -1;
          erotus += erotus > 0 ? -1 : 1;
        }
      }

      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-800">
          {skaalatutRaw.map(({ nimi, pyoristetty }) => (
            <div key={nimi}>
              <strong>{nimi}:</strong> {pyoristetty.toLocaleString()} hlö
            </div>
          ))}
        </div>
      );
    })()}

    <p className="mt-6 text-xs text-gray-600 text-center leading-snug">
      Alueelliset määrät TEM:n työllisyyskatsauksessa kattoivat alkujaan noin 90,5 % kokonaistasosta ({temTilasto.kokonaismaara.toLocaleString()} hlö).
      <br />
      Puuttuva osuus on jaettu maakunnille suhteellisesti niiden alkuperäisten lukujen perusteella.
    </p>
  </div>
)}

<TEMYhteenveto />

<YlikoulutetutYhteenveto/>

{skaalatutAmmatit.length > 0 && (
  <div className="mt-10">
    <button
      onClick={() => setNäytäAmmattijakauma(!näytäAmmattijakauma)}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {näytäAmmattijakauma ? "Piilota ammattijakauma" : "Näytä ammattijakauma"}
    </button>

    {näytäAmmattijakauma && (
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">
          Ammattijakauma ({maakuntaValinta}{kaupunkiValinta ? ` / ${kaupunkiValinta}` : ""}) — TEM mukaan skaalattu
        </h2>
        <ul className="list-disc pl-5 text-sm">
          {skaalatutAmmatit.map(({ nimi, skaala }) => (
            <li key={nimi}>{nimi} ({skaala ? skaala : "Ei tietoa"})</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}

<TyoymparistoProfiili />

      <Input
        placeholder="Vapaa sanahaku..."
        value={haku}
        onChange={(e) => setHaku(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && hae()}
        className="max-w-md"
      />
  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label>Maakunta</label>
          <select
            value={maakuntaValinta}
            onChange={(e) => setMaakuntaValinta(e.target.value)}
            className="w-full border rounded p-1"
          >
            <option value="">Kaikki</option>
            {maakunnat.map((maakunta) => (
              <option key={maakunta} value={maakunta}>
                {maakunta}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Kaupungit</label>
          <select
            value={kaupunkiValinta}
            onChange={(e) => setKaupunkiValinta(e.target.value)}
            className="w-full border rounded p-1"
          >
            <option value="">Kaikki</option>
            {(maakuntaValinta && maakuntaKaupungit[maakuntaValinta] || []).map((kaupunki) => (
              <option key={kaupunki} value={kaupunki}>
                {kaupunki}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
  <label>Ammatit</label>
  <div className="border rounded p-2 max-h-40 overflow-y-auto">
    {kaikkiAmmattidata.map(({ nimi, lkm }) => (
      <div key={nimi} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={ammattivalinnat.includes(nimi)}
          onChange={(e) => {
            const checked = e.target.checked;
            setAmmattivalinnat((prev) =>
              checked ? [...prev, nimi] : prev.filter((valinta) => valinta !== nimi)
            );
          }}
          className="w-4 h-4"
        />
        <label>{nimi} ({lkm})</label>
      </div>
    ))}
  </div>
</div>
<div>
  <label>Toiveammatti</label>
  <div className="border rounded p-2 max-h-40 overflow-y-auto">
    {kaikkiToivedata.map(({ nimi, lkm }) => (
      <div key={nimi} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={toivevalinnat.includes(nimi)}
          onChange={(e) => {
            const checked = e.target.checked;
            setToivevalinnat((prev) =>
              checked ? [...prev, nimi] : prev.filter((valinta) => valinta !== nimi)
            );
          }}
          className="w-4 h-4"
        />
        <label>{nimi} ({lkm})</label>
      </div>
    ))}
  </div>
</div>
<div>
  <label>Koulutus</label>
  <div className="border rounded p-2 max-h-40 overflow-y-auto">
    {kaikkiKoulutusdata.map(({ nimi, lkm }) => (
      <div key={nimi} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={koulutusvalinnat.includes(nimi)}
          onChange={(e) => {
            const checked = e.target.checked;
            setKoulutusvalinnat((prev) =>
              checked ? [...prev, nimi] : prev.filter((valinta) => valinta !== nimi)
            );
          }}
          className="w-4 h-4"
        />
        <label>{nimi} ({lkm})</label>
      </div>
    ))}
  </div>
</div>
<div>
  <label>Osaamiset</label>
  <div className="border rounded p-2 max-h-40 overflow-y-auto">
    {kaikkiOsaamisdata.map(({ nimi, lkm }) => (
      <div key={nimi} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={osaamisvalinnat.includes(nimi)}
          onChange={(e) => {
            const checked = e.target.checked;
            setOsaamisvalinnat((prev) =>
              checked ? [...prev, nimi] : prev.filter((valinta) => valinta !== nimi)
            );
          }}
          className="w-4 h-4"
        />
        <label>{nimi} ({lkm})</label>
      </div>
    ))}
  </div>
</div>
{(maakuntaValinta || kaupunkiValinta || ammattivalinnat.length > 0 || toivevalinnat.length > 0 || koulutusvalinnat.length > 0 || osaamisvalinnat.length > 0) && (
  <div className="bg-gray-50 border border-gray-300 rounded p-4 mt-4 text-sm space-y-1 shadow-sm">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <div><strong>Maakunta:</strong> {maakuntaValinta || "Kaikki"}</div>
        <div><strong>Kaupunki:</strong> {kaupunkiValinta || "Kaikki"}</div>
        {ammattivalinnat.length > 0 && <div><strong>Ammatit:</strong> {ammattivalinnat.join(", ")}</div>}
        {toivevalinnat.length > 0 && <div><strong>Toiveet:</strong> {toivevalinnat.join(", ")}</div>}
        {koulutusvalinnat.length > 0 && <div><strong>Koulutus:</strong> {koulutusvalinnat.join(", ")}</div>}
        {osaamisvalinnat.length > 0 && <div><strong>Osaamiset:</strong> {osaamisvalinnat.join(", ")}</div>}
      </div>
      <button
        onClick={() => {
          setMaakuntaValinta("");
          setKaupunkiValinta("");
          setAmmattivalinnat([]);
          setToivevalinnat([]);
          setKoulutusvalinnat([]);
          setOsaamisvalinnat([]);
        }}
        className="text-xs text-blue-600 hover:underline mt-1"
      >
        Tyhjennä kaikki
      </button>
    </div>
  </div>
)}

      <div className="flex gap-4 mt-4">
        <button
          onClick={hae}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          HAE
        </button>
        <button
          onClick={() => {
            setHaku("");
            setMaakuntaValinta("");
            setKaupunkiValinta("");
            setAmmattivalinnat([]);
            setToivevalinnat([]);
            setKoulutusvalinnat([]);
            setOsaamisvalinnat([]);
            setTulokset([]);
          }}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          TYHJENNÄ
        </button>
        {loading && <Loader2 className="animate-spin w-5 h-5 text-blue-500" />}
        {!loading && (
        <div className="text-sm text-gray-700 mt-2">
        {tulokset.length > 0
            ? `${tulokset.length} hakijaa löytyi.`
            : "Ei hakijoita valitulla haulla."}
        </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 pt-4">
        {tulokset.map((p) => (
          <Card key={p.id}>
            <CardContent className="space-y-2 p-4">
              <h2 className="font-semibold text-lg">ID: {p.id}</h2>
              <h3 className="font-semibold">Esittely:</h3>
              <p>{p.esittely}</p>
              <p><strong>Esittely (10 sanaa):</strong> {p.esittely_10sanaa || "-"}</p>
              <p><strong>Työnhakualue:</strong> {p.työnhakualue?.join(', ')}</p>
              <p><strong>Kaupungit:</strong> {p.työnhakualue?.join(', ')}</p>
              <p><strong>Ammatit:</strong> {[...(p.ammatit || []), ...(p.valitut_ammatit || [])].join(', ')}</p>
              <p><strong>Työtoiveet:</strong> {(p.työtoiveet || []).join(', ')}</p>
              <p><strong>Koulutus:</strong> {Array.isArray(p.koulutus) ? p.koulutus.map((k: any) => k[0]).join(', ') : p.koulutus}</p>
              <p><strong>Työkokemus:</strong></p>
              <ul>
                {Array.isArray(p.työkokemus) && p.työkokemus.map((kokemus: any, index: number) => (
                  <li key={index}>{kokemus[0]} ({kokemus[1]})</li>
                ))}
              </ul>
              <p><strong>Osaamiset:</strong> {(p.osaamiset || []).join(', ')}</p>
              <p><strong>Valitut osaamiset:</strong> {(p.valitut_osaamiset || []).join(', ')}</p>
              <p><strong>Kielitaito:</strong> {(p.kielitaito || []).join(', ')}</p>
              <p><strong>Ajokortit:</strong> {(p.ajokortit || []).join(', ')}</p>
              <p><strong>Ajotiedot:</strong> {p.ajotiedot || "-"}</p>
              <p><strong>Lupatiedot:</strong> {(p.lupatiedot || []).join(', ')}</p>
              <p><strong>Työn aloitusajankohta:</strong> {p.työn_aloitusajankohta || p.aloitusajankohta || "-"}</p>
              <p><strong>Sosiaalisen median linkit:</strong> {(p.some || []).join(', ')}</p>
              <p><strong>MUU KOKEMUS:</strong> {p.muu_kokemus.length > 0 ? p.muu_kokemus.join(', ') : "-"}</p>
              <p><strong>Osaamisteksti:</strong> {p.osaamisteksti || "-"}</p>
              <p>📧 {p.sähköposti || "-"}</p>
              <p>📞 {p.puhelin || "-"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}