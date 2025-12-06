type FeedCommentType = {
  id: string;
  author: string;
  content: string;
  created_at: string;
};

export type FeedType = {
  id: string;
  author: string;
  server: string;
  server_id: string;
  content: string;
  comment_count: number;
  like_count: number;
  likes: number;
  comments: number;
  created_at: string;
};
