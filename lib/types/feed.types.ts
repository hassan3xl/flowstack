import { UserType } from "./user.types";

type FeedCommentType = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

export type FeedType = {
  id: string;
  author: UserType;
  server: string;
  isPinned: boolean;
  server_id: string;
  content: string;
  comment_count: number;
  like_count: number;
  likes: number;
  comments: number;
  created_at: string;
};
