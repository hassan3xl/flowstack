"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check, X, ChevronDown } from "lucide-react";
import {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  field?: "input" | "textarea" | "checkbox" | "select" | "radio";
  type?: string;
  placeholder?: string;
  error?: FieldError;
  success?: string;
  disabled?: boolean;
  options?: Option[];
  rows?: number;
  multiple?: boolean;
  validation?: object;
  className?: string;
  [key: string]: any;
}

function FormInput<T extends FieldValues>({
  name,
  register,
  label,
  icon: Icon,
  field = "input",
  type = "text",
  placeholder,
  error,
  success,
  disabled = false,
  options = [],
  rows = 4,
  multiple = false,
  validation = {},
  className = "",
  ...props
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const getContainerClasses = () => {
    const base =
      "relative flex items-center rounded-lg transition-all duration-200 border";
    const state = error
      ? "border-red-500 bg-red-50 dark:bg-red-950/20"
      : success
      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
      : focused
      ? "border-ring bg-background/60 ring-2 ring-ring/10 shadow-sm"
      : "border-input bg-background hover:border-ring/50";
    const disabledState = disabled ? "opacity-50 cursor-not-allowed" : "";
    return `${base} ${state} ${disabledState}`;
  };

  const getIconClasses = () =>
    error
      ? "text-red-500 dark:text-red-400"
      : success
      ? "text-green-500 dark:text-green-400"
      : "text-muted-foreground";

  const fieldClass =
    `flex-1 px-4 py-2.5 bg-transparent outline-none text-foreground placeholder:text-muted-foreground ${className}`.trim();

  const renderInput = () => {
    switch (field) {
      case "textarea":
        return (
          <div className={getContainerClasses()}>
            {Icon && (
              <Icon
                size={20}
                className={`ml-4 self-start mt-3 ${getIconClasses()}`}
              />
            )}
            <textarea
              {...register(name, validation)}
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`${fieldClass} resize-none`}
              {...props}
            />
          </div>
        );

      case "select":
        return (
          <div className={`${getContainerClasses()} relative`}>
            {Icon && <Icon size={20} className={`ml-4 ${getIconClasses()}`} />}
            <select
              {...register(name, validation)}
              disabled={disabled}
              multiple={multiple}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`${fieldClass} pr-10 appearance-none cursor-pointer`}
              {...props}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register(name, validation)}
              disabled={disabled}
              className="sr-only"
              id={name}
              {...props}
            />
            <label
              htmlFor={name}
              className={`w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div
                className={`w-full h-full rounded-md flex items-center justify-center transition-colors ${
                  error
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                    : "border-input hover:border-ring"
                }`}
              >
                <Check
                  size={16}
                  className="text-primary opacity-0 peer-checked:opacity-100"
                />
              </div>
            </label>
            {label && (
              <label
                htmlFor={name}
                className="text-sm select-none cursor-pointer"
              >
                {label}
              </label>
            )}
          </div>
        );

      default:
        return (
          <div className={getContainerClasses()}>
            {Icon && <Icon size={20} className={`ml-4 ${getIconClasses()}`} />}
            <input
              type={inputType}
              {...register(name, validation)}
              placeholder={placeholder}
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={fieldClass}
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
        );
    }
  };

  return (
    <div className="mb-6 w-full">
      {label && field !== "checkbox" && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-foreground text-left"
        >
          {label}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
          <X size={14} className="mr-1" /> {error.message}
        </p>
      )}
      {success && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center">
          <Check size={14} className="mr-1" /> {success}
        </p>
      )}
    </div>
  );
}

export { FormInput };
