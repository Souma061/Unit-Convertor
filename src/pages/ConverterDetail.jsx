
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import NotFound from "../components/common/NotFound.jsx";
import ConverterUI from "../components/converters/ConverterUI.jsx";
import RecentConversions from "../components/converters/RecentConversions.jsx";
import ReferenceTable from "../components/converters/ReferenceTable.jsx";
import { getConverterById } from "../data/converters.js";
import { useCurrencyRates } from "../hooks/useCurrencyRates.js";
import { useRecentConversions } from "../hooks/useRecentConversions.js";

export default function ConverterDetail() {
  const { id } = useParams();
  const converter = getConverterById(id);

  const currencyRates = useCurrencyRates();
  const finalRates = id === "currency" ? currencyRates : { rates: null, loading: false, error: null };

  const { recents, addRecent, clearRecents } = useRecentConversions(id);
  const [restoreData, setRestoreData] = useState(null);


  const [currentState, setCurrentState] = useState({ fromValue: "", fromUnit: "" });
  const [copiedUnit, setCopiedUnit] = useState(null);

  useEffect(() => {
    if (copiedUnit) {
      const timer = setTimeout(() => setCopiedUnit(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedUnit]);

  const handleCopyUnit = (symbol) => {
    navigator.clipboard.writeText(symbol);
    setCopiedUnit(symbol);
  };

  if (!converter) {
    return <NotFound message={`Converter "${id}" not found`} />;
  }

  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-14">
      <Helmet>
        <title>{converter.name} Converter - Metriq</title>
        <meta name="description" content={converter.description} />
      </Helmet>


      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
      >
        <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
        Back to Converters
      </Link>


      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">

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


        <div className="md:col-span-7 w-full space-y-6">
          <ConverterUI
            key={converter.id}
            converterData={converter}
            rates={finalRates.rates}
            ratesLoading={finalRates.loading}
            ratesError={finalRates.error}
            onConversionComplete={addRecent}
            restoreData={restoreData}
            onStateChange={setCurrentState}
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


      <div className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Available Units</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {converter.units.map((unit) => (
            <div
              key={unit.symbol}
              onClick={() => handleCopyUnit(unit.symbol)}
              className="group relative p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex justify-between items-start">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {unit.name}
                </div>
                {copiedUnit === unit.symbol ? (
                  <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full fade-in">
                    Copied!
                  </span>
                ) : (
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] text-blue-600 dark:text-blue-400 font-medium transition-opacity">
                    Click to copy
                  </span>
                )}
              </div>
              <div className="font-mono font-medium text-gray-900 dark:text-gray-200 break-all text-lg">
                {unit.symbol}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


