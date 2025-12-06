import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useSignin = (signinData: any) => {
  return useMutation({
    mutationFn: async () => authApi.signIn(signinData),
  });
};
