import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRates } from "../utils/api/exchangeRateApi";
import { getCached, setCached, getOldCache } from "../utils/api/cache";
import { CACHE_DURATION, CURRENCY_CACHE_KEY } from "../data/constants";

export function useCurrencyRates() {
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [cachedTimestamp, setCachedTimestamp] = useState(null);

  const query = useQuery({
    queryKey: ["currency-rates"],
    queryFn: async () => {
      try {
        // Try fresh API call
        const fresh = await fetchExchangeRates("USD");

        // Normalize structure for consistency
        const normalized = {
          rates: fresh.rates,
          timestamp: fresh.timestamp,
          meta: { source: "api" },
        };

        setCached(CURRENCY_CACHE_KEY, normalized);
        setIsUsingFallback(false);
        setCachedTimestamp(normalized.timestamp);

        return normalized;
      } catch (err) {
        // Try valid cache (not expired)
        const cached = getCached(CURRENCY_CACHE_KEY, CACHE_DURATION);
        if (cached) {
          const normalized = {
            rates: cached.data.rates || cached.data,
            timestamp: cached.timestamp,
            meta: { source: "cache" },
          };

          setIsUsingFallback(true);
          setCachedTimestamp(normalized.timestamp);

          return normalized;
        }

        // Try ANY old cache (expired)
        const old = getOldCache(CURRENCY_CACHE_KEY);
        if (old) {
          const normalized = {
            rates: old.data.rates || old.data,
            timestamp: old.timestamp,
            meta: { source: "old-cache" },
          };

          setIsUsingFallback(true);
          setCachedTimestamp(normalized.timestamp);

          return normalized;
        }

        // No fallback available → throw
        throw err;
      }
    },

    retry: 1,
    retryDelay: 1000,

    // React Query caching aligned with currency TTL
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION * 2,
  });

  return {
    rates: query.data?.rates || null,
    loading: query.isLoading && !query.data,
    error: query.error && !query.data ? query.error.message : null,

    isUsingFallback,
    cachedTimestamp,

    source: query.data?.meta?.source || "unknown",
  };
}
