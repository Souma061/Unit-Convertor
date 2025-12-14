import { useEffect } from "react";
import { MdInfoOutline, MdSwapVert } from "react-icons/md";
import { useSettings } from "../../context/SettingsContext.jsx";
import { useConverter } from "../../hooks/useConverter.js";
import { getFormula } from "../../utils/conversions/formulaGenerator.js";
import Skeleton from "../common/Skeleton.jsx";
import ConverterInput from "./ConverterInput.jsx";

export default function ConverterUI({
  converterData,
  rates = null,
  ratesLoading = false,
  ratesError = null,
  onConversionComplete = null,
  restoreData = null,
  onStateChange = null,
}) {
  const { precision: globalPrecision } = useSettings();

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
    setFromValue,
    setToValue,
    setFromUnit,
    setToUnit,
  } = useConverter(
    converterData.id,
    converterData.defaultFromUnit,
    converterData.defaultToUnit,
    globalPrecision
  );


  useEffect(() => {
    if (restoreData) {
      setFromUnit(restoreData.fromUnit);
      setToUnit(restoreData.toUnit);
      setFromValue(restoreData.fromVal);
      setToValue(restoreData.toVal);
    }
  }, [restoreData, setFromUnit, setToUnit, setFromValue, setToValue]);


  useEffect(() => {
    if (onStateChange) {
      onStateChange({ fromValue, fromUnit });
    }
  }, [fromValue, fromUnit, onStateChange]);

  // Re-run conversion when global precision changes
  useEffect(() => {
    if (fromValue) {
      handleFromValueChange(fromValue, rates);
    } else if (toValue) {
      handleToValueChange(toValue, rates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPrecision]); // internal handle functions are stable enough or will be updated via hook re-render

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


  if (converterData.id === "currency" && ratesLoading && !rates) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-4 shadow-xl max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          <Skeleton className="w-full h-20" />
          <Skeleton className="h-10 w-10 rounded-full md:mt-5 shrink-0" />
          <Skeleton className="w-full h-20" />
        </div>
        <Skeleton className="w-full h-12" />
      </div>
    );
  }


  const formula = getFormula(fromUnit, toUnit, converterData.id, converterData.units);

  const isTextConverter = ["number_base", "color"].includes(converterData.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-4 shadow-xl max-w-3xl mx-auto">

      {ratesLoading && rates && (
        <div className="absolute top-2 right-2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}

      {ratesError && !rates && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-3 xs:p-3 mb-4 text-red-800 dark:text-red-300 text-xs xs:text-sm">
          {ratesError}
        </div>
      )}

      {converterData.id === "currency" && rates && !ratesError && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-2 xs:p-2 mb-4 text-green-800 dark:text-green-300 text-xs xs:text-sm">
          Currency rates updated
        </div>
      )}


      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">


        <div className="flex-1 w-full space-y-1">
          <ConverterInput
            value={fromValue}
            onValueChange={handleFromChange}
            unit={fromUnit}
            onUnitChange={handleFromUnitSelect}
            units={converterData.units}
            label="From"
            isLoading={ratesLoading}
            allowText={isTextConverter}
          />
        </div>

        <div className="flex md:self-center shrink-0 pt-0 md:pt-6">
          <button
            onClick={handleSwap}
            className="h-10 w-10 inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full transition-all shadow-sm active:scale-95 border border-gray-200 dark:border-gray-500 cursor-pointer"
            title="Swap units"
          >
            <MdSwapVert className="text-xl" />
          </button>
        </div>


        <div className="flex-1 w-full space-y-1">
          <ConverterInput
            value={toValue}
            onValueChange={handleToChange}
            unit={toUnit}
            onUnitChange={handleToUnitSelect}
            units={converterData.units}
            label="To"
            isLoading={ratesLoading}
            allowText={isTextConverter}
          />
        </div>
      </div>


      {formula && (
        <div className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
          <MdInfoOutline className="text-blue-500 text-base shrink-0 mt-0.5" />
          <span>
            <strong className="font-semibold text-gray-700 dark:text-gray-300">Formula: </strong>
            {formula}
          </span>
        </div>
      )}


      <button
        onClick={() => {
          if (!toValue) return;
          navigator.clipboard.writeText(toValue);

          if (onConversionComplete) {
            onConversionComplete({
              fromVal: fromValue,
              fromUnit,
              toVal: toValue,
              toUnit
            });
          }

          const btn = document.getElementById("copy-btn");
          if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "Copied!";
            setTimeout(() => {
              btn.innerText = originalText;
            }, 2000);
          }
        }}
        id="copy-btn"
        disabled={!toValue}
        className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer text-sm tracking-wide"
      >
        Copy Result
      </button>

      {error && (
        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-2 text-red-800 dark:text-red-300 text-xs text-center">
          {error}
        </div>
      )}
    </div>
  );
}
