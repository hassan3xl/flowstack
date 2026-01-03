import { toast } from "sonner";
import {
  getAccessToken,
  getRefreshToken,
  refreshToken,
} from "../actions/auth.actions";
import { extractApiError } from "../utils/api-error";

// development
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function fetchWithCatch(
  url: string,
  options: RequestInit = {},
  isRetry: boolean = false
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    // 401 Handling
    if (response.status === 401 && !isRetry) {
      // A. Call the server action and get the STRING back
      const newToken = await refreshToken();

      // B. If we got a token, retry immediately
      if (newToken) {
        const newHeaders = new Headers(options.headers);
        newHeaders.set("Authorization", `Bearer ${newToken}`);

        return fetchWithCatch(url, { ...options, headers: newHeaders }, true);
      }

      // If newToken is null, we let it fall through to the error throw below
    }

    // --- Standard Response Handling ---
    if (response.status === 204) {
      return { detail: "No Content" };
    }

    let data: any = null;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      throw {
        status: response.status,
        data: data || { detail: response.statusText },
      };
    }

    return data;
  } catch (error: any) {
    const message = extractApiError(error);
    // Only toast if it's not a 401 that we failed to retry (avoids spamming "Unauthorized")
    if (error?.status !== 401) {
      toast.error(message);
    }
    throw error;
  }
}

// Helper to construct headers and body dynamically
async function createRequestOptions(method: string, data?: any) {
  const token = await getAccessToken();

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let body: BodyInit | undefined;

  // Check if data is FormData (for images/files)
  if (data instanceof FormData) {
    // DO NOT set Content-Type header for FormData.
    // The browser automatically sets it to "multipart/form-data" with the correct boundary.
    body = data;
  } else if (data) {
    // For standard objects, use JSON
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }

  return {
    method,
    credentials: "include" as RequestCredentials,
    headers,
    body,
  };
}

export const apiService = {
  get: async function (url: string): Promise<any> {
    const token = await getAccessToken();
    return fetchWithCatch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    return fetchWithCatch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  // Now handles both JSON and FormData automatically
  post: async function (url: string, data?: any): Promise<any> {
    const options = await createRequestOptions("POST", data);
    return fetchWithCatch(url, options);
  },

  // Now handles both JSON and FormData automatically
  put: async function (url: string, data: any): Promise<any> {
    const options = await createRequestOptions("PUT", data);
    return fetchWithCatch(url, options);
  },

  // Now handles both JSON and FormData automatically
  patch: async function (url: string, data: any): Promise<any> {
    const options = await createRequestOptions("PATCH", data);
    return fetchWithCatch(url, options);
  },

  delete: async function (url: string): Promise<any> {
    const token = await getAccessToken();
    return fetchWithCatch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
