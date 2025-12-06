import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { q } from "framer-motion/client";
import { dashboardApi } from "../api/dashboard.api";

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardApi.getDashboard(),
  });
};
