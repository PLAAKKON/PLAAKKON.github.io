import React from "react";

interface KarttaKomponenttiProps {
  ammatti: string;
  profiilit: any[];
  temTilasto: any;
  kaikkiAmmattidata: { nimi: string; lkm: number }[];
  kaupungitMaakunnittain: Record<string, string[]>;
}

export default function KarttaKomponentti({
  ammatti,
  profiilit,
  temTilasto,
  kaikkiAmmattidata,
  kaupungitMaakunnittain
}: KarttaKomponenttiProps) {
  try {
    const kokoProfiiliMäärä = Array.isArray(profiilit)
      ? profiilit.filter(p => Array.isArray(p?.ammatit) && p.ammatit.includes(ammatti)).length
      : 0;

    const baseCount =
      kaikkiAmmattidata?.find(a => a.nimi === ammatti)?.lkm ?? kokoProfiiliMäärä;

    const globalScale =
      temTilasto && profiilit.length > 0
        ? temTilasto.kokonaismaara / profiilit.length
        : 1;

    const virallinenKokonaismäärä = Math.round(baseCount * globalScale);
    const skaalauskerroin = virallinenKokonaismäärä / (kokoProfiiliMäärä || 1);

    const ulkomaat = [
      "ulkomaa", "japani", "saksa", "ranska", "italia", "espanja", "venäjä", "ruotsi",
      "norja", "tanska", "viro", "latvia", "liettua", "puola", "unkari", "romania",
      "bulgaria", "kreikka", "turkki", "yhdysvallat", "kanada", "meksiko", "brasilia",
      "argentiina", "chile", "peru", "kiina", "intia", "pakistan", "bangladesh",
      "indonesia", "vietnami", "thai", "arabia", "ukraina", "korea", "australia",
      "uusi-seelanti", "qatar", "emiraatit", "kenia", "ghana", "egypti", "nigeria",
      "iran", "irak", "afganistan", "haiti", "kazakstan", "singapore"
    ];

    const ammattilaiset = Array.isArray(profiilit)
      ? profiilit.filter(
          (p) =>
            Array.isArray(p?.ammatit) &&
            p.ammatit.includes(ammatti) &&
            !(p.työnhakualue || []).some((alue: string) =>
              ulkomaat.some((k) => alue.toLowerCase().includes(k))
            )
        )
      : [];

    const maakuntavaikutus: Record<string, number> = {};
    ammattilaiset.forEach((p) => {
      const alueet = p.työnhakualue || [];
      const mukanaMaakunnat = new Set<string>();

      alueet.forEach((alue) => {
        const maakunta = Object.entries(kaupungitMaakunnittain).find(([, kunnat]) =>
          kunnat.includes(alue)
        )?.[0];

        if (maakunta && !mukanaMaakunnat.has(maakunta)) {
          maakuntavaikutus[maakunta] = (maakuntavaikutus[maakunta] || 0) + 1;
          mukanaMaakunnat.add(maakunta);
        }
      });
    });

    const sorted = Object.entries(maakuntavaikutus).sort((a, b) => b[1] - a[1]);

    const monikkoAmmatti =
      ammatti.endsWith("ja") ? ammatti.slice(0, -1) + "ia"
        : ammatti.endsWith("jä") ? ammatti.slice(0, -1) + "iä"
          : ammatti.endsWith("mies") ? ammatti.slice(0, -4) + "miehiä"
            : ammatti;

    const ammattiTiedot = temTilasto.ammatit?.[ammatti];
    const kokonaisTyopaikat = ammattiTiedot?.kokonaismaara;
    const maakuntaTyopaikat = ammattiTiedot?.maakunnat || {};

    return (
      <div className="space-y-2">
        <p className="text-sm font-semibold">
          {monikkoAmmatti} arvioitu koko maassa: {virallinenKokonaismäärä.toLocaleString('fi-FI')} työtöntä
        </p>
        <p className="text-sm text-gray-600">
          Valitun ammatin (<strong>{ammatti}</strong>) arvioidut työttömät ja työttömyysprosentit maakunnittain. Perustuu omaan profiilijakaumaan ja TEM:n työttömyyslukuihin.
        </p>
        <p className="text-xs text-gray-500">
          Laskentakaava: työttömyysprosentti = arvioidut työttömät / (arvioidut työttömät + arvioidut työpaikat). Tiedot perustuvat tem_tyottomat.json-tiedostoon.
        </p>
        <ul className="text-sm list-disc pl-5">
          {sorted.map(([maakunta, määrä]) => {
            const skaalattu = Math.round(määrä * skaalauskerroin);
            const tyopaikat = maakuntaTyopaikat[maakunta];
            const prosentti = tyopaikat ? ((skaalattu / (skaalattu + tyopaikat)) * 100).toFixed(1) : "-";
            const kaava = tyopaikat ? `${skaalattu} / (${skaalattu} + ${tyopaikat.toLocaleString('fi-FI')})` : "-";

            return (
              <li key={maakunta}>
                {maakunta}: arvioitu {skaalattu.toLocaleString('fi-FI')} työtöntä – ammatin arvioitu työttömyysprosentti {prosentti}%<br />
                <span className="text-gray-500 text-xs">Laskentakaava: {kaava}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Virhe KarttaKomponentti-komponentissa:", error);
    return <div>Virhe ladattaessa karttatietoja.</div>;
  }
}
