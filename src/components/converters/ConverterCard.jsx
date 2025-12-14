import { useNavigate } from "react-router-dom";

export default function ConverterCard({ converter }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label={`Open ${converter.name} converter`}
      onClick={() => navigate(`/converter/${converter.id}`)}
      className="group relative overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 p-6 text-left transition duration-200 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 active:scale-95 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-4xl shrink-0">{converter.icon}</span>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
          {converter.category}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{converter.name}</h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
        {converter.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
          Quick convert
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition text-sm">
          Open →
        </span>
      </div>
    </button>
  );
}


