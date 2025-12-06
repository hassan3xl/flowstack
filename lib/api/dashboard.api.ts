import { apiService } from "../services/apiService";

export const dashboardApi = {
  getDashboard: async () => {
    try {
      const res = await apiService.get("/dashboard/");
      return res;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },
};
