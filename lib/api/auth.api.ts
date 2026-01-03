import { apiService } from "../services/apiService";

export const authApi = {
  signIn: async (signinData: any) => {
    const res = await apiService.postWithoutToken("/auth/login/", signinData);
    return res;
  },
  signUp: async (signupData: any) => {
    const res = await apiService.postWithoutToken(
      "/auth/registration/",
      signupData
    );
    return res;
  },
};
