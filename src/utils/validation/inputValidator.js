// Returns TRUE if the input is a valid numeric *intermediate* value
export function isValidNumber(value) {
  if (value === "" || value === null || value === undefined) return true;

  // Allow a single dot "." (user typing decimal)
  if (value === ".") return true;

  // Allow "-" or "-." (start of negative number)
  if (value === "-" || value === "-.") return true;

  // Normal number check
  const num = Number(value);
  return Number.isFinite(num);
}


// Removes unwanted whitespace without breaking values like "0"
export function sanitizeInput(value) {
  if (value === null || value === undefined) return "";
  return value.toString().trim();
}


// Converts user input string → clean JS number OR null
export function parseInputNumber(value) {
  if (value === "" || value === null || value === undefined) return null;

  // Reject incomplete numeric states
  if (value === "." || value === "-" || value === "-.") return null;

  const num = Number(value);
  if (!Number.isFinite(num)) return null;

  return num;
}
