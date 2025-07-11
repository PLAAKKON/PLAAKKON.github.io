'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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
  const laskuri: { [avain: string]: number } = {};

  profiilit.forEach((p) => {
    const alueet = p.työnhakualue || [];
    const maakuntaSet = new Set<string>();

    alueet.forEach((alue: string) => {
      const mk = Object.entries(maakuntaKaupungit).find(
        ([maakunta, kaupungit]) => maakunta === alue || kaupungit.includes(alue)
      );
      if (mk) maakuntaSet.add(mk[0]);
    });

    maakuntaSet.forEach((mk) => {
      laskuri[mk] = (laskuri[mk] || 0) + 1;
    });
  });

  return laskuri;
};
	
// Mahdolliset hakukentät
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
  const [maakuntaValinta, setMaakuntaValinta] = useState("");
  const [kaupunkiValinta, setKaupunkiValinta] = useState("");
  const [ammattivalinnat, setAmmattivalinnat] = useState<string[]>([]);
  const [toivevalinnat, setToivevalinnat] = useState<string[]>([]);
  const [koulutusvalinnat, setKoulutusvalinnat] = useState<string[]>([]);
  const [osaamisvalinnat, setOsaamisvalinnat] = useState<string[]>([]);
  const [haku, setHaku] = useState("");
  const [tulokset, setTulokset] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/data/profiilit.json")
      .then((res) => res.json())
      .then((data) => setProfiilit(data));
  }, []);

  const hae = () => {
    setLoading(true);
    setTimeout(() => {
      const tulos = profiilit.filter((p) => {
        const hakuosuma =
          haku.trim() === "" ||
          JSON.stringify(p).toLowerCase().includes(haku.toLowerCase());

          const maakuntaosuma =
          maakuntaValinta === "" ||
          (p.työnhakualue || []).some((alue: string) =>
            alue === maakuntaValinta || (maakuntaKaupungit[maakuntaValinta] || []).includes(alue)
          );

        const kaupunkiOsuma =
          kaupunkiValinta === "" ||
          (p.työnhakualue || []).includes(kaupunkiValinta);

        const ammattiosuma =
          ammattivalinnat.length === 0 ||
          ammattivalinnat.some((valinta) =>
            (p.ammatit || []).includes(valinta) || (p.valitut_ammatit || []).includes(valinta)
          );

        const toiveosuma =
          toivevalinnat.length === 0 ||
          toivevalinnat.some((valinta) => (p.työtoiveet || []).includes(valinta));
		  
        const osaamisosuma =
          osaamisvalinnat.length === 0 ||
          osaamisvalinnat.some((valinta) =>
            (p.osaamiset || []).some((osaaminen: string) =>
              osaaminen.toLowerCase().includes(valinta.toLowerCase())
            )
          );

        const koulutusosuma =
          koulutusvalinnat.length === 0 ||
          koulutusvalinnat.some((valinta) =>
            Array.isArray(p.koulutus) &&
            p.koulutus.some((k: any) => k[0]?.split(' / ')[0].toLowerCase().includes(valinta.toLowerCase()))
          );

        return hakuosuma && maakuntaosuma && kaupunkiOsuma && ammattiosuma && toiveosuma && koulutusosuma && osaamisosuma;;
      });
      setTulokset(tulos);
      setLoading(false);
    }, 400);
  };

const ammattidata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "ammatit")).slice(0, 20);
const toivedata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "työtoiveet", suodattamattomatToiveet)).slice(0, 20);
const osaamisdata = järjestäLukumääränMukaan(laskeEsiintymät(profiilit, "osaamiset")).slice(0, 20);
const maakuntadata = järjestäLukumääränMukaan(laskeMaakuntaEsiintymät(profiilit)).slice(0, 20);
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
).slice(0, 20);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Kandidaattien hakukone</h1>

      {/* TOP 20 DASHBOARD */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Työttömien ammatit</h2>
    <ul className="list-disc pl-5 text-sm">
      {ammattidata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm})</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Työtoiveet</h2>
    <ul className="list-disc pl-5 text-sm">
      {toivedata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm})</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Koulutukset</h2>
    <ul className="list-disc pl-5 text-sm">
      {koulutusdata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm})</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Osaamiset</h2>
    <ul className="list-disc pl-5 text-sm">
      {osaamisdata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm})</li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-xl font-bold mb-2">Top 20 Maakunnat</h2>
    <ul className="list-disc pl-5 text-sm">
      {maakuntadata.map(({ nimi, lkm }) => (
        <li key={nimi}>{nimi} ({lkm})</li>
      ))}
    </ul>
  </div>
</div>

{/* Yhteenveto TEM-tiedolla ja omalla profiililaskennalla */}
<div className="mt-10 bg-white shadow-md rounded p-4 max-w-lg mx-auto border">
  <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
    Työ- ja elinkeinoministeriön mukaan
  </h3>
  <p className="text-center mb-2">
    Työttömiä työnhakijoita on yhteensä:{" "}
    <span className="font-bold text-blue-700">{profiilit.length.toLocaleString()} hlö</span>
  </p>
  <p className="text-center text-sm text-gray-600 mb-4">
    (Luku perustuu analysoituihin työnhakijaprofiileihin)
  </p>

  <h4 className="font-semibold text-center text-sm mb-2">Maakuntien osuudet</h4>
  <ul className="text-sm grid grid-cols-2 gap-1">
    {järjestäLukumääränMukaan(laskeMaakuntaEsiintymät(profiilit)).map(({ nimi, lkm }) => {
      const osuus = ((lkm / profiilit.length) * 100).toFixed(1);
      return (
        <li key={nimi}>
          {nimi}: {lkm} hlö ({osuus}%)
        </li>
      );
    })}
  </ul>
</div>
  
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
    {ammattidata.map(({ nimi, lkm }) => (
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
    {toivedata.map(({ nimi, lkm }) => (
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
    {koulutusdata.map(({ nimi, lkm }) => (
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
    {osaamisdata.map(({ nimi, lkm }) => (
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
        {!loading && tulokset.length > 0 && (
          <div>{tulokset.length} hakijaa löytyi.</div>
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