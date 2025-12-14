import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import EnergyMassConverter from "../components/science/EnergyMassConverter.jsx";
import SigFigCalculator from "../components/science/SigFigCalculator.jsx";
import * as Constants from "../data/physicsConstants.js";

export default function ScienceMode() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (key, value) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
  };

  useEffect(() => {
    if (copiedKey) {
      const timer = setTimeout(() => setCopiedKey(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedKey]);
  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-14">
      <Helmet>
        <title>Science & Physics Tools - Metriq</title>
        <meta name="description" content="Physics constants, E=mc² calculator, and Significant Figures tools." />
      </Helmet>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
        >
          <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
          Back to Converters
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Science Tools</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <EnergyMassConverter />
        <SigFigCalculator />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Physical Constants</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(Constants).map(([key, value]) => (
            <div
              key={key}
              onClick={() => handleCopy(key, value)}
              className="group relative p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex justify-between items-start">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {key.replace(/_/g, " ")}
                </div>
                {copiedKey === key ? (
                  <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full fade-in">
                    Copied!
                  </span>
                ) : (
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] text-blue-600 dark:text-blue-400 font-medium transition-opacity">
                    Click to copy
                  </span>
                )}
              </div>
              <div className="font-mono font-medium text-gray-900 dark:text-gray-200 break-all">
                {value.toExponential(4)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
