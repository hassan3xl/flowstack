import React, { useState } from "react";
import { Eye, EyeOff, Check, X, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface InputFieldProps {
  label?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  field: "input" | "textarea" | "checkbox" | "select" | "radio" | "calendar";
  type?: string;
  placeholder?: string;
  value?: string | boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error?: string;
  success?: string;
  disabled?: boolean;
  options?: Option[];
  rows?: number;
  multiple?: boolean;
  [key: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon: Icon,
  field = "input",
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  options = [],
  rows = 4,
  multiple = false,
  ...props
}) => {
  // pull out any className passed in so it doesn't override internal classes
  const { className: incomingClassName = "", ...restProps } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const getContainerClasses = () => {
    const baseClasses =
      "relative flex items-center border-2 rounded-xl transition-all duration-300";
    const stateClasses = error
      ? "border-red-400 bg-red-50"
      : success
      ? "border-green-400 bg-green-50"
      : focused
      ? "border-slate-200 bg-tertiary shadow-lg"
      : "border-slate-200 bg-tertiary hover:border-slate-400";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return `${baseClasses} ${stateClasses} ${disabledClasses}`;
  };

  const getIconClasses = () => {
    return error
      ? "text-red-500"
      : success
      ? "text-green-500"
      : "text-slate-400";
  };

  const renderInput = () => {
    switch (field) {
      case "textarea": {
        const fieldClass =
          `flex-1 px-4 py-2 bg-transparent outline-none text-white placeholder-gray-300 resize-none ${incomingClassName}`.trim();
        return (
          <div className={getContainerClasses()}>
            {Icon && (
              <Icon
                size={20}
                className={`ml-4 self-start mt-4 ${getIconClasses()}`}
              />
            )}
            <textarea
              placeholder={placeholder}
              value={(value as string) || ""}
              onChange={onChange}
              disabled={disabled}
              rows={rows}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={fieldClass}
              {...restProps}
            />
            {success && (
              <Check
                size={20}
                className="mr-4 self-start mt-4 text-green-500"
              />
            )}
          </div>
        );
      }

      case "checkbox": {
        return (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="checkbox"
                checked={(value as boolean) || false}
                onChange={(e) =>
                  onChange?.({
                    ...e,
                    target: {
                      ...e.target,
                      value: e.target.checked,
                    },
                  } as any)
                }
                disabled={disabled}
                className="sr-only"
                {...restProps}
              />

              <div
                className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-all duration-300 flex items-center justify-center ${
                  value
                    ? "bg-blue-600 border-blue-600"
                    : "border-slate-300 hover:border-slate-400"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() =>
                  !disabled &&
                  onChange({
                    target: { value: !(value as boolean) },
                  } as any)
                }
              >
                {value && <Check size={16} className="text-white" />}
              </div>
            </div>
            {Icon && <Icon size={20} className={getIconClasses()} />}
            {label && (
              <span
                className={`text-sm font-medium ${
                  disabled ? "text-slate-400" : "text-slate-300"
                }`}
              >
                {label}
              </span>
            )}
          </div>
        );
      }

      case "select": {
        // local classes + incoming className merged
        const selectClass =
          `w-full px-4 py-2 bg-transparent outline-none text-white appearance-none cursor-pointer pr-10 ${incomingClassName}`.trim();

        return (
          <div className={`${getContainerClasses()} relative`}>
            {Icon && <Icon size={20} className={`ml-4 ${getIconClasses()}`} />}

            <select
              value={(value as string) || ""}
              onChange={onChange}
              disabled={disabled}
              multiple={multiple}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={selectClass}
              {...restProps}
            >
              {placeholder && (
                <option value="" disabled className="bg-primary">
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-primary text-white"
                >
                  {option.label}
                </option>
              ))}
            </select>

            {/* custom chevron -- pointer-events-none so it doesn't block clicks */}
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            {success && <Check size={20} className="mr-4 text-green-500" />}
          </div>
        );
      }

      case "radio": {
        return (
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="radio"
                    name={restProps.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                    {...restProps}
                  />
                  <div
                    className={`w-6 h-6 border-2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                      value === option.value
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-300 hover:border-slate-400"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() =>
                      !disabled &&
                      onChange({ target: { value: option.value } } as any)
                    }
                  >
                    {value === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                {Icon && <Icon size={20} className={getIconClasses()} />}
                <span
                  className={`text-sm font-medium ${
                    disabled ? "text-slate-400" : "text-slate-300"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        );
      }

      case "calendar": {
        const fieldClass =
          `flex-1 px-4 py-2 bg-transparent outline-none text-white placeholder-gray-300 ${incomingClassName}`.trim();
        return (
          <div className={getContainerClasses()}>
            {Icon && <Icon size={20} className={`ml-4 ${getIconClasses()}`} />}
            <input
              type="date"
              value={(value as string) || ""}
              onChange={onChange}
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={fieldClass}
              {...restProps}
            />
          </div>
        );
      }

      default: {
        // input
        const fieldClass =
          `flex-1 px-4 py-2 bg-transparent outline-none text-white placeholder-gray-300 ${incomingClassName}`.trim();
        return (
          <div className={getContainerClasses()}>
            {Icon && <Icon size={20} className={`ml-4 ${getIconClasses()}`} />}
            <input
              type={inputType}
              placeholder={placeholder}
              value={(value as string) || ""}
              onChange={onChange}
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={fieldClass}
              {...restProps}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
            {success && <Check size={20} className="mr-4 text-green-500" />}
          </div>
        );
      }
    }
  };

  return (
    <div className="relative mb-6 w-full">
      {label && field !== "checkbox" && (
        <label className="block mb-2 text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      {renderInput()}

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <X size={16} className="mr-1" />
          {error}
        </p>
      )}
      {success &&
        field !== "input" &&
        field !== "textarea" &&
        field !== "select" && (
          <p className="mt-2 text-sm text-green-600 flex items-center">
            <Check size={16} className="mr-1" />
            {success}
          </p>
        )}
    </div>
  );
};

export { InputField };
