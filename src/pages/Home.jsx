
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ConverterGrid from "../components/converters/ConverterGrid";
import SearchBar from "../components/search/SearchBar";
import { useSearch } from "../hooks/useSearch";

export default function Home() {
  const [query, setQuery] = useState("");
  const { results } = useSearch(query);

  return (
    <div className="space-y-10 md:space-y-14 lg:space-y-16">
      <Helmet>
        <title>Metriq - Precision Converter Suite</title>
        <meta name="description" content="Fast and accurate unit converter for length, weight, currency, and more." />
      </Helmet>
      {/* Hero Section */}
      <section className="space-y-6 md:space-y-8">
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Convert units with speed and precision
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Search instantly across 12+ professional converters including Data & Cooking. Experience live currency rates, smart formula explanations, automatic history tracking, and effortless precision workflows.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl">
          <SearchBar query={query} onQueryChange={setQuery} />
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          {["Smart Formulas", "History Tracking", "Live Rates", "Auto-precision"].map((feature) => (
            <div
              key={feature}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800 text-center truncate"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {query ? `Search Results (${results.length})` : "All Converters"}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1.5 md:mt-2">Click any converter to get started</p>
        </div>

        <ConverterGrid converters={results} />
      </section>
    </div>
  );
}
