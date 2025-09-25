import React, { useMemo, useState } from "react";
import spacesData from "../data/spaces.json";
import SearchBar from "../components/SearchBar";
import SpotCard from "../components/SpotCard";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return spacesData;
    return spacesData.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Discover study spaces</h1>
      <SearchBar value={query} onChange={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <SpotCard key={s.id} space={s} />
        ))}
      </div>
    </div>
  );
}
