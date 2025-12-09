import { LENGTH_UNITS } from '../../data/units/lengthUnits.js';

export function convert(value, fromUnit, toUnit) {

  const numvalue = parseFloat(value);
  if (isNaN(numvalue)) {
    throw new Error('Invalid value provided for conversion.');
  }
  const fromData = LENGTH_UNITS.find(u => u.symbol === fromUnit);
  const toData = LENGTH_UNITS.find(u => u.symbol === toUnit);

  if (!fromData || !toData) {
    throw new Error('Invalid unit provided for conversion.');

  }
  const baseValue = value * fromData.baseValue;
  return baseValue / toData.baseValue;
}

export function getUnits() {
  return LENGTH_UNITS;
}
