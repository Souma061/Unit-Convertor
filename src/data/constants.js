export const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
export const API_URL = 'https://api.exchangerate.host/live';
export const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
export const CURRENCY_CACHE_KEY = 'currencyRates';
export const MAX_DECIMALS = 10;
export const DEFAULT_DECIMALS = 2;
export const FUSE_THRESHOLD = 0.4;
export const MIN_SEARCH_CHARS = 2;
