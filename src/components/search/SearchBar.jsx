import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch.js";
import SearchResults from "./SearchResults.jsx";

export default function SearchBar({ query, onQueryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const { results } = useSearch(query);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ctrl+K to focus
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleSearch = (e) => {
    onQueryChange(e.target.value);
    setHighlightIndex(0);
    setIsOpen(true);
  };

  const handleSelectConverter = (converterId) => {
    onQueryChange("");
    setIsOpen(false);
    if (converterId === 'science') {
      navigate('/science');
    } else {
      navigate(`/converter/${converterId}`);
    }
  };

  const handleClear = () => {
    onQueryChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev + 1 < results.length ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : results.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSelectConverter(results[highlightIndex].id);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full z-30">
      <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
        <FiSearch className={`absolute left-5 top-1/2 -translate-y-1/2 text-xl transition-colors duration-300 ${isFocused ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => { setIsOpen(true); setIsFocused(true); }}
          onBlur={() => setIsFocused(false)}
          placeholder="Search converters or units..."
          className={`w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl pl-14 pr-14 py-4
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                     shadow-sm hover:shadow-md focus:shadow-xl dark:focus:shadow-blue-900/10
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     transition-all duration-300 text-base md:text-lg tracking-wide`}
        />

        {query ? (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-500 transition-all cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        ) : (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center h-6 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-sm">
              <span className="text-xs mr-1">⌘</span>K
            </kbd>
          </div>
        )}
      </div>

      {isOpen && query.length > 0 && (
        <SearchResults
          results={results}
          onSelectConverter={handleSelectConverter}
          highlightIndex={highlightIndex}
        />
      )}
    </div>
  );
}
