"use client";

import React from "react";

type Variant = "ring" | "dots";
type Color = "black" | "white" | "both";

interface LoaderProps {
  variant?: Variant;
  color?: Color;
  size?: number; // base size in px
  title?: string; // NEW: optional title
  fullscreen?: boolean; // NEW: show overlay in center
  className?: string;
  "aria-label"?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  variant = "dots",
  color = "white",
  size = 40,
  title = "",
  fullscreen = true,
  className = "",
  "aria-label": ariaLabel = "Loading",
}) => {
  const sizeStyle = { width: size, height: size };

  const renderRing = (colorClass: string) => (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`inline-block ${colorClass} rounded-full animate-spin`}
      style={
        {
          borderWidth: Math.max(2, Math.floor(size / 10)),
          borderStyle: "solid",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          ...sizeStyle,
        } as React.CSSProperties
      }
    />
  );

  const renderDots = (dotColorClass: string) => {
    const dot = (delay: number) => (
      <span
        key={delay}
        className={`inline-block ${dotColorClass} rounded-full animate-pulse`}
        style={{
          width: Math.max(6, Math.floor(size / 6)),
          height: Math.max(6, Math.floor(size / 6)),
          margin: Math.max(2, Math.floor(size / 20)),
          animationDelay: `${delay}ms`,
          display: "inline-block",
        }}
      />
    );

    return (
      <div
        role="status"
        aria-label={ariaLabel}
        className="inline-flex items-center"
      >
        {dot(0)}
        {dot(200)}
        {dot(400)}
      </div>
    );
  };

  const loaderIcon =
    variant === "ring" ? (
      color === "both" ? (
        <>
          <div className="mr-3">{renderRing("border-black")}</div>
          <div>{renderRing("border-white")}</div>
        </>
      ) : color === "black" ? (
        renderRing("border-black")
      ) : (
        renderRing("border-white")
      )
    ) : color === "both" ? (
      <div className="flex items-center space-x-2">
        <div>{renderDots("bg-black")}</div>
        <div>{renderDots("bg-white")}</div>
      </div>
    ) : color === "black" ? (
      renderDots("bg-black")
    ) : (
      renderDots("bg-white")
    );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-50">
        <div className={`flex items-center justify-center ${className}`}>
          {loaderIcon}
        </div>
        {title && (
          <p className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
            {title}
          </p>
        )}
      </div>
    );
  }

  // non-fullscreen mode (inline)
  return (
    <div
      className={`inline-flex flex-col items-center justify-center ${className}`}
    >
      {loaderIcon}
      {title && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{title}</p>
      )}
    </div>
  );
};

export default Loader;
