import { apiService } from "../services/apiService";

export const serverApi = {
  createServer: async (serverData: any) => {
    try {
      const res = await apiService.post("/servers/", serverData);
      return res;
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  getServers: async () => {
    try {
      const res = await apiService.get("/servers/");
      return res;
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  getPublicServers: async () => {
    try {
      const res = await apiService.get("/servers/public_servers/");
      return res;
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  getServerInvites: async () => {
    try {
      const res = await apiService.get("/servers/invites/received/");
      return res;
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching server invites:", error);
      throw error;
    }
  },

  acceptServerInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(`/servers/invites/${inviteId}/accept/`);
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },

  rejectServerInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(`/servers/invites/${inviteId}/reject/`);
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },

  getServer: async (serverId: string) => {
    try {
      const res = await apiService.get(`/servers/${serverId}/`);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  UpdateStoreStatus: async () => {
    try {
      const res = await apiService.post("/store/toggle-status/");
      console.log("store details", res);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  UpdateStoreLogo: async (formData: FormData) => {
    const res = await apiService.post("/store/upload-logo/", formData);
    return res;
  },

  getProductsCategory: async () => {
    try {
      const res = await apiService.get("/categories/");
      console.log("categories", res);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  AddProduct: async (data: any) => {
    try {
      const res = await apiService.post("/products/", data);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  AddProductFeature: async (data: any) => {
    try {
      const res = await apiService.post("/products/", data);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  EditProduct: async (productId: string | number, data: FormData | any) => {
    const res = await apiService.patch(`/products/${productId}/`, data);
    return res.data;
  },

  DeleteProduct: async (productId: string) => {
    try {
      const res = await apiService.delete(`/products/${productId}/`);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};

export const specificationApi = {
  // GET product specifications
  getSpecifications: async (productId: string) => {
    const res = await apiService.get(`/products/${productId}/specifications/`);
    return res;
  },

  // add specs
  addSpecifications: async (productId: string, data: any) => {
    const res = await apiService.post(
      `/products/${productId}/specifications/`,
      data
    );
    return res;
  },

  // UPDATE product specifications
  updateSpecifications: async (productId: string, data: any) => {
    const res = await apiService.patch(
      `/products/${productId}/specifications/`,
      data
    );
    return res;
  },
};
