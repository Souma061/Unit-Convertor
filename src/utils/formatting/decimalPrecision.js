import { MAX_DECIMALS, DEFAULT_DECIMALS } from "../../data/constants";

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

  // Prevent extremely tiny numbers from showing weird artifacts
  if (Math.abs(num) < 1e-12) return "0";

  const p =
    precision !== null
      ? precision
      : detectPrecision(num.toString());

  if (p === 0) {
    return Math.round(num).toString();
  }

  return parseFloat(num.toFixed(p)).toString();
}

export function roundToDecimal(value, precision) {
  if (!Number.isFinite(value)) return value;
  return parseFloat(value.toFixed(precision));
}
