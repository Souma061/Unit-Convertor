import { useId } from "react";
import { MdContentPaste } from "react-icons/md";
import { smartParse } from "../../utils/parsing/smartParser.js";

export default function ConverterInput({
  value,
  onValueChange,
  unit,
  onUnitChange,
  units,
  label,
  isLoading = false,
  error = null,
  allowText = false,
}) {
  const id = useId();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (allowText) {
      onValueChange(inputValue);
      return;
    }

    // Allow: empty, -, digit, ., decimal numbers
    if (inputValue === "" || /^-?\d*\.?\d*$/.test(inputValue)) {
      onValueChange(inputValue);
    }
  };

  const processPaste = (text) => {
    const result = smartParse(text, units);

    if (result) {
      onValueChange(result.value);
      if (result.unit && result.unit !== unit) {
        onUnitChange(result.unit);
      }
    } else {
      if (allowText) {
        onValueChange(text);
      } else if (/^-?\d*\.?\d*$/.test(text)) {
        onValueChange(text);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    processPaste(text);
  };

  const handlePasteButton = async () => {
    try {
      const text = await navigator.clipboard.readText();
      processPaste(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="flex flex-col xs:flex-row gap-2 xs:gap-2.5">
        <input
          id={id}
          type="text"
          inputMode={allowText ? "text" : "decimal"}
          value={value}
          onChange={handleInputChange}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          placeholder="Enter value"
          disabled={isLoading}
          className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white
                     rounded-lg px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:border-transparent transition
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-sm
                     placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />

        <div className="flex gap-2">
          <button
            onClick={handlePasteButton}
            title="Smart Paste"
            className="p-2.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <MdContentPaste />
          </button>
        </div>

        <div className="shrink-0 w-24 xs:w-28 sm:w-32">
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            disabled={isLoading}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white
                       rounded-lg px-2 xs:px-3 py-2 xs:py-2.5 text-xs xs:text-sm focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:border-transparent transition
                       appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {units.map((u) => (
              <option key={u.symbol} value={u.symbol}>
                {u.symbol} - {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
    </div>
  );
}


