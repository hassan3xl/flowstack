import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (signinData: any) => authApi.signIn(signinData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Signed in successfully!");
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (signupData: any) => authApi.signUp(signupData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Signed up successfully!");
    },
  });
};
