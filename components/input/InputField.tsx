"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// 1. Extend standard HTML input props so it accepts onBlur, name, ref, etc. automatically
interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export function InputField({
  label,
  icon: Icon,
  type = "text",
  className = "",
  // 2. We extract the props we manage manually, pass the rest (...props) down
  disabled,
  ...props
}: SimpleInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const container = `
    relative flex items-center rounded-md transition-all duration-200 border
    ${
      focused
        ? "border-ring bg-card ring-2 ring-ring/10 shadow-sm"
        : "border-input bg-input hover:border-ring/50"
    }
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <div className={container}>
        {Icon && <Icon size={20} className="ml-4 text-muted-foreground" />}

        <input
          type={inputType}
          disabled={disabled}
          // 3. Handle focus locally, but still allow parent onFocus/onBlur if needed
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={`flex-1 px-4 py-2 bg-transparent outline-none text-foreground placeholder:text-muted-foreground ${className}`}
          // 4. Spread the rest of the props (onChange, value, name, ref, etc.)
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mr-4 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
