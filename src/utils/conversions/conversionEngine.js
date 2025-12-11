
export function convertLinear(value, fromUnit, toUnit, UNITS) {
  const numValue = parseFloat(value);

  // Handle invalid value
  if (isNaN(numValue)) return "";

  const fromData = UNITS.find(u => u.symbol === fromUnit);
  const toData = UNITS.find(u => u.symbol === toUnit);

  if (!fromData || !toData) {
    throw new Error(`Invalid units: from=${fromUnit}, to=${toUnit}`);
  }

  // Convert to base unit → convert to target unit
  const baseValue = numValue * fromData.baseValue;
  return baseValue / toData.baseValue;
}


export function convertTemperature(value, fromUnit, toUnit) {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return "";

  let celsius;

  // Normalize to Celsius
  switch (fromUnit) {
    case "°C":
      celsius = numValue;
      break;
    case "°F":
      celsius = (numValue - 32) * (5 / 9);
      break;
    case "K":
      celsius = numValue - 273.15;
      break;
    default:
      throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }

  // Convert from Celsius → target
  switch (toUnit) {
    case "°C":
      return celsius;
    case "°F":
      return celsius * (9 / 5) + 32;
    case "K":
      return celsius + 273.15;
    default:
      throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }
}


export function convertCurrency(value, fromCurrency, toCurrency, rates) {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return "";

  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error("Currency rates not available.");
  }

  // Normalize to base currency (API default base)
  const baseAmount = numValue / rates[fromCurrency];
  return baseAmount * rates[toCurrency];
}


export function convertValue({
  value,
  fromUnit,
  toUnit,
  converterType,
  units,
  rates,
}) {
  if (!value && value !== 0) return "";

  switch (converterType) {
    case "temperature":
      return convertTemperature(value, fromUnit, toUnit);

    case "currency":
      return convertCurrency(value, fromUnit, toUnit, rates);

    default:
      return convertLinear(value, fromUnit, toUnit, units);
  }
}
