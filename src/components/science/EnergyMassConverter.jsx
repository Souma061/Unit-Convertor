
import { useEffect, useState } from "react";
import { MdContentCopy, MdContentPaste } from "react-icons/md";
import { useSettings } from "../../context/SettingsContext.jsx";
import { SPEED_OF_LIGHT } from "../../data/physicsConstants.js";
import { formatResult } from "../../utils/formatting/decimalPrecision.js";
import { smartParse } from "../../utils/parsing/smartParser.js";

const MASS_UNITS = [
  { symbol: "kg", name: "Kilograms", factor: 1 },
  { symbol: "g", name: "Grams", factor: 1e-3 },
  { symbol: "lb", name: "Pounds", factor: 0.45359237 },
  { symbol: "u", name: "Atomic Mass Unit", factor: 1.66053906660e-27 },
];

const ENERGY_UNITS = [
  { symbol: "J", name: "Joules", factor: 1 },
  { symbol: "kJ", name: "Kilojoules", factor: 1e3 },
  { symbol: "eV", name: "Electronvolts", factor: 1.602176634e-19 },
  { symbol: "MeV", name: "Megaelectronvolts", factor: 1.602176634e-13 },
  { symbol: "GeV", name: "Gigaelectronvolts", factor: 1.602176634e-10 },
  { symbol: "kWh", name: "Kilowatt-hours", factor: 3.6e6 },
];

export default function EnergyMassConverter() {
  const { precision } = useSettings();
  const [mass, setMass] = useState("");
  const [energy, setEnergy] = useState("");
  const [massUnit, setMassUnit] = useState(MASS_UNITS[0]);
  const [energyUnit, setEnergyUnit] = useState(ENERGY_UNITS[0]);
  const [lastEdited, setLastEdited] = useState("mass"); // "mass" or "energy"

  // Recalculate when precision changes
  useEffect(() => {
    if (mass && lastEdited === "mass") {
      handleMassChange(mass, true);
    } else if (energy && lastEdited === "energy") {
      handleEnergyChange(energy, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precision]);

  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  const processMassPaste = (text) => {
    const result = smartParse(text, MASS_UNITS);
    if (result) {
      handleMassChange(result.value);
      if (result.unit && result.unit !== massUnit.symbol) {
        const found = MASS_UNITS.find(u => u.symbol === result.unit);
        if (found) handleMassUnitChange(found);
      }
    }
  };

  const processEnergyPaste = (text) => {
    const result = smartParse(text, ENERGY_UNITS);
    if (result) {
      handleEnergyChange(result.value);
      if (result.unit && result.unit !== energyUnit.symbol) {
        const found = ENERGY_UNITS.find(u => u.symbol === result.unit);
        if (found) handleEnergyUnitChange(found);
      }
    }
  };

  const handlePasteMassButton = async () => {
    try {
      const text = await navigator.clipboard.readText();
      processMassPaste(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  };

  const handlePasteEnergyButton = async () => {
    try {
      const text = await navigator.clipboard.readText();
      processEnergyPaste(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  };

  const onPasteMass = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    processMassPaste(text);
  };

  const onPasteEnergy = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    processEnergyPaste(text);
  };

  const handleMassChange = (val, isRefetch = false) => {
    if (!isRefetch) {
      setMass(val);
      setLastEdited("mass");
    }

    if (val === "" || isNaN(val)) {
      setEnergy("");
      return;
    }

    const massKg = parseFloat(val) * massUnit.factor;
    const energyJ = massKg * Math.pow(SPEED_OF_LIGHT, 2);
    const resultEnergy = energyJ / energyUnit.factor;

    setEnergy(formatResult(resultEnergy, precision));
  };

  const handleEnergyChange = (val, isRefetch = false) => {
    if (!isRefetch) {
      setEnergy(val);
      setLastEdited("energy");
    }

    if (val === "" || isNaN(val)) {
      setMass("");
      return;
    }

    const energyJ = parseFloat(val) * energyUnit.factor;
    const massKg = energyJ / Math.pow(SPEED_OF_LIGHT, 2);
    const resultMass = massKg / massUnit.factor;

    setMass(formatResult(resultMass, precision));
  };

  // Re-calculate when units change
  const handleMassUnitChange = (newUnit) => {
    setMassUnit(newUnit);
    if (energy !== "" && !isNaN(energy)) {
      const energyJ = parseFloat(energy) * energyUnit.factor;
      const massKg = energyJ / Math.pow(SPEED_OF_LIGHT, 2);
      const result = massKg / newUnit.factor;
      setMass(formatResult(result, precision));
    }
  };

  const handleEnergyUnitChange = (newUnit) => {
    setEnergyUnit(newUnit);
    if (mass !== "" && !isNaN(mass)) {
      const massKg = parseFloat(mass) * massUnit.factor;
      const energyJ = massKg * Math.pow(SPEED_OF_LIGHT, 2);
      const result = energyJ / newUnit.factor;
      setEnergy(formatResult(result, precision));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="text-blue-600 dark:text-blue-400">E = mc²</span> Calculator
      </h3>

      <div className="space-y-6">
        {}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mass (m)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={mass}
              onChange={(e) => handleMassChange(e.target.value)}
              onPaste={onPasteMass}
              placeholder="Enter mass..."
              className="flex-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white sm:text-sm p-2.5"
            />
            <button
              onClick={() => handleCopy(mass)}
              title="Copy Mass"
              className="p-2.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
            >
              <MdContentCopy />
            </button>
            <button
              onClick={handlePasteMassButton}
              title="Smart Paste"
              className="p-2.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
            >
              <MdContentPaste />
            </button>
            <select
              value={massUnit.symbol}
              onChange={(e) => handleMassUnitChange(MASS_UNITS.find(u => u.symbol === e.target.value))}
              className="block rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
            >
              {MASS_UNITS.map((u) => (
                <option key={u.symbol} value={u.symbol}>{u.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        {}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Energy (E)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={energy}
              onChange={(e) => handleEnergyChange(e.target.value)}
              onPaste={onPasteEnergy}
              placeholder="Enter energy..."
              className="flex-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white sm:text-sm p-2.5"
            />
            <button
              onClick={() => handleCopy(energy)}
              title="Copy Energy"
              className="p-2.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
            >
              <MdContentCopy />
            </button>
            <button
              onClick={handlePasteEnergyButton}
              title="Smart Paste"
              className="p-2.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
            >
              <MdContentPaste />
            </button>
            <select
              value={energyUnit.symbol}
              onChange={(e) => handleEnergyUnitChange(ENERGY_UNITS.find(u => u.symbol === e.target.value))}
              className="block rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
            >
              {ENERGY_UNITS.map((u) => (
                <option key={u.symbol} value={u.symbol}>{u.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          Using c = {SPEED_OF_LIGHT.toLocaleString()} m/s
        </div>
      </div>
    </div>
  );
}


