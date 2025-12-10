import { useState } from "react";
import { detectPrecision, formatResult } from "../utils/formatting/decimalPrecision.js";

export function useDecimalPrecision() {
  const [precision, setPrecision] = useState(null);

  // Updates precision only for valid user input
  const handleInputChange = (value) => {
    // Reset precision if input is empty
    if (value === "" || value === null || value === undefined) {
      setPrecision(null);
      return null;
    }

    // Ignore intermediate states like "." or "12."
    if (value.endsWith(".") || value === "." || value === "-") {
      return precision; // keep old precision
    }

    const detected = detectPrecision(value);
    setPrecision(detected);
    return detected;
  };

  // Formats converted output based on input precision
  const formatOutput = (value, overridePrecision = null) => {
    if (value === "" || value === null || value === undefined) return "";

    const p = overridePrecision !== null ? overridePrecision : precision;

    return formatResult(value, p);
  };

  return {
    precision,
    setPrecision,
    handleInputChange,
    formatOutput,
  };
}
