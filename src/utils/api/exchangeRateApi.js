import { API_URL } from "../../data/constants.js";

export async function fetchExchangeRates(baseCurrency = "USD") {
  try {
    const lowerBase = baseCurrency.toLowerCase();
    const url = `${API_URL}/${lowerBase}.json`;

    console.log("Fetching from URL:", url);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Format: { date: "2024-...", [base]: { eur: 0.9, ... } }
    const rawRates = data[lowerBase];

    if (!rawRates) {
      throw new Error(`Could not find rates for ${baseCurrency}`);
    }

    const normalizedRates = {};

    Object.entries(rawRates).forEach(([key, value]) => {
      // API returns lowercase keys (eur, inr). Convert to uppercase (EUR, INR).
      normalizedRates[key.toUpperCase()] = value;
    });

    // Ensure base is exactly 1 (it should be, but just in case)
    normalizedRates[baseCurrency] = 1;

    return {
      success: true,
      rates: normalizedRates,
      timestamp: Date.now(),
      date: data.date || new Date().toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
}
