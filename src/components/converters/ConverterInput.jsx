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
    <div className="space-y-3">
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-gray-400 font-medium"
        >
          {label}
        </label>
      )}

      <div className="flex gap-2">
        {/* Input field */}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          placeholder="Enter value"
          disabled={isLoading}
          className="flex-1 bg-gray-900 border border-gray-700 text-gray-100
                     rounded-lg px-4 py-3 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:border-transparent transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {/* Unit selector */}
        <div className="shrink-0 w-28 sm:w-32">
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            disabled={isLoading}
            className="w-full bg-gray-900 border border-gray-700 text-gray-100
                       rounded-lg px-3 py-3 focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:border-transparent transition
                       appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {units.map((u) => (
              <option key={u.symbol} value={u.symbol}>
                {u.symbol} — {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
