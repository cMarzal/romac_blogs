import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Search = ({ onResult }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const inputRef = useRef(null);

  // Update search value when URL params change
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (location.pathname === "/posts") {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      } else {
        navigate(`/posts?search=${query}`);
      }
      if (onResult) onResult();
    }
  };

  const handleClear = () => {
    setSearchValue("");
    if (location.pathname === "/posts") {
      const newParams = { ...Object.fromEntries(searchParams) };
      delete newParams.search;
      setSearchParams(newParams);
    }
  };

  return (
    <div className={`relative group transition-all duration-300 ${
      isFocused ? "scale-[1.02]" : "scale-100"
    }`}>
      <div className={`flex items-center gap-3 bg-white rounded-full shadow-sm border-2 transition-all duration-300 ${
        isFocused 
          ? "border-red-500 shadow-md" 
          : "border-gray-200 hover:border-gray-300"
      }`}>
        <div className="pl-4 text-gray-400">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search posts..."
          className="w-full py-1.5 pr-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />

        {searchValue && (
          <button
            onClick={handleClear}
            className="pr-4 text-gray-400 hover:text-gray-600 transition-colors"
            title="Clear search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;