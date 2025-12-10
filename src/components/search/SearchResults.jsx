export default function SearchResults({ results, onSelectConverter, highlightIndex = 0 }) {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-gray-600 dark:text-gray-400 z-40 shadow-md">
        No converters found.
      </div>
    );
  }

  return (
    <div
      role="listbox"
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto z-40"
    >
      {results.map((converter, idx) => {
        const isActive = idx === highlightIndex;
        return (
          <button
            key={converter.id}
            role="option"
            onClick={() => onSelectConverter(converter.id)}
            className={`w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition flex items-center gap-3 cursor-pointer ${isActive ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-l-blue-500" : "hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
          >
            <span className="text-2xl shrink-0">{converter.icon}</span>

            <div className="flex-1 min-w-0">
              <p className="text-gray-900 dark:text-white font-semibold">{converter.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                {converter.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
