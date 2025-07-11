'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import data from "@/data/profiilit.json";

export default function Kandidaattiselain() {
  const profiilit = data;
  const [alue, setAlue] = useState("");
  const [ammatti, setAmmatti] = useState("");
  const [osaaminen, setOsaaminen] = useState("");
  const [kieli, setKieli] = useState("");
  const [ajokortti, setAjokortti] = useState("");

  const suodatetut = profiilit.filter((p) => {
    const alueMatch = alue === "" || p.alueet?.some((a) => a.toLowerCase().includes(alue.toLowerCase()));
    const ammattiMatch = ammatti === "" || [
      ...(p.ammatit || []),
      ...(p.työtoiveet || []),
      ...(p.valitut_ammatit || [])
    ].some((a) => a.toLowerCase().includes(ammatti.toLowerCase()));

    const osaaminenMatch = osaaminen === "" || [
      ...(p.osaamiset || []),
      ...(p.valitut_osaamiset || [])
    ].some((o) => o.toLowerCase().includes(osaaminen.toLowerCase()));

    const kieliMatch = kieli === "" || p.kielitaito?.some((k) => k.toLowerCase().includes(kieli.toLowerCase()));
    const ajokorttiMatch = ajokortti === "" || p.ajokortit?.some((k) => k.toLowerCase().includes(ajokortti.toLowerCase()));

    return alueMatch && ammattiMatch && osaaminenMatch && kieliMatch && ajokorttiMatch;
  });

  return (
    <div className="p-6 space-y-4 bg-white min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-blue-900">Kandidaattien haku ja suodatus</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input placeholder="Alue" value={alue} onChange={(e) => setAlue(e.target.value)} />
        <Input placeholder="Ammatti / Työtoive / Valittu ammatti" value={ammatti} onChange={(e) => setAmmatti(e.target.value)} />
        <Input placeholder="Osaaminen / Valittu osaaminen" value={osaaminen} onChange={(e) => setOsaaminen(e.target.value)} />
        <Input placeholder="Kielitaito (esim. englanti)" value={kieli} onChange={(e) => setKieli(e.target.value)} />
        <Input placeholder="Ajokortti (esim. B)" value={ajokortti} onChange={(e) => setAjokortti(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {suodatetut.map((p) => (
          <Card key={p.id} className="border-blue-100 shadow-md rounded-2xl">
            <CardContent className="space-y-2 p-6 text-sm">
              <div className="text-lg font-semibold text-blue-800">{p.esittely_10sanaa}</div>
              <div><strong>Esittely:</strong> {p.esittely}</div>
              <div><strong>Alueet:</strong> {p.alueet?.join(", ")}</div>
              <div><strong>Työtoiveet:</strong> {p.työtoiveet?.join(", ")}</div>
              <div><strong>Ammatit:</strong> {[...(p.ammatit || []), ...(p.valitut_ammatit || [])].join(", ")}</div>
              <div><strong>Osaamiset:</strong> {[...(p.osaamiset || []), ...(p.valitut_osaamiset || [])].join(", ")}</div>
              <div><strong>Kielitaito:</strong> {p.kielitaito?.join(", ")}</div>
              <div><strong>Ajokortit:</strong> {p.ajokortit?.join(", ")} ({p.ajotiedot})</div>
              <div><strong>Aloitus:</strong> {p.aloitus}</div>
              <div><strong>Koulutus:</strong> {p.koulutus_teksti || p.koulutus}</div>
              <div><strong>Työkokemus:</strong> {p.työkokemus?.map((tk) => `${tk}`).join(" | ")}</div>
              <div><strong>Muu kokemus:</strong> {p.muu_kokemus?.join(" | ")}</div>
              <div><strong>Sosiaalinen media:</strong> {p.some?.join(", ")}</div>
              <div><strong>Puhelin:</strong> {p.puhelin || "-"}</div>
              <div><strong>Sähköposti:</strong> {p.sähköposti || "-"}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}