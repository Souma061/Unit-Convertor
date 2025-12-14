export function isValidNumber(value) {
  if (value === "" || value === null || value === undefined) return true;

  if (value === ".") return true;

  if (value === "-" || value === "-.") return true;

  const num = Number(value);
  return Number.isFinite(num);
}


export function sanitizeInput(value) {
  if (value === null || value === undefined) return "";
  return value.toString().trim();
}


export function parseInputNumber(value) {
  if (value === "" || value === null || value === undefined) return null;

  if (value === "." || value === "-" || value === "-.") return null;

  const num = Number(value);
  if (!Number.isFinite(num)) return null;

  return num;
}
