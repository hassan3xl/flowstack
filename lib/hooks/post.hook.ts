import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../api/post.api";
import { toast } from "sonner";

export function useGetHomePosts() {
  return useQuery({
    queryKey: ["home-posts"],
    queryFn: () => postApi.getHomePosts(),
  });
}

export function useGetCommunityPosts(communityId: string) {
  return useQuery({
    queryKey: ["community-posts"],
    queryFn: () => postApi.getCommunityPosts(communityId),
  });
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      feedData,
      communityId,
    }: {
      feedData: { content: string };
      communityId: string;
    }) => postApi.createPost(communityId, feedData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home-posts"] });
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });

      toast.success("Feed created successfully!");
    },
  });
};
