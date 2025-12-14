import { useId } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function ConverterSelector({
  options,
  selectedValue,
  onChange,
  label,
}) {
  const labelId = useId(); // Ensures label + select are linked

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={labelId}
          className="text-sm text-gray-700 dark:text-gray-300 font-medium"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <select
          id={labelId}
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white
                     rounded-lg px-4 py-3 pr-10 focus:outline-none
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition appearance-none cursor-pointer
                     text-base sm:text-sm"
        >
          {options.map((option) => (
            <option key={option.symbol} value={option.symbol}>
              {option.symbol} — {option.name}
            </option>
          ))}
        </select>

        <FiChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  );
}


