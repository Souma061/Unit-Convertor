
import { useState } from "react";

function countSigFigs(n) {
  if (n === null || n === undefined || n === "") return 0;
  let str = n.toString().trim();
  if (str === "") return 0;

  // Handle scientific notation e.g., 1.23e4 -> count 1.23
  if (str.toLowerCase().includes('e')) {
    const parts = str.toLowerCase().split('e');
    return countSigFigs(parts[0]);
  }

  // Strip sign
  str = str.replace(/^-/, '');

  // Handle exact zero
  if (parseFloat(str) === 0) {
    // 0 -> 1, 0.00 -> 1? 0.00 is usually 1 (the last zero).
    // Wait: 0.00 -> 3 sig figs? No.
    // Zero is a special case. "0" has 1 sig fig.
    // "0.00" has 1?
    // Rule: "Trailing zeros in a decimal number are significant".
    // But leading zeros are not.
    // So 0.00... the leading 0s are not.
    // So it might be 1 sig fig (the last zero?). Or are ALL zeros significant if they are trailing?
    // 0.00500. Leading 0s (0.00) not sig. 5 is sig. trailing 00 are sig. -> 3.
    // But pure 0? 0.0 is 2 sig figs?
    // "0.0" has 2 significant figures.
    // "0.00" has 3 significant figures.
    // "0" has 1 significant figure.

    if (str.includes('.')) {
      // 0.00 -> 3 digits.
      // Leading zeros don't count?
      // 0.00
      // Leading zero before decimal doesn't count.
      // Zeros after decimal...
      // Actually, 0.0 is 2 sig figs.
      // 0.00 is 3 sig figs.
      // It indicates precision.
      return str.length - (str.includes('.') ? 1 : 0);
    }
  }

  const hasDecimal = str.includes('.');
  const strNoDot = str.replace('.', '');

  // Remove leading zeros
  const withoutLeading = strNoDot.replace(/^0+/, '');

  // Trailing zeros:
  // If there was a decimal point, all trailing number digits are significant.
  if (hasDecimal) {
    return withoutLeading.length;
  }

  // If no decimal point, trailing zeros are NOT significant.
  return withoutLeading.replace(/0+$/, '').length;
}

export default function SigFigCalculator() {
  const [input, setInput] = useState("");
  const [sigFigs, setSigFigs] = useState(0);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setSigFigs(countSigFigs(val));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="text-blue-600 dark:text-blue-400">#</span> Significant Figures
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number
          </label>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="e.g. 0.00500 or 1.23e4"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white sm:text-sm p-2.5"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Significant Figures:</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sigFigs}</span>
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500">
          <p>Rules:</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Non-zeros are always significant.</li>
            <li>Zeros between non-zeros are significant.</li>
            <li>Leading zeros are never significant.</li>
            <li>Trailing zeros are significant only if there is a decimal point.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


