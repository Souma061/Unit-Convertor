import { useCallback, useEffect, useMemo, useState } from "react";
import { getConverterById } from "../data/converters.js";
import { convertValue } from "../utils/conversions/index.js";
import { detectPrecision, formatResult } from "../utils/formatting/decimalPrecision.js";
import { parseInputNumber } from "../utils/validation/inputValidator.js";

export function useConverter(converterId, defaultFromUnit, defaultToUnit, globalPrecision = null) {
  const converter = getConverterById(converterId);


  const [fromUnit, setFromUnit] = useState(() => {
    const saved = localStorage.getItem(`converter_${converterId}_fromUnit`);
    return saved || defaultFromUnit;
  });
  const [toUnit, setToUnit] = useState(() => {
    const saved = localStorage.getItem(`converter_${converterId}_toUnit`);
    return saved || defaultToUnit;
  });

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [error, setError] = useState(null);

  const [precision, setPrecision] = useState(null);
  const [lastEdited, setLastEdited] = useState(null);

  const units = useMemo(() => converter?.units || [], [converter]);


  useEffect(() => {
    localStorage.setItem(`converter_${converterId}_fromUnit`, fromUnit);
    localStorage.setItem(`converter_${converterId}_toUnit`, toUnit);
  }, [converterId, fromUnit, toUnit]);



  const calculate = useCallback(
    (inputValue, inputUnit, outputUnit, rates) => {
      const isText = ["number_base", "color"].includes(converterId);
      let num;

      if (isText) {
        num = inputValue;
        if (!num) return "";
      } else {
        num = parseInputNumber(inputValue);
        if (num === null) return "";
      }

      try {
        setError(null);

        const raw = convertValue({
          value: num,
          fromUnit: inputUnit,
          toUnit: outputUnit,
          converterType: converterId,
          units,
          rates,
        });

        if (raw === "") return "";

        if (isText) return raw;

        // Use global precision if set, otherwise fallback to auto-detected input precision
        return formatResult(raw, globalPrecision !== null ? globalPrecision : null);
      } catch (err) {
        setError(err.message);
        return "";
      }
    },
    [converterId, units, globalPrecision]
  );

  const handleFromValueChange = useCallback(
    (value, rates = null) => {
      setFromValue(value);
      setLastEdited("from");

      const p = detectPrecision(value);
      setPrecision(p);

      const converted = calculate(value, fromUnit, toUnit, rates);
      setToValue(converted);
    },
    [fromUnit, toUnit, calculate]
  );

  const handleToValueChange = useCallback(
    (value, rates = null) => {
      setToValue(value);
      setLastEdited("to");

      const p = detectPrecision(value);
      setPrecision(p);

      const converted = calculate(value, toUnit, fromUnit, rates);
      setFromValue(converted);
    },
    [fromUnit, toUnit, calculate]
  );

  const handleFromUnitChange = useCallback(
    (unit, rates = null) => {
      setFromUnit(unit);

      if (fromValue !== "") {
        const converted = calculate(fromValue, unit, toUnit, rates);
        setToValue(converted);
      }
    },
    [fromValue, toUnit, calculate]
  );

  const handleToUnitChange = useCallback(
    (unit, rates = null) => {
      setToUnit(unit);

      if (toValue !== "") {
        const converted = calculate(toValue, unit, fromUnit, rates);
        setFromValue(converted);
      }
    },
    [toValue, fromUnit, calculate]
  );

  const handleSwapUnits = useCallback(
    (rates = null) => {
      setFromUnit(toUnit);
      setToUnit(fromUnit);

      if (lastEdited === "from" && fromValue !== "") {
        const newTo = calculate(fromValue, toUnit, fromUnit, rates);
        setToValue(newTo);
      }

      if (lastEdited === "to" && toValue !== "") {
        const newFrom = calculate(toValue, fromUnit, toUnit, rates);
        setFromValue(newFrom);
      }
    },
    [fromUnit, toUnit, fromValue, toValue, lastEdited, calculate]
  );

  return {
    fromValue,
    toValue,
    fromUnit,
    toUnit,
    units,
    error,
    precision,
    lastEdited,

    handleFromValueChange,
    handleToValueChange,
    handleFromUnitChange,
    handleToUnitChange,
    handleSwapUnits,

    setFromValue,
    setToValue,
    setFromUnit,
    setToUnit,
  };
}


