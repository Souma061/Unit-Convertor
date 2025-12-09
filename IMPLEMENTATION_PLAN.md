# Unit Converter MVP - Detailed Implementation Plan

> ⚠️ **PLANNING PHASE**: This document finalizes all core functionalities before implementation begins.

---

## 1. CORE ARCHITECTURE & STRUCTURE

### 1.1 Folder Organization

```
src/
├── components/          # UI components (presentation layer)
├── pages/              # Route-level components
├── hooks/              # Custom React hooks (business logic)
├── utils/              # Pure functions & helpers
├── data/               # Static data & metadata
├── context/            # Global React context
├── Router.jsx          # Route definitions
└── App.jsx             # Root component
```

**Key Principle**: Strict separation of concerns

- **Data layer** (`data/`, `utils/`) - pure, testable, framework-agnostic
- **Logic layer** (`hooks/`, `utils/`) - business logic, isolated from UI
- **UI layer** (`components/`, `pages/`) - React components, minimal logic

### 1.2 Naming Conventions

- **Components**: PascalCase (ConverterCard.jsx, SearchBar.jsx)
- **Hooks**: camelCase with `use` prefix (useSearch.js, useConverter.js)
- **Utilities**: camelCase (numberFormatter.js, decimalPrecision.js)
- **Data files**: camelCase (converters.js, lengthUnits.js)
- **Props**: camelCase (onValueChange, isLoading, defaultValue)

---

## 2. DATA & METADATA SCHEMA

### 2.1 Converter Metadata Structure

```javascript
// src/data/converters.js
export const CONVERTERS = [
  {
    id: 'length',
    name: 'Length',
    description: 'Convert between meters, kilometers, miles, feet, inches, and more.',
    icon: '📏',
    category: 'Distance',
    defaultFromUnit: 'meter',
    defaultToUnit: 'kilometer',
    // Used for fuse.js search
    searchableUnits: ['meter', 'm', 'kilometer', 'km', 'mile', 'mi', ...],
  },
  // ... 9 more converters
];
```

**Searchable Fields for Fuse.js**:

- `name` (e.g., "Length", "Temperature")
- `description` (e.g., "Convert between...")
- `searchableUnits` (all unit names + aliases)

### 2.2 Unit Definition Structure

```javascript
// src/data/units/lengthUnits.js
export const LENGTH_UNITS = [
  {
    symbol: "m",
    name: "Meter",
    aliases: ["meter", "meters"],
    baseValue: 1, // Base unit for conversions
  },
  {
    symbol: "km",
    name: "Kilometer",
    aliases: ["kilometer", "kilometers", "kms"],
    baseValue: 1000, // 1 km = 1000 m
  },
  {
    symbol: "mi",
    name: "Mile",
    aliases: ["mile", "miles", "statute mile"],
    baseValue: 1609.34, // 1 mile = 1609.34 m
  },
  {
    symbol: "ft",
    name: "Foot",
    aliases: ["foot", "feet", "ft", "feet"],
    baseValue: 0.3048, // 1 ft = 0.3048 m
  },
  {
    symbol: "in",
    name: "Inch",
    aliases: ["inch", "inches", '"'],
    baseValue: 0.0254, // 1 in = 0.0254 m
  },
  // ... more units
];
```

**Why baseValue?**

- Simplifies conversion: `to_value = from_value * (from_baseValue / to_baseValue)`
- Works for most converters (length, weight, volume, area, etc.)
- Special handling for temperature & currency (non-linear)

### 2.3 Special Converters

**Temperature** (non-linear):

```javascript
// Non-linear, needs special formulas
convert(value, fromUnit, toUnit) {
  if (fromUnit === 'C' && toUnit === 'F') return (value * 9/5) + 32;
  if (fromUnit === 'F' && toUnit === 'C') return (value - 32) * 5/9;
  // ... etc
}
```

**Currency** (requires API):

```javascript
// Rates fetched from exchangerate.host
// Stored in context with 1-hour cache
// Fallback to cached rates if API fails
```

### 2.4 Unit Aliases Map (for search)

```javascript
// src/data/unitAliases.js - Created implicitly during unit definitions
// Fuse.js searches ALL fields: name, aliases, symbol
// "kmh" → matches speedUnits (aliases include "kmh")
// "°c" → matches temperatureUnits (aliases include "°c")
// "ft" → matches lengthUnits (symbol + aliases)
```

---

## 3. SEARCH IMPLEMENTATION PLAN

### 3.1 Fuse.js Configuration

```javascript
// src/utils/searchConfig.js
export const FUSE_OPTIONS = {
  keys: [
    { name: "name", weight: 3 }, // Highest weight: exact name match
    { name: "description", weight: 1 }, // Lower weight: description mention
    { name: "searchableUnits", weight: 2 }, // Medium weight: unit keyword match
  ],
  threshold: 0.4, // Fuzzy threshold (0.4 = 60% match accepted)
  ignoreLocation: true, // Don't favor matches at start
  minMatchCharLength: 2, // Minimum 2 chars to trigger search
};
```

**Search Behavior**:

- User types "len" → matches "Length" (fuzzy)
- User types "kg" → matches "Weight" (unit alias)
- User types "lenght" → matches "Length" (typo tolerance)
- User types "°c" → matches "Temperature" (special char)

### 3.2 useSearch Hook

```javascript
// src/hooks/useSearch.js
export function useSearch(query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults(CONVERTERS); // Show all if empty
      return;
    }

    const fuse = new Fuse(CONVERTERS, FUSE_OPTIONS);
    const searchResults = fuse.search(query);
    setResults(searchResults.map((r) => r.item)); // Extract items
  }, [query]);

  return results;
}
```

### 3.3 SearchBar Component Behavior

```javascript
// src/components/search/SearchBar.jsx
// Props: onResultsChange (callback), onSelectConverter (callback)

// Renders:
// 1. Input field (with clear button)
// 2. Dropdown list (if results exist & field is focused)
//    - Format: [Icon] Name - Description
//    - Keyboard nav: arrow keys, Enter to select, Esc to close

// Mobile optimization:
// - Full-width on mobile
// - Dropdown below input (not overlaying)
// - Larger touch targets (44px min)
```

### 3.4 Home Page Integration

**Desktop**:

- SearchBar at top (sticky)
- Grid below (3 columns) showing all converters
- Grid updates live as user types

**Mobile**:

- SearchBar at top (not sticky, allow scroll)
- Grid below (1 column)
- Grid updates live as user types

---

## 4. CONVERSION LOGIC DESIGN

### 4.1 Linear Converters (Length, Weight, Volume, etc.)

```javascript
// src/utils/conversions/lengthConverter.js
export function convert(value, fromUnit, toUnit) {
  const fromData = LENGTH_UNITS.find((u) => u.symbol === fromUnit);
  const toData = LENGTH_UNITS.find((u) => u.symbol === toUnit);

  if (!fromData || !toData) throw new Error("Invalid unit");

  // Convert to base unit, then to target unit
  const baseValue = value * fromData.baseValue;
  return baseValue / toData.baseValue;
}

export function getUnits() {
  return LENGTH_UNITS;
}
```

**Formula**: `result = value * (from_baseValue / to_baseValue)`

### 4.2 Temperature Converter (Special Case)

```javascript
// src/utils/conversions/temperatureConverter.js
export function convert(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;

  // Convert any unit to Celsius first
  let celsius;
  if (fromUnit === "C") celsius = value;
  else if (fromUnit === "F") celsius = ((value - 32) * 5) / 9;
  else if (fromUnit === "K") celsius = value - 273.15;

  // Convert Celsius to target unit
  if (toUnit === "C") return celsius;
  else if (toUnit === "F") return (celsius * 9) / 5 + 32;
  else if (toUnit === "K") return celsius + 273.15;
}
```

### 4.3 Currency Converter (API-based)

```javascript
// src/utils/conversions/currencyConverter.js
export function convert(value, fromCurrency, toCurrency, rates) {
  // rates = { 'USD': 1, 'EUR': 0.92, 'INR': 83.5, ... }

  if (fromCurrency === toCurrency) return value;
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error("Currency rates not available");
  }

  // Convert to base currency (USD assumed), then to target
  const baseValue = value / rates[fromCurrency];
  return baseValue * rates[toCurrency];
}
```

### 4.4 Error Handling

**Validation**:

- Check for NaN, Infinity, null inputs
- Validate unit existence before conversion
- Handle division by zero

**Try-catch** at component level:

```javascript
try {
  const result = convert(value, fromUnit, toUnit);
  setResult(result);
} catch (error) {
  setError(`Conversion error: ${error.message}`);
}
```

---

## 5. DECIMAL PRECISION SYSTEM

### 5.1 Auto-Detection Algorithm

```javascript
// src/utils/formatting/decimalPrecision.js
export function detectPrecision(inputValue) {
  const str = inputValue.toString();

  // If no decimal point, return 0
  if (!str.includes(".")) return 0;

  // Count digits after decimal
  const decimalPart = str.split(".")[1];
  return decimalPart.length;
}

// Examples:
// 1.5 → 1 decimal
// 1.55 → 2 decimals
// 1.555 → 3 decimals
// 15 → 0 decimals
```

### 5.2 Rounding & Display

```javascript
export function formatResult(value, precision) {
  if (precision === 0) {
    return Math.round(value).toString();
  }

  // Use toFixed for consistent decimal places
  return parseFloat(value.toFixed(precision)).toString();

  // Example:
  // formatResult(1.23456, 2) → "1.23"
  // formatResult(1.23456, 4) → "1.2346"
}
```

### 5.3 Precision in ConverterUI

```javascript
// Flow:
1. User types "1.5" in "From" input
2. Auto-detect precision = 1 decimal
3. Convert to "To" value
4. Display "To" value with 1 decimal place
5. If user then edits "To" input, re-detect precision from that

// Edge cases:
- Very small numbers: 0.000001 → Keep all precision
- Very large numbers: 1234567 → Auto-round to 2-3 decimals
- Show max 10 decimal places (UI constraint)
```

---

## 6. CURRENCY CONVERTER API INTEGRATION

### 6.1 API Strategy

**Endpoint**: `https://api.exchangerate.host/latest?base=USD`

**Response**:

```json
{
  "success": true,
  "timestamp": 1234567890,
  "base": "USD",
  "date": "2025-12-09",
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79,
    "INR": 83.5,
    "JPY": 149.5
    // ... all currencies
  }
}
```

### 6.2 Cache Strategy (1-hour TTL)

```javascript
// src/utils/api/cache.js
export function getCached(key, ttl = 3600000) {
  // ttl in ms, default 1 hour
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const age = Date.now() - timestamp;

  if (age > ttl) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
}

export function setCached(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
}
```

### 6.3 useCurrencyRates Hook

```javascript
// src/hooks/useCurrencyRates.js
export function useCurrencyRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Try to get cached rates first
    const cached = getCached("currencyRates", 1 * 60 * 60 * 1000); // 1 hour
    if (cached) {
      setRates(cached.rates);
      setLastUpdated(cached.timestamp);
      return;
    }

    // Fetch fresh rates
    setLoading(true);
    fetchRates()
      .then((data) => {
        setRates(data.rates);
        setLastUpdated(data.timestamp);
        setCached("currencyRates", data); // Cache new rates
      })
      .catch((err) => {
        // Try to use old cached data as fallback
        const oldCache = getCached("currencyRates", Infinity); // Any age
        if (oldCache) {
          setRates(oldCache.rates);
          setError("Using cached rates (API unavailable)");
        } else {
          setError("Failed to fetch currency rates");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { rates, loading, error, lastUpdated };
}
```

**Graceful Degradation**:

1. ✅ Fresh API data → Use it, cache it
2. ⚠️ API fails + Cache exists → Use cache, show warning
3. ❌ API fails + No cache → Show error message

### 6.4 ExchangeRateInfo Component

```javascript
// Shows last updated timestamp & cache status
// Renders: "Last updated: 2 minutes ago" or "Using cached rates (API unavailable)"
```

---

## 7. COMPONENT HIERARCHY & PROPS

### 7.1 Search Components

```
App
├── Header
└── Home
    ├── SearchBar
    │   ├── input
    │   ├── clear button
    │   └── SearchResults (dropdown)
    │       └── ResultItem[] (each is a converter card)
    └── ConverterGrid
        └── ConverterCard[]
```

**SearchBar Props**:

```javascript
{
  onSearch: (query: string) => void,
  onSelectConverter: (converterId: string) => void,
  placeholder?: string,
}
```

**SearchResults Props**:

```javascript
{
  results: Converter[],
  isVisible: boolean,
  onSelectConverter: (converterId: string) => void,
}
```

**ConverterCard Props**:

```javascript
{
  converter: Converter,
  onClick: (converterId: string) => void,
}
```

### 7.2 Converter Components

```
ConverterDetail (page)
└── ConverterUI
    ├── ConverterInput (left/from)
    │   ├── input field
    │   └── ConverterSelector (dropdown)
    ├── swap button
    ├── ConverterInput (right/to)
    │   ├── input field
    │   └── ConverterSelector (dropdown)
    └── ExchangeRateInfo (only for currency)
```

**ConverterInput Props**:

```javascript
{
  value: number | string,
  onValueChange: (value: string) => void,
  unit: string,
  onUnitChange: (unit: string) => void,
  units: Unit[],
  label: string,
}
```

**ConverterSelector Props**:

```javascript
{
  options: Unit[],
  selectedValue: string,
  onChange: (unit: string) => void,
}
```

**ConverterUI Props**:

```javascript
{
  converterData: Converter,
  // Currency specific:
  rates?: { [key: string]: number },
  ratesLoading?: boolean,
  ratesError?: string,
}
```

### 7.3 State Management Pattern

**Local Component State** (useConverter hook):

```javascript
const [fromValue, setFromValue] = useState("");
const [toValue, setToValue] = useState("");
const [fromUnit, setFromUnit] = useState(converter.defaultFromUnit);
const [toUnit, setToUnit] = useState(converter.defaultToUnit);
const [error, setError] = useState(null);
const [precision, setPrecision] = useState(null); // null = auto
```

**Global State** (Context - only for currency rates):

```javascript
// CurrencyContext
{
  rates: { [key: string]: number },
  loading: boolean,
  error: string | null,
  lastUpdated: number,
}
```

---

## 8. ROUTING & NAVIGATION STRATEGY

### 8.1 Route Structure

```
/                      → Home page (search + grid)
/converter/:id         → Converter detail page
/*                     → 404 Not Found
```

**Example URLs**:

- `/converter/length` → Length converter
- `/converter/temperature` → Temperature converter
- `/converter/currency` → Currency converter

### 8.2 Route Configuration

```javascript
// src/Router.jsx
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "converter/:id",
        element: <ConverterDetail />,
      },
    ],
  },
]);
```

### 8.3 ConverterDetail Navigation

**From Home**:

- User searches & clicks a converter card
- Navigate to `/converter/:id`

**From ConverterDetail**:

- User clicks SearchBar
- Shows results dropdown
- Clicking a result navigates to `/converter/:id` (may be same or different)

**Browser Back/Forward**:

- Works naturally with React Router
- State resets (no persisted input values)

### 8.4 Deep-Linking

- User can directly visit `/converter/length`
- Converter data loaded from metadata
- Works without prior navigation

---

## 9. UI/UX & TAILWIND STRATEGY

### 9.1 Design System

**Color Scheme** (Dark Mode First):

- Background: `bg-gray-950` (very dark)
- Cards: `bg-gray-900` (slightly lighter)
- Text: `text-gray-100` (light gray)
- Accent: `bg-blue-600` (interactive elements)
- Success: `bg-green-600` (validation)
- Error: `bg-red-600` (errors)

**Typography**:

- Headings: Inter, 28px/24px/20px (h1/h2/h3)
- Body: Inter, 16px (default)
- Small: 14px (captions, descriptions)

**Spacing**:

- Base unit: 4px (Tailwind default)
- Padding/margin: 4, 8, 12, 16, 20, 24, 32 (use multiples of 4)

### 9.2 Responsive Breakpoints

| Breakpoint | Use Case       | Columns |
| ---------- | -------------- | ------- |
| Mobile     | < 640px        | 1 col   |
| Tablet     | 640px - 1024px | 2 cols  |
| Desktop    | > 1024px       | 3 cols  |

```tailwind
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

### 9.3 Component Styling

**SearchBar**:

- `bg-gray-900 border border-gray-700 rounded-lg p-3`
- Focus: `ring-2 ring-blue-500`
- Mobile: Full width with padding

**ConverterCard**:

- `bg-gray-900 rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition`
- Icon: 32px, centered
- Title: 18px, bold
- Description: 14px, gray-400

**Input Fields**:

- `bg-gray-800 text-gray-100 border border-gray-700 rounded-lg p-3`
- Focus: `ring-2 ring-blue-500 border-transparent`
- Placeholder: `text-gray-500`

**Dropdown**:

- `bg-gray-900 border border-gray-700 rounded-lg p-2`
- Options: `hover:bg-blue-600` on hover
- Selected: `bg-blue-600`

**Button (Swap)**:

- `bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition`
- Mobile: Larger touch target (44px min)

### 9.4 Accessibility

- Min touch target: 44x44px (mobile)
- Color contrast: WCAG AA (4.5:1 for text)
- Focus indicators: Blue ring on all interactive elements
- Keyboard nav: Tab through inputs, arrow keys in dropdowns, Enter to select

### 9.5 Animations & Transitions

- Smooth: `transition-all duration-200`
- Hover effects: Color shift, shadow
- No excessive animations (performance)

---

## 10. BIDIRECTIONAL CONVERSION LOGIC

### 10.1 Two-Input Pattern

```
[Input A] → [Unit A Dropdown]     [Input B] → [Unit B Dropdown]
    ↓                                  ↑
    └──────── Conversion ──────────────┘
```

**Scenarios**:

1. User types in Input A → Calculate Input B
2. User types in Input B → Calculate Input A
3. User changes Unit A → Recalculate Input B
4. User changes Unit B → Recalculate Input A

### 10.2 State Management

```javascript
const [fromValue, setFromValue] = useState("");
const [toValue, setToValue] = useState("");
const [fromUnit, setFromUnit] = useState(defaultFromUnit);
const [toUnit, setToUnit] = useState(defaultToUnit);
const [lastEdited, setLastEdited] = useState("from"); // Track which input was edited
```

### 10.3 Conversion Functions

```javascript
function handleFromValueChange(value) {
  setFromValue(value);
  setLastEdited("from");

  if (value === "" || isNaN(value)) {
    setToValue("");
    return;
  }

  try {
    const converted = convert(parseFloat(value), fromUnit, toUnit);
    const precision = detectPrecision(value);
    setToValue(formatResult(converted, precision));
  } catch (error) {
    setError(error.message);
  }
}

function handleToValueChange(value) {
  setToValue(value);
  setLastEdited("to");

  if (value === "" || isNaN(value)) {
    setFromValue("");
    return;
  }

  try {
    const converted = convert(
      parseFloat(value),
      toUnit,
      fromUnit // Note: reversed
    );
    const precision = detectPrecision(value);
    setFromValue(formatResult(converted, precision));
  } catch (error) {
    setError(error.message);
  }
}

function handleUnitChange(newUnit, side) {
  if (side === "from") {
    setFromUnit(newUnit);
    // Recalculate to value if from value exists
    if (fromValue) handleFromValueChange(fromValue);
  } else {
    setToUnit(newUnit);
    // Recalculate from value if to value exists
    if (toValue) handleToValueChange(toValue);
  }
}
```

### 10.4 Swap Button Logic

```javascript
function handleSwap() {
  // Swap units
  [setFromUnit, setToUnit] = [toUnit, fromUnit];

  // Swap values
  [setFromValue, setToValue] = [toValue, fromValue];

  // Reset precision detection
  setLastEdited(null);
}
```

**Visual feedback**: Button should show ↔️ icon, animate on click

---

## 11. ERROR HANDLING & EDGE CASES

### 11.1 Input Validation

```javascript
function validateInput(value) {
  // Empty input: OK (just show empty output)
  if (value === "") return true;

  // NaN: Invalid
  if (isNaN(parseFloat(value))) return false;

  // Infinity: Invalid
  if (!isFinite(parseFloat(value))) return false;

  // Scientific notation: OK (1e10 is valid)
  // Negative: OK (temperature can be negative)

  return true;
}
```

### 11.2 Conversion Errors

| Error                    | Cause                      | Handling                       |
| ------------------------ | -------------------------- | ------------------------------ |
| Invalid unit             | Unit not found in database | Show error, keep old value     |
| API failed (currency)    | Network issue              | Use cached rates, show warning |
| Invalid input            | NaN, Infinity              | Clear output, don't show error |
| Temperature special case | Invalid combo              | Show error message             |

### 11.3 Edge Cases

**Temperature**:

- Kelvin can't be negative → Warn user for K < 0
- Celsius/Fahrenheit can be negative → OK

**Currency**:

- Rates not available → Show cached rates + warning
- User offline → Use cached rates (no warning, assume intentional)

**Very large/small numbers**:

- 1e20 → Display in scientific notation
- 0.000001 → Display with many decimals, but cap at 10

---

## 12. PERFORMANCE CONSIDERATIONS

### 12.1 Code Splitting

- Routes lazy-loaded: `React.lazy(() => import('./pages/ConverterDetail'))`
- Each converter module is separate (treeshakeable)

### 12.2 Memoization

- Converter cards memoized (expensive render) → `React.memo(ConverterCard)`
- Search results memoized → `useMemo` in useSearch hook
- Conversion functions pure (no side effects)

### 12.3 API Caching

- Currency rates cached 1 hour in localStorage
- No refetch on every mount
- Manual refresh button (optional for v2)

### 12.4 Bundle Size

- Fuse.js: ~12kb gzipped (acceptable)
- React Router: ~10kb gzipped (already in deps)
- Total bundle: Should be <100kb (with all code)

---

## 13. TESTING STRATEGY (For Reference)

### 13.1 Unit Tests

- Conversion functions: `convert(5, 'm', 'km') === 0.005`
- Decimal precision: `detectPrecision(1.5) === 1`
- Input validation: `validateInput('abc') === false`

### 13.2 Integration Tests

- Search: Type "len" → Shows length converter
- Conversion: Enter value in from field → To field updates
- Currency: Fetch rates → Display in dropdown

### 13.3 E2E Tests (Cypress/Playwright)

- Homepage loads → Search bar visible
- Click converter card → Navigate to detail page
- Enter value → Real-time conversion works
- Swap units → Values swap correctly

---

## 14. DEPLOYMENT CONSIDERATIONS

### 14.1 Build

```bash
npm run build
# Outputs: dist/
# Size should be ~50-80kb gzipped
```

### 14.2 Hosting

- Static hosting: Vercel, Netlify, GitHub Pages
- No backend needed (API calls direct from frontend)
- ENV variables: None required (free API)

### 14.3 Browser Support

- Modern browsers (ES2020+)
- Mobile: iOS 12+, Android 8+
- No IE11 support needed

---

## SUMMARY

| Aspect                | Decision                                                                               |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Search**            | Fuse.js on name + description + unit aliases                                           |
| **Converters**        | 10 types (length, weight, volume, temp, speed, pressure, energy, area, time, currency) |
| **Conversion**        | Linear formula for most, special handling for temperature, API for currency            |
| **Decimal Precision** | Auto-detect from input, cap at 10 decimals                                             |
| **Currency API**      | exchangerate.host (free, no key), 1-hour cache, graceful fallback                      |
| **UI**                | Dark mode, Tailwind, mobile-first, responsive 1/2/3 cols                               |
| **Routing**           | / (home), /converter/:id (detail), /\* (404)                                           |
| **State**             | Local component state + Context for currency rates only                                |
| **Bidirectional**     | Convert on value OR unit change, track last edited input                               |

✅ **Ready for implementation**
