// Generate a human-readable formula string
export function getFormula(fromUnit, toUnit, converterType, units) {
  if (fromUnit === toUnit) return `The value remains the same.`;

  if (converterType === "temperature") {
    if (fromUnit === "°C" && toUnit === "°F") return `(°C × 9/5) + 32 = °F`;
    if (fromUnit === "°F" && toUnit === "°C") return `(°F − 32) × 5/9 = °C`;
    if (fromUnit === "°C" && toUnit === "K") return `°C + 273.15 = K`;
    if (fromUnit === "K" && toUnit === "°C") return `K − 273.15 = °C`;
    if (fromUnit === "°F" && toUnit === "K") return `(°F − 32) × 5/9 + 273.15 = K`;
    if (fromUnit === "K" && toUnit === "°F") return `(K − 273.15) × 9/5 + 32 = °F`;
    return "Complex temperature conversion formula.";
  }

  if (converterType === "currency") {
    return `Driven by real-time market exchange rates.`;
  }

  // Linear conversions (Length, Weight, etc.)
  const fromData = units.find((u) => u.symbol === fromUnit);
  const toData = units.find((u) => u.symbol === toUnit);

  if (!fromData || !toData) return "";

  // Calculate the factor between the two units
  // baseValue is "how many base units are in this unit"
  // e.g. 1 km has baseValue 1000 (meters)
  // factor = fromBase / toBase
  const factor = fromData.baseValue / toData.baseValue;

  // Format nicely
  if (factor >= 1) {
    // Multiply
    return `Multiply the value by ${removeTrailingZeros(factor.toFixed(10))}`;
  } else {
    // Divide
    const inverse = 1 / factor;
    return `Divide the value by ${removeTrailingZeros(inverse.toFixed(10))}`;
  }
}

function removeTrailingZeros(str) {
  return parseFloat(str).toString();
}
