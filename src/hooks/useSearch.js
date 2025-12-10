import Fuse from "fuse.js";
import { useMemo } from "react";
import { MIN_SEARCH_CHARS } from "../data/constants";
import { CONVERTERS } from "../data/converters";

export function useSearch(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  // Memoize Fuse instance (expensive)
  const fuse = useMemo(() => {
    return new Fuse(CONVERTERS, {
      keys: [
        { name: "name", weight: 0.6 }, // Increased weight for Name
        { name: "searchableUnits", weight: 0.3 }, // Units are secondary
        { name: "description", weight: 0.1 }, // Description is less important
      ],
      threshold: 0.2, // Lower threshold = stricter matching (0.0 is exact match)
      ignoreLocation: true,
      includeScore: true,
      minMatchCharLength: 1, // Allow searching with 1 char
    });
  }, []);

  const searchResults = useMemo(() => {
    if (normalizedQuery.length < 1) {
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
