import { DEFAULT_DECIMALS, MAX_DECIMALS } from "../../data/constants.js";

export function detectPrecision(value) {
  if (value === "" || value === null || value === undefined) {
    return DEFAULT_DECIMALS;
  }

  const str = value.toString().trim();

  // Scientific notation → fallback
  if (str.includes("e") || str.includes("E")) {
    return DEFAULT_DECIMALS;
  }

  // No decimal point → integer
  if (!str.includes(".")) {
    return 0;
  }

  const decimalPart = str.split(".")[1];
  const length = decimalPart.length;

  return Math.min(length, MAX_DECIMALS);
}

export function formatResult(value, precision = null) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "";
  }

  const num = Number(value);
  if (!Number.isFinite(num)) return "";

  // Handle zero
  if (Math.abs(num) === 0) return "0";

  // If precision is explicitly set, use it
  if (precision !== null && precision !== undefined) {
    return num.toFixed(precision);
  }

  // For very small numbers (e.g. 0.000007), we need high precision to avoid "0"
  // If the number is < 0.0001, we use up to 10 decimal places
  if (Math.abs(num) < 0.0001) {
    // toPrecision(6) gives us 6 significant digits, effectively handling the leading zeros
    // e.g., 0.000007 -> 0.000007
    return parseFloat(num.toFixed(10)).toString();
  }

  // For regular numbers, standard precision is usually fine, but let's allow more decimals
  // to match the requested granular precision (e.g., 1000m -> 1km is clean, but 7cm -> 0.00007km needs decimals)

  // If a specific precision isn't enforced by input, default to a high max like 7
  // parseFloat strips trailing zeros automatically.
  return parseFloat(num.toFixed(10)).toString();
}

export function roundToDecimal(value, precision) {
  if (!Number.isFinite(value)) return value;
  return parseFloat(value.toFixed(precision));
}
