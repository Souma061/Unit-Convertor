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

  const handleFromChange = (value) => {
    handleFromValueChange(value, rates);
  };

  const handleToChange = (value) => {
    handleToValueChange(value, rates);
  };

  const handleFromUnitSelect = (unit) => {
    handleFromUnitChange(unit, rates);
  };

  const handleToUnitSelect = (unit) => {
    handleToUnitChange(unit, rates);
  };

  const handleSwap = () => {
    handleSwapUnits();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-4 xs:p-6 sm:p-8 shadow-md">
      {ratesLoading && <Loading />}

      {ratesError && !rates && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-3 xs:p-4 mb-4 xs:mb-6 text-red-800 dark:text-red-300 text-xs xs:text-sm">
          {ratesError}
        </div>
      )}

      {converterData.id === "currency" && rates && !ratesError && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-2.5 xs:p-3 mb-4 xs:mb-6 text-green-800 dark:text-green-300 text-xs xs:text-sm">
          Currency rates updated
        </div>
      )}

      <div className="space-y-5 xs:space-y-6">
        <ConverterInput
          value={fromValue}
          onValueChange={handleFromChange}
          unit={fromUnit}
          onUnitChange={handleFromUnitSelect}
          units={converterData.units}
          label="From"
          isLoading={ratesLoading}
        />

        <div className="flex justify-center py-1">
          <button
            onClick={handleSwap}
            className="h-10 xs:h-12 w-10 xs:w-12 inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full transition shadow-md cursor-pointer active:scale-95"
            title="Swap units"
          >
            <MdSwapVert className="text-lg xs:text-xl" />
          </button>
        </div>

        <ConverterInput
          value={toValue}
          onValueChange={handleToChange}
          unit={toUnit}
          onUnitChange={handleToUnitSelect}
          units={converterData.units}
          label="To"
          isLoading={ratesLoading}
        />

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-2.5 xs:p-3 text-red-800 dark:text-red-300 text-xs xs:text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
