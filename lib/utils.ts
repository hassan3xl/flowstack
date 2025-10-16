import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  isoString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  return new Intl.DateTimeFormat(
    "en-US",
    options ?? {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  ).format(date);
}

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getVisibilityBadge = (visibility: string) => {
  const colors = {
    private: "bg-red-100 text-red-800",
    public: "bg-green-100 text-green-800",
    shared: "bg-blue-100 text-blue-800",
  };
  return (
    colors[visibility as keyof typeof colors] || "bg-gray-100 text-gray-800"
  );
};
