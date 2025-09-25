import React from "react";

const SearchBar = ({ value, onChange }) => (
  <div className="mb-4">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name or location..."
      className="w-full px-4 py-2 border rounded"
    />
  </div>
);

export default SearchBar;
