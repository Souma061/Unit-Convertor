import { useCallback, useState } from "react";

const MAX_RECENTS = 5;

export function useRecentConversions(converterId) {
  // Lazy initialization to read from storage immediately
  const [recents, setRecents] = useState(() => {
    try {
      const saved = localStorage.getItem(`recents_${converterId}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load recent conversions", e);
      return [];
    }
  });


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


      try {
        localStorage.setItem(`recents_${converterId}`, JSON.stringify(newRecents));
      } catch (e) {
        console.error("Failed to save recent conversion", e);
      }

      return newRecents;
    });
  }, [converterId]);


  const clearRecents = useCallback(() => {
    setRecents([]);
    localStorage.removeItem(`recents_${converterId}`);
  }, [converterId]);

  return { recents, addRecent, clearRecents };
}


