
import { FiMoon, FiRefreshCw, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/80">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Go to Home"
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          {/* Logo Icon */}
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <FiRefreshCw className="text-lg font-bold" />
          </div>
          {/* Brand Name */}
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Metriq
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            {/* Pills can be removed or kept minimal if desired, keeping minimal based on screenshot */}
          </div>

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
}
