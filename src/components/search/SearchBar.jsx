import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import SearchResults from "./SearchResults";

export default function SearchBar({ query, onQueryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

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

  const handleSearch = (e) => {
    onQueryChange(e.target.value);
    setHighlightIndex(0);
    setIsOpen(true);
  };

  const handleSelectConverter = (converterId) => {
    onQueryChange("");
    setIsOpen(false);
    navigate(`/converter/${converterId}`);
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
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search converters or units..."
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg pl-12 pr-12 py-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        )}
      </div>

      {isOpen && query.length > 0 && results.length > 0 && (
        <SearchResults
          results={results}
          onSelectConverter={handleSelectConverter}
          highlightIndex={highlightIndex}
        />
      )}
    </div>
  );
}
