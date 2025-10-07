import { getAcessToken } from "@/lib/actions";

// development
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// productiont
const BASE_URL = process.env.NEXT_PUBLIC_PRODUCTION_API_URL;

async function fetchWithCatch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, options);

    // For 204 No Content
    if (response.status === 204) {
      return { detail: "No Content" };
    }

    // Try to parse response (could be error JSON)
    let data: any = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      // If error, throw data so caller .catch gets it
      throw data || { detail: response.statusText };
    }

    return data;
  } catch (error) {
    // Network/parsing errors
    console.log(error);

    throw error;
  }
}

export const apiService = {
  get: async function (url: string): Promise<any> {
    const token = await getAcessToken();
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
    const token = await getAcessToken();

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

  put: async function (url: string, data: any): Promise<any> {
    const token = await getAcessToken();
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
    const token = await getAcessToken();
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
    const token = await getAcessToken();
    return fetchWithCatch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
