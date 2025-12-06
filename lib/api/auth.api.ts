import { apiService } from "../services/apiService";

export const authApi = {
  signIn: async (signInData: any) => {
    try {
      const res = await apiService.postWithoutToken(
        "/auth/signin/",
        signInData
      );
      return res;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },
  signUp: async (signUpData: any) => {
    try {
      const res = await apiService.postWithoutToken(
        "/auth/register/",
        signUpData
      );
      return res;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },
};
