"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SimpleInputProps {
  label?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function InputField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  disabled = false,
  value = "",
  onChange,
  className = "",
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

  const inputStyle = `
    flex-1 px-4 py-1.25 bg-transparent outline-none text-foreground 
    placeholder:text-muted-foreground ${className}
  `.trim();

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
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange?.(e.target.value)}
          className={inputStyle}
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
