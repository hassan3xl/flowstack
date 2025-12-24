import { UserType } from "./user.types";

type FeedCommentType = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

export type AuthorType = {
  id: string;
  email: string;
  username: string;
  avatar: string;
};
export type PostType = {
  id: string;
  author: AuthorType;
  server: string;
  isPinned: boolean;
  community_name: string;
  community_id: string;
  attachments: string[];
  content: string;
  comment_count: number;
  like_count: number;
  likes: number;
  comments: number;
  created_at: string;
};
