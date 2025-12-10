import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Wait for exit animation
    }, 1500); // Show for 1.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 dark:opacity-40 rounded-full animate-pulse"></div>
        <div className="relative h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center mb-6 animate-bounce-slow">
          <FiRefreshCw className="text-4xl text-white animate-spin-slow" />
        </div>
      </div>

      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight mb-2">
        UnitMaster
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide uppercase">
        Precision Converter
      </p>

      {/* Loading Bar */}
      <div className="w-48 h-1 bg-gray-100 dark:bg-gray-800 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 w-1/2 animate-loading-bar rounded-full"></div>
      </div>
    </div>
  );
}
