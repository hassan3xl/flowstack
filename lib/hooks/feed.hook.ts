import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { feedApi } from "../api/feed.api";

export function useGetFeed() {
  return useQuery({
    queryKey: ["feeds"],
    queryFn: () => feedApi.getFeeds(),
  });
}

export function useGetServerFeeds(serverId: string) {
  return useQuery({
    queryKey: ["feeds"],
    queryFn: () => feedApi.getServerFeeds(serverId),
  });
}

// export function useGetPublicfeeds() {
//   return useQuery({
//     queryKey: ["public-feeds"],
//     queryFn: () => feedApi.getPublicServers(),
//   });
// }

// // GET A SINGLE SERVER
// export function useGetServer(serverId: string) {
//   return useQuery({
//     queryKey: ["server", serverId],
//     queryFn: () => feedApi.getServer(serverId),
//     enabled: !!serverId,
//   });
// }

// export const useCreateServer = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (serverData) => feedApi.createServer(serverData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["servers"] });
//     },
//   });
// };
