import { DEFAULT_DECIMALS, MAX_DECIMALS } from "../../data/constants.js";

export function detectPrecision(value) {
  if (value === "" || value === null || value === undefined) {
    return DEFAULT_DECIMALS;
  }

  const str = value.toString().trim();

  if (str.includes("e") || str.includes("E")) {
    return DEFAULT_DECIMALS;
  }

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

  if (Math.abs(num) === 0) return "0";

  if (precision !== null && precision !== undefined) {
    return num.toFixed(precision);
  }

  if (Math.abs(num) < 0.0001) {
    return parseFloat(num.toFixed(10)).toString();
  }

  return parseFloat(num.toFixed(10)).toString();
}

export function roundToDecimal(value, precision) {
  if (!Number.isFinite(value)) return value;
  return parseFloat(value.toFixed(precision));
}
