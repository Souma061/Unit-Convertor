export function convertLinear(value, fromUnit, toUnit, UNITS) {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return "";

  const fromData = UNITS.find(u => u.symbol === fromUnit);
  const toData = UNITS.find(u => u.symbol === toUnit);

  if (!fromData || !toData) {
    throw new Error(`Invalid units: from=${fromUnit}, to=${toUnit}`);
  }

  const baseValue = numValue * fromData.baseValue;
  return baseValue / toData.baseValue;
}


export function convertTemperature(value, fromUnit, toUnit) {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return "";

  let celsius;

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

  const baseAmount = numValue / rates[fromCurrency];
  return baseAmount * rates[toCurrency];
}




export function convertBase(value, fromUnit, toUnit, units) {
  try {
    const fromData = units.find(u => u.symbol === fromUnit);
    const toData = units.find(u => u.symbol === toUnit);

    if (!fromData || !toData) return "";

    const fromBase = fromData.base;
    const toBase = toData.base;

    const decimal = parseInt(value, fromBase);

    if (isNaN(decimal)) {
      return "";
    }

    return decimal.toString(toBase).toUpperCase();
  } catch {
    return "";
  }
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16)
  } : null;
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function convertColor(value, fromUnit, toUnit) {
  try {
    const val = value.trim().toLowerCase();

    let rgb = null;

    if (fromUnit === 'hex') {
      rgb = hexToRgb(val);
    } else if (fromUnit === 'rgb') {
      const parts = val.replace(/rgb\(|\)/g, '').split(/[\s,]+/);
      // We need at least 3 parts
      if (parts.length >= 3) {
        const r = parseInt(parts[0]);
        const g = parseInt(parts[1]);
        const b = parseInt(parts[2]);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          rgb = { r, g, b };
        }
      }
    } else if (fromUnit === 'hsl') {
      // Placeholder for HSL support - complex math omitted for brevity/stability unless requested
      // For now, support Hex <-> RGB which is 90% of use
      return "";
    }

    if (!rgb) return ""; // Invalid input, return empty instead of throw

    // Convert RGB to target
    if (toUnit === 'hex') {
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    } else if (toUnit === 'rgb') {
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    } else if (toUnit === 'hsl') {
      return "";
    }

    return "";
  } catch {
    return "";
  }
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

    case "number_base":
      return convertBase(value, fromUnit, toUnit, units);

    case "color":
      return convertColor(value, fromUnit, toUnit);

    default:
      return convertLinear(value, fromUnit, toUnit, units);
  }
}
