import { useState } from "react";
import { detectPrecision, formatResult } from "../utils/formatting/decimalPrecision.js";

export function useDecimalPrecision() {
  const [precision, setPrecision] = useState(null);

  const handleInputChange = (value) => {
    if (value === "" || value === null || value === undefined) {
      setPrecision(null);
      return null;
    }

    if (value.endsWith(".") || value === "." || value === "-") {
      return precision;
    }

    const detected = detectPrecision(value);
    setPrecision(detected);
    return detected;
  };

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
