import { FiAlertCircle, FiChevronRight } from "react-icons/fi";

export default function SearchResults({ results, onSelectConverter, highlightIndex = 0 }) {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-3 p-6
                      bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700
                      rounded-2xl text-center shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
          <FiAlertCircle className="text-3xl opacity-50" />
          <p className="font-medium">No converters found</p>
          <p className="text-xs opacity-70">Try searching for a different unit or keyword</p>
        </div>
      </div>
    );
  }

  const getCategoryColor = (cat) => {
    const map = {
      "Engineering": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      "Physics": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
      "Data": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      "Common": "bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300",
    };
    return map[cat] || map["Common"];
  };

  return (
    <div
      role="listbox"
      className="absolute top-full left-0 right-0 mt-3
                 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700
                 rounded-2xl shadow-2xl max-h-104 overflow-y-auto z-50
                 animate-in fade-in slide-in-from-top-2 duration-200 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
    >
      <div className="p-2 space-y-1">
        {results.map((converter, idx) => {
          const isActive = idx === highlightIndex;
          return (
            <button
              key={converter.id}
              role="option"
              onClick={() => onSelectConverter(converter.id)}
              className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-4 group cursor-pointer
                ${isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500/30"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent"
                }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl shadow-sm transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'} bg-white dark:bg-gray-700/50`}>
                {converter.icon}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-base transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {converter.name}
                  </span>

                  {converter.category && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getCategoryColor(converter.category)}`}>
                      {converter.category}
                    </span>
                  )}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm truncate pr-4 opacity-90">
                  {converter.description}
                </p>
              </div>

              <FiChevronRight className={`text-gray-300 dark:text-gray-600 transition-all duration-200 ${isActive ? 'translate-x-1 text-blue-500 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
