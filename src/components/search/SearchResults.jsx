export default function SearchResults({ results, onSelectConverter }) {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg p-4 text-center text-gray-400 z-40">
        No converters found.
      </div>
    );
  }

  return (
    <div
      role="listbox"
      className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-40 overflow-hidden"
    >
      {results.map((converter) => (
        <button
          key={converter.id}
          role="option"
          onClick={() => onSelectConverter(converter.id)}
          className="w-full text-left px-4 py-3 hover:bg-gray-800 focus:bg-gray-700
                     border-b border-gray-700 last:border-b-0 transition flex items-center gap-3 cursor-pointer"
        >
          <span className="text-2xl">{converter.icon}</span>

          <div className="flex-1">
            <p className="text-gray-100 font-medium">{converter.name}</p>

            <p className="text-gray-400 text-sm truncate">
              {converter.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
