
import { FiMoon, FiRefreshCw, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/80">
      <nav className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
        <Link
          to="/"
          aria-label="Go to Home"
          className="flex items-center gap-2 sm:gap-3 hover:opacity-80 active:scale-95 transition shrink-0"
        >
          <span className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-md dark:from-blue-600 dark:to-blue-700 flex-shrink-0">
            <FiRefreshCw className="text-lg sm:text-xl font-bold" />
          </span>
          <div className="leading-tight hidden xs:block">
            <div className="text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">Precision Suite</div>
            <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Unit Converter
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="hidden md:flex items-center gap-2 sm:gap-3 text-xs text-gray-600 dark:text-gray-400">
            {["Fast", "Accurate", "Live rates"].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1.5 rounded-full border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
              >
                {pill}
              </span>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
