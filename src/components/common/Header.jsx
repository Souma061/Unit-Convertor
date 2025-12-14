
import { FiMoon, FiRefreshCw, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { precision, togglePrecision } = useSettings();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/80">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Go to Home"
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          { }
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <FiRefreshCw className="text-lg font-bold" />
          </div>
          { }
          <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Metriq
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={togglePrecision}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100/50 hover:bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:text-gray-300 transition-all hover:ring-2 ring-transparent ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:outline-none focus:ring-blue-500 cursor-pointer text-xs font-medium"
            title={precision === 2 ? "Switch to high precision" : "Switch to 2 decimal places"}
          >
            <span>Precision:</span>
            <span className={`inline-block px-1.5 py-0.5 rounded ${precision === 2 ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-gray-200 dark:bg-gray-700"}`}>
              {precision === 2 ? "2.00" : "Auto"}
            </span>
          </button>

          { }
          <button
            onClick={togglePrecision}
            className="sm:hidden p-2 rounded-xl bg-gray-100/50 hover:bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:text-gray-300 transition-all"
            aria-label="Toggle Precision"
          >
            <span className="text-xs font-bold font-mono">{precision === 2 ? ".00" : "Auto"}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 sm:p-2.5 rounded-xl bg-gray-100/50 hover:bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800 dark:text-gray-300 transition-all hover:ring-2 ring-transparent ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:outline-none focus:ring-blue-500 cursor-pointer"
          >
            {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>
      </nav>
    </header>
  );
};
