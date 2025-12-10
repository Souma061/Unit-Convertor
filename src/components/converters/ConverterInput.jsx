import { useId } from "react";

export default function ConverterInput({
  value,
  onValueChange,
  unit,
  onUnitChange,
  units,
  label,
  isLoading = false,
  error = null,
}) {
  const id = useId();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow: empty, -, digit, ., decimal numbers
    if (inputValue === "" || /^-?\d*\.?\d*$/.test(inputValue)) {
      onValueChange(inputValue);
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
          inputMode="decimal"
          value={value}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          placeholder="Enter value"
          disabled={isLoading}
          className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white
                     rounded-lg px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:border-transparent transition
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-sm
                     placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />

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
