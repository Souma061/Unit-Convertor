import { API_KEY, API_URL } from "../../data/constants";

export async function fetchExchangeRates(baseCurrency = "USD") {
  try {
    // exchangerate.host format: /live?access_key=KEY&base=USD&format=1
    const url = `${API_URL}?access_key=${API_KEY}&base=${baseCurrency}&format=1`;

    console.log("Fetching from URL:", url);

    // Add custom timeout (browser-friendly)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 seconds

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Log the entire response
    console.log("Full API Response object:", data);
    console.log("Response keys:", Object.keys(data));
    console.log("data.quotes:", data.quotes);
    console.log("data.rates:", data.rates);
    console.log("data.data:", data.data);

    // Handle different possible response formats
    let rates = null;

    if (data.quotes && typeof data.quotes === "object") {
      console.log("Using data.quotes");
      rates = data.quotes;
    } else if (data.rates && typeof data.rates === "object") {
      console.log("Using data.rates");
      rates = data.rates;
    } else if (data.data && typeof data.data === "object") {
      console.log("Using data.data");
      rates = data.data;
    }

    console.log("Extracted rates:", rates);
    console.log("Rates length:", rates ? Object.keys(rates).length : 0);

    if (!rates || Object.keys(rates).length === 0) {
      console.error("Could not find rates in API response:", data);
      // Return mock rates as fallback for now
      console.log("Using fallback mock rates");
      rates = {
        EUR: 0.92,
        GBP: 0.79,
        INR: 83.5,
        JPY: 149.5,
        AUD: 1.5,
        CAD: 1.35,
        CHF: 0.88,
        CNY: 7.2,
        SGD: 1.35,
        HKD: 7.8,
        NZD: 1.65,
        MXN: 17,
        BRL: 5,
        ZAR: 18,
      };
    }

    // Normalize rates: exchangerate.host returns USDEUR, USDINR, etc.
    // We need to convert to { EUR: X, INR: Y, ... } format
    const normalizedRates = {};
    const baseLength = baseCurrency.length;

    Object.entries(rates).forEach(([key, value]) => {
      // Check if key starts with base currency (e.g., "USD" prefix)
      if (key.startsWith(baseCurrency)) {
        // Remove base currency prefix (e.g., "USDEUR" -> "EUR")
        const targetCurrency = key.slice(baseLength);
        if (targetCurrency.length > 0) {
          normalizedRates[targetCurrency] = value;
        }
      } else {
        // Already in correct format
        normalizedRates[key] = value;
      }
    });

    // Add base currency with rate 1
    normalizedRates[baseCurrency] = 1;

    console.log("Final normalized rates:", normalizedRates); return {
      success: true,
      rates: normalizedRates,
      timestamp: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
}
