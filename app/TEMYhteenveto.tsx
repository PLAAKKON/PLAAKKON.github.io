// components/TEMYhteenveto.tsx
import { useEffect, useState } from "react";

const TEMYhteenveto = () => {
  const [kokonaismaara, setKokonaismaara] = useState<number | null>(null);
  const [maakunnat, setMaakunnat] = useState<Record<string, number>>({});
  const [kuukausi, setKuukausi] = useState<string>("");

  useEffect(() => {
    fetch("/data/tem_tyottomat.json")
      .then((res) => res.json())
      .then((data) => {
        const viimeisinKuukausi = Object.keys(data)
          .filter((key) => key.match(/^\d{4}-\d{2}$/))
          .sort()
          .reverse()[0];

        const { kokonaismaara, maakunnat } = data[viimeisinKuukausi] || {};
        setKokonaismaara(kokonaismaara);
        setMaakunnat(maakunnat || {});
        setKuukausi(viimeisinKuukausi);
      })
      .catch((err) => console.error("TEM-tiedoston lukeminen epäonnistui:", err));
  }, []);

  if (!kokonaismaara || !Object.keys(maakunnat).length) return null;

  return (
    <div className="mt-10 bg-blue-50 border border-blue-200 rounded p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-center text-blue-900 mb-4">
        Työttömät työnhakijat maakunnittain ({kuukausi})
      </h3>
      <p className="text-center text-sm text-gray-700 mb-4">
        TEM:n ilmoittama kokonaismäärä:{" "}
        <strong>{kokonaismaara.toLocaleString("fi-FI")} hlö</strong>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-800">
        {Object.entries(maakunnat).map(([nimi, lkm]) => (
          <div key={nimi}>
            <strong>{nimi}:</strong> {Number(lkm).toLocaleString("fi-FI")} hlö
          </div>
        ))}
      </div>
    </div>
  );
};

export default TEMYhteenveto;
