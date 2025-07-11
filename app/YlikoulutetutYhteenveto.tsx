// components/YlikoulutetutYhteenveto.tsx
import { useEffect, useState, useMemo } from 'react';
import data from '../public/data/profiilit.json';

const isHigherEducation = (koulutus: string[][]) => {
  const longTerms = [
    "korkeakoulu", "yliopisto", "maisteri", "tradenomi", "insinööri", "tohtori",
    "university", "bachelor", "master", "philosophy", "engineering", "economics",
    "informatics", "science", "psychology", "sociology", "architecture"
  ];

  const shortTerms = [
    "DI", "FM", "HTM", "TkT", "LT", "BA", "MA", "PhD", "MBA", "BSc", "MSc", "LL.M", "LLB", "MD", "EdD", "BBA", "MFA", "MEng"
  ];

  const shortRegex = new RegExp(`\\b(${shortTerms.join("|")})\\b`, "i");

  return koulutus.some(([nimi]) => {
    const lower = nimi.toLowerCase();
    return longTerms.some(term => lower.includes(term.toLowerCase())) || shortRegex.test(nimi);
  });
};

const basicOccupations = [
  "myyjä", "asiakaspalvelija", "varastotyöntekijä", "lähetti", "siivooja",
  "ravintolatyöntekijä", "keittiöapulainen", "tuotannon työntekijä", "kokki",
  "logistiikkatyöntekijä", "pakkaaja", "linjatyöntekijä",
  "salesperson", "customer service", "warehouse", "cleaner", "kitchen", "production", "delivery"
];

const isOvereducated = (kand: any) => {
  const educated = isHigherEducation(kand.koulutus || []);
  const lowSkillJob = kand.työtoiveet?.some((toive: string) =>
    basicOccupations.some((basic) => toive.toLowerCase().includes(basic))
  );
  return educated && lowSkillJob;
};

const YlikoulutetutYhteenveto = () => {
  const ylikoulutetut = useMemo(() => data.filter(isOvereducated), []);

  if (!ylikoulutetut.length) return null;

  return (
    <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-center text-yellow-900 mb-4">
        Ylikoulutetut työnhakijat
      </h3>
      <p className="text-center text-sm text-gray-700 mb-4">
        Korkeasti koulutettuja henkilöitä, jotka hakevat töitä, joihin ei tyypillisesti vaadita korkeakoulututkintoa:
        <br />
        <strong>{ylikoulutetut.length.toLocaleString("fi-FI")} hlö</strong> (
        {((ylikoulutetut.length / data.length) * 100).toFixed(1)} % kaikista)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800">
        {ylikoulutetut.slice(0, 20).map((kand, idx) => (
          <div key={idx} className="border rounded p-2">
            <strong>{kand.koulutus?.[0]?.[0] || "–"}</strong><br />
            <span className="text-xs text-gray-600">
              Työtoiveet: {kand.työtoiveet?.join(", ") || "–"}
            </span>
          </div>
        ))}
      </div>
      {ylikoulutetut.length > 20 && (
        <p className="text-sm mt-4 text-center">
          ...ja {ylikoulutetut.length - 20} muuta.
        </p>
      )}
    </div>
  );
};

export default YlikoulutetutYhteenveto;


