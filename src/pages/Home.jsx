
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ConverterGrid from "../components/converters/ConverterGrid.jsx";
import SearchBar from "../components/search/SearchBar.jsx";
import { useSearch } from "../hooks/useSearch.js";

export default function Home() {
  const [query, setQuery] = useState("");
  const { results } = useSearch(query);

  return (
    <div className="space-y-10 md:space-y-14 lg:space-y-16">
      <Helmet>
        <title>Metriq - Precision Converter Suite</title>
        <meta name="description" content="Fast and accurate unit converter for length, weight, currency, and more." />
      </Helmet>
      { }
      <section className="space-y-6 md:space-y-8">
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Convert units with speed and precision
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Access 16+ professional tools including new Science & Developer modes. Experience smart paste, live currency rates, deep formula insights, and automatic history tracking designed for students, engineers, and creators.
          </p>
        </div>

        { }
        <div className="w-full max-w-2xl">
          <SearchBar query={query} onQueryChange={setQuery} />
        </div>

        { }
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

        { }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Link to="/science" className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                ⚛️ Physics & Engineering Mode
              </h3>
              <p className="mt-2 text-indigo-100 text-sm font-medium">
                Access E=mc², Significant Figures Calculator, and Physical Constants.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors" />
          </Link>
        </div>
      </section>


      <section className="space-y-8 md:space-y-12 pb-12">
        {query ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Search Results ({results.length})
            </h2>
            <ConverterGrid converters={results} />
          </div>
        ) : (
          <div className="space-y-12">
            {[
              {
                title: "Essential Tools",
                ids: ["length", "weight", "temperature", "time", "area", "speed", "volume"]
              },
              {
                title: "Developer Suite",
                ids: ["data", "number_base", "color", "screen"]
              },
              {
                title: "Physics & Engineering",
                ids: ["energy", "pressure", "angle"]
              },
              {
                title: "Lifestyle",
                ids: ["currency", "cooking"]
              }
            ].map((category) => {
              const categoryConverters = results.filter(c => category.ids.includes(c.id));
              if (categoryConverters.length === 0) return null;

              return (
                <div key={category.title} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h2>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                  <ConverterGrid converters={categoryConverters} />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
