import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { feedApi } from "../api/feed.api";
import { toast } from "sonner";

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

export const useCreateFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      feedData,
      serverId,
    }: {
      feedData: { content: string };
      serverId: string;
    }) => feedApi.createFeed(serverId, feedData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      toast.success("Feed created successfully!");
    },
  });
};

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
