"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Check, X, AlertTriangle, Info, XCircle } from "lucide-react";

// Toast Types
export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  success: (message: string, options?: Partial<Toast>) => void;
  error: (message: string, options?: Partial<Toast>) => void;
  warning: (message: string, options?: Partial<Toast>) => void;
  info: (message: string, options?: Partial<Toast>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = {
        id,
        duration: 5000,
        ...toast,
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove toast if not persistent
      if (!newToast.persistent && newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, options?: Partial<Toast>) => {
      addToast({ type: "success", message, ...options });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, options?: Partial<Toast>) => {
      addToast({ type: "error", message, ...options });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, options?: Partial<Toast>) => {
      addToast({ type: "warning", message, ...options });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, options?: Partial<Toast>) => {
      addToast({ type: "info", message, ...options });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom Hook
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Component
const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { removeToast } = useToast();

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <Check size={20} className="text-green-500" />;
      case "error":
        return <XCircle size={20} className="text-red-500" />;
      case "warning":
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case "info":
        return <Info size={20} className="text-blue-500" />;
      default:
        return <Info size={20} className="text-gray-500" />;
    }
  };

  const getStyles = () => {
    const baseStyles =
      "border-l-4 bg-white shadow-lg rounded-lg p-4 mb-3 max-w-sm w-full transform transition-all duration-300 ease-in-out";

    switch (toast.type) {
      case "success":
        return `${baseStyles} border-green-500`;
      case "error":
        return `${baseStyles} border-red-500`;
      case "warning":
        return `${baseStyles} border-yellow-500`;
      case "info":
        return `${baseStyles} border-blue-500`;
      default:
        return `${baseStyles} border-gray-500`;
    }
  };

  return (
    <div className={getStyles()}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {toast.title}
            </h4>
          )}
          <p className="text-sm text-gray-700 break-words">{toast.message}</p>
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Toast Container
const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

// Backend Error Handler Utility
export interface BackendError {
  message?: string;
  error?: string;
  errors?: Record<string, string[]> | string[];
  details?: string;
  statusCode?: number;
}

export const handleBackendError = (error: any, toast: ToastContextType) => {
  if (error?.response?.data) {
    const errorData: BackendError & { detail?: string } = error.response.data;

    // Handle validation errors (field: ["msg"])
    if (
      errorData.errors &&
      typeof errorData.errors === "object" &&
      !Array.isArray(errorData.errors)
    ) {
      const fieldErrors = Object.entries(errorData.errors)
        .map(
          ([field, messages]) =>
            `${field}: ${
              Array.isArray(messages) ? messages.join(", ") : messages
            }`
        )
        .join("\n");

      toast.error(fieldErrors, {
        title: "Validation Error",
        duration: 8000,
      });
      return;
    }

    // Handle array of errors
    if (Array.isArray(errorData.errors)) {
      toast.error(errorData.errors.join("\n"), {
        title: "Validation Error",
        duration: 8000,
      });
      return;
    }

    // ✅ Handle DRF's "detail"
    if (errorData.detail) {
      toast.error(errorData.detail, {
        title: `Error ${error.response.status}`,
        duration: 6000,
      });
      return;
    }

    // Handle generic message/error
    const message =
      errorData.message ||
      errorData.error ||
      errorData.details ||
      "An error occurred";

    toast.error(message, {
      title: `Error ${errorData.statusCode || error.response.status || ""}`,
      duration: 6000,
    });
  } else if (error?.message) {
    toast.error(error.message, {
      title: "Network Error",
      duration: 6000,
    });
  } else {
    toast.error("An unexpected error occurred. Please try again.", {
      duration: 6000,
    });
  }
};
