import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound({
  message = "The page you are looking for does not exist.",
}) {
  return (
    <div className="text-center py-16 px-4">
      <div className="flex justify-center mb-4">
        <FiAlertTriangle className="text-yellow-400 text-5xl" />
      </div>

      <h1 className="text-4xl font-bold text-gray-100 mb-2">404</h1>

      <p className="text-gray-400 mb-8 max-w-lg mx-auto">{message}</p>

      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
