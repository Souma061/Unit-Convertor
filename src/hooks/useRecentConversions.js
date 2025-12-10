import { useCallback, useEffect, useState } from "react";

const MAX_RECENTS = 5;

export function useRecentConversions(converterId) {
  const [recents, setRecents] = useState([]);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`recents_${converterId}`);
      if (saved) {
        setRecents(JSON.parse(saved));
      } else {
        setRecents([]);
      }
    } catch (e) {
      console.error("Failed to load recent conversions", e);
    }
  }, [converterId]);

  // Add a new conversion
  const addRecent = useCallback((conversion) => {
    setRecents((prev) => {
      // Avoid duplicates at the top of the list
      const isDuplicate = prev.length > 0 &&
        prev[0].fromVal === conversion.fromVal &&
        prev[0].fromUnit === conversion.fromUnit &&
        prev[0].toUnit === conversion.toUnit;

      if (isDuplicate) return prev;

      const newItem = {
        ...conversion,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };

      const newRecents = [newItem, ...prev].slice(0, MAX_RECENTS);

      // Persist
      try {
        localStorage.setItem(`recents_${converterId}`, JSON.stringify(newRecents));
      } catch (e) {
        console.error("Failed to save recent conversion", e);
      }

      return newRecents;
    });
  }, [converterId]);

  // Clear history
  const clearRecents = useCallback(() => {
    setRecents([]);
    localStorage.removeItem(`recents_${converterId}`);
  }, [converterId]);

  return { recents, addRecent, clearRecents };
}
