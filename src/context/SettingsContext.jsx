import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // precision: "auto" (null) or "fixed" (2)
  // We'll store it as a string "auto" or "fixed" to simpler handling in localStorage,
  // or just directly store the number/null.
  // Let's stick to the logic: null = full/smart, 2 = fixed 2 decimals.
  const [precision, setPrecision] = useState(() => {
    const saved = localStorage.getItem("app_precision");
    if (saved === "fixed") return 2;
    return null; // Default to full/auto precision
  });

  useEffect(() => {
    if (precision === 2) {
      localStorage.setItem("app_precision", "fixed");
    } else {
      localStorage.setItem("app_precision", "auto");
    }
  }, [precision]);

  const togglePrecision = () => {
    setPrecision((prev) => (prev === null ? 2 : null));
  };

  return (
    <SettingsContext.Provider value={{ precision, togglePrecision }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}


