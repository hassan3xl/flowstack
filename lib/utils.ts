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

export function timeAgo(date: string | number | Date): string {
  // 1. Parse the date to ensure we have a valid Date object
  const timestamp = new Date(date).getTime();
  const now = Date.now();

  // 2. Calculate difference in seconds
  const secondsPast = (now - timestamp) / 1000;

  // 3. Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // 4. Handle "Just now" for very recent updates
  if (secondsPast < 30) {
    return "just now";
  }

  // 5. Iterate through intervals to find the correct unit
  for (const [unit, seconds] of Object.entries(intervals)) {
    const intervalCount = Math.floor(secondsPast / seconds);

    if (intervalCount >= 1) {
      // Handle pluralization (e.g., "1 day" vs "2 days")
      const suffix = intervalCount === 1 ? "" : "s";
      return `${intervalCount} ${unit}${suffix} ago`;
    }
  }

  return "just now";
}
