const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name or location..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;