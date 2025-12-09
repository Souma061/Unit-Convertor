import { API_KEY, API_URL } from "../../data/constants";

export async function fetchExchangeRates(baseCurrency = "USD") {
  try {
    // Prevent double "?" replacement
    const separator = API_URL.includes("?") ? "&" : "?";
    const url = `${API_URL}${separator}apikey=${API_KEY}&base_currency=${baseCurrency}`;

    // Add custom timeout (browser-friendly)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 seconds

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.data || typeof data.data !== "object") {
      console.error("Unexpected API response:", data);
      throw new Error("API returned invalid response format");
    }

    const rates = data.data; // normalized

    return {
      success: true,
      rates,
      timestamp: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
}
