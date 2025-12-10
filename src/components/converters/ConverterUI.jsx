import { MdSwapVert } from "react-icons/md";
import { useConverter } from "../../hooks/useConverter";
import Loading from "../common/Loading";
import ConverterInput from "./ConverterInput";

export default function ConverterUI({
  converterData,
  rates = null,
  ratesLoading = false,
  ratesError = null,
}) {

  const {
    fromValue,
    toValue,
    fromUnit,
    toUnit,
    error,
    handleFromValueChange,
    handleToValueChange,
    handleFromUnitChange,
    handleToUnitChange,
    handleSwapUnits,
  } = useConverter(
    converterData.id,
    converterData.defaultFromUnit,
    converterData.defaultToUnit
  );

  // ---- VALUE CHANGE HANDLERS ----
  const handleFromChange = (value) => {
    handleFromValueChange(value, rates);
  };

  const handleToChange = (value) => {
    handleToValueChange(value, rates);
  };

  // ---- UNIT CHANGE HANDLERS ----
  const handleFromUnitSelect = (unit) => {
    handleFromUnitChange(unit, rates);
  };

  const handleToUnitSelect = (unit) => {
    handleToUnitChange(unit, rates);
  };

  // ---- SWAP BUTTON ----
  const handleSwap = () => {
    handleSwapUnits();
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8">

      {/* LOADING */}
      {ratesLoading && <Loading />}

      {/* ERROR STATE */}
      {ratesError && !rates && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6 text-red-100 text-sm">
          {ratesError}
        </div>
      )}

      {/* SUCCESS MESSAGE (Currency Only) */}
      {converterData.id === "currency" && rates && !ratesError && (
        <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 mb-6 text-blue-100 text-sm">
          Currency rates updated ✔
        </div>
      )}

      <div className="space-y-4">
        {/* ---- FROM INPUT ---- */}
        <ConverterInput
          value={fromValue}
          onValueChange={handleFromChange}
          unit={fromUnit}
          onUnitChange={handleFromUnitSelect}
          units={converterData.units}
          label="From"
          isLoading={ratesLoading}
        />

        {/* ---- SWAP BUTTON ---- */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition
                     hover:scale-110 active:scale-95 cursor-pointer"
            title="Swap units"
          >
            <MdSwapVert className="text-xl" />
          </button>
        </div>

        {/* ---- TO INPUT ---- */}
        <ConverterInput
          value={toValue}
          onValueChange={handleToChange}
          unit={toUnit}
          onUnitChange={handleToUnitSelect}
          units={converterData.units}
          label="To"
          isLoading={ratesLoading}
        />

        {/* ---- OTHER ERRORS ---- */}
        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-3 text-red-100 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
