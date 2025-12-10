import { useParams } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import ConverterUI from "../components/converters/ConverterUI";
import { getConverterById } from "../data/converters";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

export default function ConverterDetail() {
  const { id } = useParams();
  const converter = getConverterById(id);

  const currencyRates = useCurrencyRates();
  const finalRates = id === "currency" ? currencyRates : { rates: null, loading: false, error: null };

  if (!converter) {
    return <NotFound message={`Converter "${id}" not found`} />;
  }

  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-14">
      {/* Hero Section */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col xs:flex-row items-start gap-4 sm:gap-6">
          <span className="text-4xl xs:text-5xl sm:text-6xl shrink-0">{converter.icon}</span>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {converter.category}
            </span>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {converter.name} Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">{converter.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {["Bidirectional", "Auto-precision", converter.id === "currency" ? "Live rates" : "Copy-safe"].map(
            (pill) => (
              <span
                key={pill}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap"
              >
                {pill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Converter UI */}
      <ConverterUI
        converterData={converter}
        rates={finalRates.rates}
        ratesLoading={finalRates.loading}
        ratesError={finalRates.error}
      />

      {/* Available Units */}
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Available Units</h2>

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
