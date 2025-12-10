
import { Link } from 'react-router-dom';
import { FiRefreshCw } from 'react-icons/fi';

export default function Header() {
  return (
    <header
      className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm"
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 sm:py-5">
        <Link
          to="/"
          aria-label="Go to Home"
          className="flex items-center gap-3 hover:opacity-90 active:scale-[0.98] transition"
        >
          <FiRefreshCw className="text-2xl sm:text-3xl text-blue-400" />

          <h1 className="text-xl sm:text-2xl font-bold text-gray-100 tracking-tight">
            Unit Converter
          </h1>
        </Link>
      </nav>
    </header>
  );
}
