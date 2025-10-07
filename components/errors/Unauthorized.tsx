import React from "react";
import React, { useState, useEffect } from "react";
import {
  Home,
  RefreshCw,
  ArrowLeft,
  AlertTriangle,
  Lock,
  Server,
  Clock,
  Wifi,
} from "lucide-react";

const Unauthorized = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const colorVariants = {
    blue: "from-blue-500 to-purple-600",
    red: "from-red-500 to-pink-600",
    yellow: "from-yellow-500 to-orange-600",
    green: "from-green-500 to-teal-600",
    gray: "from-gray-500 to-slate-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Content */}
        <div
          className={`relative z-10 transform transition-all duration-1000 ${
            isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Error Code with Gradient */}
          <div
            className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${colorVariants[color]} mb-8 shadow-2xl`}
          >
            <Icon size={48} className="text-white animate-bounce" />
          </div>

          {/* Error Code Number */}
          <h1
            className={`text-8xl font-bold bg-gradient-to-r ${colorVariants[color]} bg-clip-text text-transparent mb-4`}
          >
            {code}
          </h1>

          {/* Title */}
          <h2 className="text-3xl font-semibold text-white mb-4">{title}</h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                What you can try:
              </h3>
              <ul className="text-left text-gray-300 space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft
                size={20}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              Go Back
            </button>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 group"
            >
              <RefreshCw
                size={20}
                className="mr-2 group-hover:rotate-180 transition-transform duration-500"
              />
              Retry
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className={`flex items-center justify-center px-6 py-3 bg-gradient-to-r ${colorVariants[color]} hover:shadow-lg rounded-full text-white font-medium transition-all duration-300 hover:scale-105 group`}
            >
              <Home
                size={20}
                className="mr-2 group-hover:scale-110 transition-transform"
              />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
