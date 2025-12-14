
import { useMemo } from "react";
import { useSettings } from "../../context/SettingsContext.jsx";
import { convertValue } from "../../utils/conversions/conversionEngine.js";
import { formatResult } from "../../utils/formatting/decimalPrecision.js";

export default function ReferenceTable({
  value,
  fromUnit,
  units,
  converterId,
  rates = null,
}) {
  const { precision } = useSettings();

  // Memoize the list of conversions to avoid recalculating on every render
  const conversions = useMemo(() => {
    if (!value || isNaN(value)) return [];

    return units
      .filter((unit) => unit.symbol !== fromUnit) // Don't show self
      .map((unit) => {
        const result = convertValue({
          value,
          fromUnit,
          toUnit: unit.symbol,
          converterType: converterId,
          units,
          rates,
        });

        return {
          unit,
          value: formatResult(result, precision)
        };
      });
  }, [value, fromUnit, units, converterId, rates, precision]);

  if (!value || conversions.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Quick Reference for {value} {fromUnit}
      </h3>

      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Unit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {conversions.map((item) => (
              <tr key={item.unit.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.unit.name} ({item.unit.symbol})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
