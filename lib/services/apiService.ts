import { toast } from "sonner";
import { getAccessToken } from "../actions/auth.actions";
import { extractApiError } from "../utils/api-error";

// development
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithCatch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (response.status === 204) {
      return { detail: "No Content" };
    }

    let data: any = null;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (response.status === 401) {
      window.location.href = "/auth/signin/";
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
    toast.error(message);
    throw error;
  }
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

  post: async function (url: string, data?: any): Promise<any> {
    const token = await getAccessToken();

    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Only add body if data is provided
    if (data !== undefined) {
      options.body = JSON.stringify(data);
    }

    return fetchWithCatch(url, options);
  },

  postFormData: async function (url: string, formData: FormData): Promise<any> {
    const token = await getAccessToken();

    return fetchWithCatch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  },

  put: async function (url: string, data: any): Promise<any> {
    const token = await getAccessToken();
    return fetchWithCatch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },
  patch: async function (url: string, data: any): Promise<any> {
    const token = await getAccessToken();
    return fetchWithCatch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
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
