import React, { useState } from "react";
import spaces from "../data/spaces.json";
import SpotCard from "../components/SpotCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  //query (value entered in the search bar) is STATE, initially an empty string ("")
  //setQuery function used to update the STATE (query)
  const [query, setQuery] = useState("");

  //spaces is the array of data of the study spaces from the spaces.json file
  const filtered = spaces.filter((s) => {
    const q = query.toLowerCase();                                                  //sets the input (query) to lowercase
    return (
      //filter will base on the name and location of the study spaces, convert to lowercase and check if the input is included in the name and location
      s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="bg-[#FFDBDB] rounded-4xl mb-10 py-[20px] shadow-lg">
        <h1 className="text-[50px] text-[#004A3F] text-center font-bold my-10">
          Discover Study Spaces
        </h1>
        <p className="text-[18px] text-[#004A3F] text-center mb-10">
          Discover the perfect study space or co-working hub near you.  
        </p>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filtered.map((s) => (
          <SpotCard key={s.id} space={s} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;