import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import SearchBar from "../components/search/SearchBar";
import ConverterGrid from "../components/converters/ConverterGrid";

export default function Home() {
  const [query, setQuery] = useState(""); // 🔥 central search state
  const { results } = useSearch(query);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">
          Find the perfect converter for your needs
        </h2>
        <p className="text-gray-400">
          Explore a wide range of unit converters to simplify your
          calculations and conversions.
        </p>
      </div>

      {/* 🔥 Pass query + updater to SearchBar */}
      <SearchBar query={query} onQueryChange={setQuery} />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">
          {query ? `Search Results (${results.length})` : "Popular Converters"}
        </h3>

        <ConverterGrid converters={results} />
      </div>
    </div>
  );
}
