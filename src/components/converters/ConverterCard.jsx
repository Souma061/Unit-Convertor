import { useNavigate } from "react-router-dom";

export default function ConverterCard({ converter }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label={`Open ${converter.name} converter`}
      onClick={() => navigate(`/converter/${converter.id}`)}
      className="bg-gray-900 hover:bg-gray-800 border border-gray-800
                 rounded-xl p-6 text-left transition duration-200
                 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer"
    >
      <div className="text-4xl mb-4">{converter.icon}</div>

      <h3 className="text-lg font-bold text-gray-100 mb-1">
        {converter.name}
      </h3>

      <p className="text-gray-400 text-sm line-clamp-2">
        {converter.description}
      </p>

      <div className="mt-4 text-xs">
        <span className="inline-block bg-gray-800/60 text-gray-300 px-2 py-1 rounded backdrop-blur-sm">
          {converter.category}
        </span>
      </div>
    </button>
  );
}
