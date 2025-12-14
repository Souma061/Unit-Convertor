import { ANGLE_UNITS } from './units/angleUnits.js';
import { AREA_UNITS } from './units/areaUnits.js';
import { COLOR_UNITS } from './units/colorUnits.js';
import { COOKING_UNITS } from './units/cookingUnits.js';
import { CURRENCY_UNITS } from './units/currencyUnits.js';
import { DATA_UNITS } from './units/dataUnits.js';
import { ENERGY_UNITS } from './units/energyUnits.js';
import { LENGTH_UNITS } from './units/lengthUnits.js';
import { NUMBER_BASE_UNITS } from './units/numberBaseUnits.js';
import { PRESSURE_UNITS } from './units/pressureunits.js';
import { SCREEN_UNITS } from './units/screenUnits.js';
import { SPEED_UNITS } from './units/speedunits.js';
import { TEMPERATURE_UNITS } from './units/temperatureUnits.js';
import { TIME_UNITS } from './units/timeUnits.js';
import { VOLUME_UNITS } from './units/volumeUnits.js';
import { WEIGHT_UNITS } from './units/weightUnits.js';

export const CONVERTERS = [


  {
    id: 'angle',
    name: 'Angle',
    description: 'Convert between degrees, radians, and gradians.',
    icon: '📐',
    category: 'Geometry',
    defaultFromUnit: 'deg',
    defaultToUnit: 'rad',
    units: ANGLE_UNITS,
    searchableUnits: ANGLE_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'number_base',
    name: 'Number Base',
    description: 'Convert between binary, octal, decimal, and hexadecimal.',
    icon: '👨‍💻',
    category: 'Developer',
    defaultFromUnit: 'dec',
    defaultToUnit: 'bin',
    units: NUMBER_BASE_UNITS,
    searchableUnits: NUMBER_BASE_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'color',
    name: 'Color',
    description: 'Convert between HEX, RGB, and HSL color formats.',
    icon: '🎨',
    category: 'Developer',
    defaultFromUnit: 'hex',
    defaultToUnit: 'rgb',
    units: COLOR_UNITS,
    searchableUnits: COLOR_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'screen',
    name: 'Screen',
    description: 'Convert between pixels and REM units.',
    icon: '🖥️',
    category: 'Developer',
    defaultFromUnit: 'px',
    defaultToUnit: 'rem',
    units: SCREEN_UNITS,
    searchableUnits: SCREEN_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'length',
    // ...

    name: 'Length',
    description: 'Convert between different units of length.',
    icon: '📏',
    category: 'Distance',
    defaultFromUnit: 'm',
    defaultToUnit: 'km',
    units: LENGTH_UNITS,
    searchableUnits: LENGTH_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'weight',
    name: 'Weight',
    description: 'Convert between different units of weight.',
    icon: '⚖️',
    category: 'Mass',
    defaultFromUnit: 'kg',
    defaultToUnit: 'lb',
    units: WEIGHT_UNITS,
    searchableUnits: WEIGHT_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'volume',
    name: 'Volume',
    description: 'Convert between different units of volume.',
    icon: '🧴',
    category: 'Capacity',
    defaultFromUnit: 'l',
    defaultToUnit: 'gal',
    units: VOLUME_UNITS,
    searchableUnits: VOLUME_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'temperature',
    name: 'Temperature',
    description: 'Convert between different units of temperature.',
    icon: '🌡️',
    category: 'Thermodynamics',
    defaultFromUnit: '°C',
    defaultToUnit: '°F',
    units: TEMPERATURE_UNITS,
    searchableUnits: TEMPERATURE_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'speed',
    name: 'Speed',
    description: 'Convert between different units of speed.',
    icon: '🏎️',
    category: 'Velocity',
    defaultFromUnit: 'km/h',
    defaultToUnit: 'mph',
    units: SPEED_UNITS,
    searchableUnits: SPEED_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'pressure',
    name: 'Pressure',
    description: 'Convert between different units of pressure.',
    icon: '🔧',
    category: 'Force',
    defaultFromUnit: 'Pa',
    defaultToUnit: 'atm',
    units: PRESSURE_UNITS,
    searchableUnits: PRESSURE_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'energy',
    name: 'Energy',
    description: 'Convert between different units of energy.',
    icon: '⚡',
    category: 'Power',
    defaultFromUnit: 'J',
    defaultToUnit: 'cal',
    units: ENERGY_UNITS,
    searchableUnits: ENERGY_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'area',
    name: 'Area',
    description: 'Convert between different units of area.',
    icon: '📐',
    category: 'Surface',
    defaultFromUnit: 'm²',
    defaultToUnit: 'acre',
    units: AREA_UNITS,
    searchableUnits: AREA_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'time',
    name: 'Time',
    description: 'Convert between different units of time.',
    icon: '⏳',
    category: 'Duration',
    defaultFromUnit: 's',
    defaultToUnit: 'h',
    units: TIME_UNITS,
    searchableUnits: TIME_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'data',
    name: 'Data Storage',
    description: 'Convert between bits, bytes, and other digital units.',
    icon: '💾',
    category: 'Digital',
    defaultFromUnit: 'MB',
    defaultToUnit: 'GB',
    units: DATA_UNITS,
    searchableUnits: DATA_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'cooking',
    name: 'Cooking',
    description: 'Convert between kitchen measurements like cups and spoons.',
    icon: '🍳',
    category: 'Kitchen',
    defaultFromUnit: 'cup',
    defaultToUnit: 'ml',
    units: COOKING_UNITS,
    searchableUnits: COOKING_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  },

  {
    id: 'currency',
    name: 'Currency',
    description: 'Convert between different currencies.',
    icon: '💱',
    category: 'Finance',
    defaultFromUnit: 'USD',
    defaultToUnit: 'INR',
    units: CURRENCY_UNITS,
    searchableUnits: CURRENCY_UNITS.flatMap(unit => [
      unit.symbol, unit.name, ...unit.aliases
    ]),
  }
];

export function getConverterById(id) {
  return CONVERTERS.find(converter => converter.id === id);
}


