import { FiArrowRight, FiClock, FiTrash2 } from "react-icons/fi";

export default function RecentConversions({ recents, onClear, onRestore }) {
  if (recents.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3 pl-1">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <FiClock /> Recent
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/10 cursor-pointer"
        >
          <FiTrash2 /> Clear
        </button>
      </div>

      <div className="space-y-2">
        {recents.map((item) => (
          <button
            key={item.id}
            onClick={() => onRestore(item)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group cursor-pointer text-left"
          >
            <div className="flex items-center gap-2 xs:gap-3 text-sm xs:text-base font-medium text-gray-700 dark:text-gray-200 overflow-hidden">
              <span className="truncate max-w-[80px] xs:max-w-[100px]">{item.fromVal} {item.fromUnit}</span>
              <FiArrowRight className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
              <span className="truncate max-w-[80px] xs:max-w-[100px] text-gray-900 dark:text-white font-bold">{item.toVal} {item.toUnit}</span>
            </div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
              Restore
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
