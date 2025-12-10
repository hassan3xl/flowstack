export function extractApiError(error: any): string {
  const data = error?.data || error;

  // Case 1: Direct array
  if (Array.isArray(data)) {
    return data[0];
  }

  // Case 2: DRF field errors { email: ["..."] }
  if (typeof data === "object" && data !== null) {
    const firstKey = Object.keys(data)[0];
    const value = data[firstKey];

    if (Array.isArray(value)) return value[0];
    if (typeof value === "string") return value;
  }

  // Case 3: DRF detail error
  if (data?.detail) return data.detail;

  return "Something went wrong.";
}
