import React, { useState } from "react";
import spaces from "../data/spaces.json";
import SpotCard from "../components/SpotCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [query, setQuery] = useState("");

  const filtered = spaces.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Discover Study Spaces</h1>
      <SearchBar value={query} onChange={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <SpotCard key={s.id} space={s} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
