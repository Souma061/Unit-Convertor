import { CACHE_DURATION } from "../../data/constants";

// --------------------------------------
// Retrieve Cached Data
// --------------------------------------
export function getCached(key, ttl = CACHE_DURATION) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const { data, timestamp, meta } = JSON.parse(raw);
    const age = Date.now() - timestamp;

    // ttl = -1 → return regardless of age
    if (ttl === -1 || age < ttl) {
      return { data, timestamp, meta, age };
    }

    // Expired → don’t delete immediately (allow old fallback)
    return null;
  } catch (error) {
    console.error(`Error retrieving cache for key "${key}":`, error);
    // Remove corrupted item
    localStorage.removeItem(key);
    return null;
  }
}



// --------------------------------------
// Set Cached Data
// --------------------------------------
export function setCached(key, data, meta = {}) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
        meta,
      })
    );
  } catch (error) {
    console.error(`Error setting cache for key "${key}":`, error);
  }
}



// --------------------------------------
// Retrieve ANY AGE Cache (fallback)
// --------------------------------------
export function getOldCache(key) {
  return getCached(key, -1);
}



// --------------------------------------
// Helper: get cache age in minutes
// --------------------------------------
export function getCacheAgeMinutes(timestamp) {
  if (!timestamp) return null;
  return Math.floor((Date.now() - timestamp) / 60000);
}
