
import { useState } from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import ConverterUI from "../components/converters/ConverterUI";
import RecentConversions from "../components/converters/RecentConversions";
import ReferenceTable from "../components/converters/ReferenceTable"; // Import
import { getConverterById } from "../data/converters";
import { useCurrencyRates } from "../hooks/useCurrencyRates";
import { useRecentConversions } from "../hooks/useRecentConversions";

export default function ConverterDetail() {
  const { id } = useParams();
  const converter = getConverterById(id);

  const currencyRates = useCurrencyRates();
  const finalRates = id === "currency" ? currencyRates : { rates: null, loading: false, error: null };

  const { recents, addRecent, clearRecents } = useRecentConversions(id);
  const [restoreData, setRestoreData] = useState(null);

  // Track state for Reference Table
  const [currentState, setCurrentState] = useState({ fromValue: "", fromUnit: "" });

  if (!converter) {
    return <NotFound message={`Converter "${id}" not found`} />;
  }

  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-14">
      <Helmet>
        <title>{converter.name} Converter - UnitMaster</title>
        <meta name="description" content={converter.description} />
      </Helmet>

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
      >
        <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
        Back to Converters
      </Link>

      {/* Split Layout: Hero Left, Converter Right on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Info Column */}
        <div className="md:col-span-5 space-y-6 md:sticky md:top-24">
          <div className="space-y-4">
            <span className="text-5xl md:text-6xl inline-block">{converter.icon}</span>
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {converter.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
                {converter.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-base md:text-lg leading-relaxed">
                {converter.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Bidirectional", "Auto-precision", converter.id === "currency" ? "Live rates" : "Copy-safe"].map(
              (pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs font-medium text-gray-600 dark:text-gray-400"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Converter Column */}
        <div className="md:col-span-7 w-full space-y-6">
          <ConverterUI
            converterData={converter}
            rates={finalRates.rates}
            ratesLoading={finalRates.loading}
            ratesError={finalRates.error}
            onConversionComplete={addRecent}
            restoreData={restoreData}
            onStateChange={setCurrentState} // Pass handler
          />

          <RecentConversions
            recents={recents}
            onClear={clearRecents}
            onRestore={setRestoreData}
          />

          <ReferenceTable
            value={currentState.fromValue}
            fromUnit={currentState.fromUnit}
            units={converter.units}
            converterId={converter.id}
            rates={finalRates.rates}
          />
        </div>
      </div>

      {/* Available Units (Full Width Below) */}
      <div className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Available Units</h2>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {converter.units.map((unit) => (
            <button
              key={unit.symbol}
              onClick={() => navigator.clipboard?.writeText(unit.symbol)}
              className="group bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 rounded-lg p-2 sm:p-3 text-left transition cursor-pointer"
            >
              <div className="font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-1 text-sm sm:text-base">
                {unit.symbol}
                <span className="text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition">copy</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">{unit.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
