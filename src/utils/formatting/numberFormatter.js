export function formatNumber(value, locale = "en-US") {
  if (value === "" || value === null || value === undefined) return "";

  const num = Number(value);
  if (!Number.isFinite(num)) return "";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  }).format(num);
}



export function parseLocaleNumber(str, locale = "en-US") {
  if (!str) return NaN;

  // Normalize spaces (including nonbreaking)
  let cleaned = str.trim().replace(/\s+/g, '');

  // Reject trailing decimal separator (e.g., "12." or "12,")
  if (cleaned.match(/[.,]$/)) return NaN;

  const formatter = new Intl.NumberFormat(locale);
  const parts = formatter.formatToParts(12345.6);

  const decimal = parts.find(p => p.type === "decimal")?.value || ".";
  const group = parts.find(p => p.type === "group")?.value || ",";

  // Remove grouping separators
  cleaned = cleaned.split(group).join("");

  // Replace locale decimal separator with "."
  cleaned = cleaned.replace(decimal, ".");

  // Allow fallback: if user typed "." in a locale where "," is expected
  // Example: German locale, user types "12.5"
  if (locale !== "en-US" && decimal !== ".") {
    cleaned = cleaned.replace(",", ".");
  }

  const result = Number(cleaned);
  return Number.isFinite(result) ? result : NaN;
}
