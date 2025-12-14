/**
 * Parses text to extract a number and a potential unit.
 * @param {string} text - The clipboard text
 * @param {Array} availableUnits - List of unit objects with { symbol, name }
 * @returns {Object|null} - { value: number, unit: string|null } or null if no number found
 */
export function smartParse(text, availableUnits = []) {
  if (!text || typeof text !== "string") return null;

  // Regex to extract number (integer, decimal, scientific)
  // This matches: -123, 123.45, .45, 1.2e5, -1.2E-5
  const numberRegex = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
  const numberMatch = text.match(numberRegex);

  if (!numberMatch) return null;

  const value = numberMatch[0];

  // Remove the number from text to search for unit in the rest
  // We'll search in a small window around the number or just the whole string
  // Simplest: Check if the text contains any of the unit symbols or names (case-insensitive)

  let detectedUnit = null;

  if (availableUnits.length > 0) {
    // Sort units by length (longest first) to avoid matching "m" when "mm" is present
    const sortedUnits = [...availableUnits].sort((a, b) => b.symbol.length - a.symbol.length);

    // Create a simplified text string for matching (lowercase)
    const lowerText = text.toLowerCase();

    for (const unit of sortedUnits) {
      // Check symbol
      if (lowerText.includes(unit.symbol.toLowerCase())) {
        detectedUnit = unit.symbol;
        break;
      }
      // Check name
      if (unit.name && lowerText.includes(unit.name.toLowerCase())) {
        detectedUnit = unit.symbol;
        break;
      }
    }
  }

  return {
    value,
    unit: detectedUnit
  };
}
