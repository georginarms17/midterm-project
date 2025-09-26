import React from "react";

const SearchBar = ({ value, onChange }) => (
  <div className="bg-white mx-20 mb-10 rounded-3xl">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name or location..."
      className="text-[#004A3F] w-full px-10 py-2 border rounded-3xl"
    />
  </div>
);

export default SearchBar;
