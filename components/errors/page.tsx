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

const ErrorPage = ({
  code,
  title,
  description,
  icon: Icon,
  color = "blue",
  suggestions = [],
}) => {
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

const ErrorPageShowcase = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const errorPages = [
    {
      code: 404,
      title: "Page Not Found",
      description:
        "The page you're looking for seems to have wandered off into the digital wilderness.",
      icon: AlertTriangle,
      color: "blue",
      suggestions: [
        "Check the URL for typos",
        "Use the navigation menu to find what you need",
        "Search for the content you were looking for",
        "Contact support if you believe this is an error",
      ],
    },
    {
      code: 403,
      title: "Access Forbidden",
      description:
        "You don't have permission to access this resource. It's like a VIP area, but digital.",
      icon: Lock,
      color: "red",
      suggestions: [
        "Log in with an authorized account",
        "Check if you have the necessary permissions",
        "Contact an administrator for access",
        "Verify you're accessing the correct URL",
      ],
    },
    {
      code: 500,
      title: "Internal Server Error",
      description:
        "Something went wrong on our end. Our engineers are probably caffeinated and working on it.",
      icon: Server,
      color: "red",
      suggestions: [
        "Try refreshing the page in a few moments",
        "Check if the issue persists",
        "Contact support if the problem continues",
        "Try again later",
      ],
    },
    {
      code: 503,
      title: "Service Unavailable",
      description:
        "Our servers are taking a coffee break. They'll be back shortly, more energized than ever.",
      icon: Clock,
      color: "yellow",
      suggestions: [
        "Wait a few minutes and try again",
        "Check our status page for updates",
        "Follow us on social media for announcements",
        "Contact support for urgent matters",
      ],
    },
    {
      code: 401,
      title: "Unauthorized",
      description:
        "You need to authenticate yourself before accessing this content.",
      icon: Lock,
      color: "yellow",
      suggestions: [
        "Log in to your account",
        "Check your credentials",
        "Reset your password if needed",
        "Contact support if login issues persist",
      ],
    },
    {
      code: 429,
      title: "Too Many Requests",
      description:
        "Whoa there, speed racer! You're making requests faster than we can handle.",
      icon: Clock,
      color: "gray",
      suggestions: [
        "Wait a moment before trying again",
        "Reduce the frequency of your requests",
        "Check if you're within rate limits",
        "Consider upgrading your plan for higher limits",
      ],
    },
    {
      code: 502,
      title: "Bad Gateway",
      description:
        "Our servers are having trouble talking to each other. It's like a bad phone connection.",
      icon: Wifi,
      color: "red",
      suggestions: [
        "Refresh the page in a few seconds",
        "Try accessing from a different browser",
        "Check your internet connection",
        "Report the issue if it persists",
      ],
    },
  ];

  // Note about 304: It's not typically shown to users as it's a cache-related status
  // that browsers handle automatically, so I've included other useful error codes instead

  return (
    <div className="w-full">
      {/* Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
        <div className="flex space-x-2">
          {errorPages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Error Page Display */}
      <ErrorPage {...errorPages[currentPage]} />

      {/* Page Counter */}
      <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
        <span className="text-white text-sm">
          {currentPage + 1} / {errorPages.length}
        </span>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentPage((prev) =>
            prev > 0 ? prev - 1 : errorPages.length - 1
          )
        }
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/20 transition-all duration-300 hover:scale-110"
      >
        <ArrowLeft size={24} className="text-white" />
      </button>

      <button
        onClick={() =>
          setCurrentPage((prev) =>
            prev < errorPages.length - 1 ? prev + 1 : 0
          )
        }
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/20 transition-all duration-300 hover:scale-110"
      >
        <ArrowLeft size={24} className="text-white rotate-180" />
      </button>
    </div>
  );
};

export default ErrorPageShowcase;
