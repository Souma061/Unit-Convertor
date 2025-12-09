import { useMemo } from "react";
import Fuse from "fuse.js";
import { CONVERTERS } from "../data/converters";
import { FUSE_THRESHOLD, MIN_SEARCH_CHARS } from "../data/constants";

export function useSearch(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  // Memoize Fuse instance (expensive)
  const fuse = useMemo(() => {
    return new Fuse(CONVERTERS, {
      keys: [
        { name: "name", weight: 0.4 },
        { name: "description", weight: 0.2 },
        { name: "searchableUnits", weight: 0.4 },
      ],
      threshold: FUSE_THRESHOLD, // 0.3–0.4 recommended
      ignoreLocation: true,
      includeScore: true,
      minMatchCharLength: MIN_SEARCH_CHARS,
    });
  }, []);

  const searchResults = useMemo(() => {
    if (normalizedQuery.length < MIN_SEARCH_CHARS) {
      return CONVERTERS;
    }

    const results = fuse.search(normalizedQuery);
    return results.map(r => r.item);
  }, [normalizedQuery, fuse]);

  return {
    results: searchResults,
    hasResults: searchResults.length > 0,
    isEmptyQuery: normalizedQuery.length === 0,
    isNoMatch: normalizedQuery.length >= MIN_SEARCH_CHARS && searchResults.length === 0,
  };
}
