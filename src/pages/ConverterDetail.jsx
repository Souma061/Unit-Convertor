import { useParams } from "react-router-dom";
import { getConverterById } from "../data/converters";
import ConverterUI from "../components/converters/ConverterUI";
import NotFound from "../components/common/NotFound";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

export default function ConverterDetail() {
  const { id } = useParams();
  const converter = getConverterById(id);

  // Always call the hook, but only use it for currency converter
  const currencyRates = useCurrencyRates();
  const finalRates = id === "currency" ? currencyRates : { rates: null, loading: false, error: null };

  if (!converter) {
    return <NotFound message={`Converter "${id}" not found`} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{converter.icon}</span>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
              {converter.name} Converter
            </h1>
            <p className="text-gray-400 text-lg mt-2">{converter.description}</p>
          </div>
        </div>
      </div>

      {/* Converter UI */}
      <ConverterUI
        converterData={converter}
        rates={finalRates.rates}
        ratesLoading={finalRates.loading}
        ratesError={finalRates.error}
      />

      {/* Info Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-100">Available Units</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {converter.units.map((unit) => (
            <div
              key={unit.symbol}
              className="bg-gray-800 rounded-lg p-3 text-center hover:bg-gray-700 transition"
            >
              <div className="font-bold text-blue-400">{unit.symbol}</div>
              <div className="text-xs text-gray-400">{unit.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
