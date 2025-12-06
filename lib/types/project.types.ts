type CommentsType = {
  id: string;
  comment: string;
  author: string;
  created_at: string;
  created_by: string;
};

type ProjectItemType = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  priority: string;
  item_count: number;
  completed_count: number;
  created_at: string;
  completed_at: string;
  created_by: string;
  assigned_to: string;
  started_by?: string;
  due_date: string;
  comments: CommentsType[];
  status: string;
};

interface SharedUsersType {
  id: string;
  user_id: string;
  avatar: string;
  fullname: string;
}
export type ProjectType = {
  id: string;
  title: string;
  priority: string;
  description: string;
  project_items: ProjectItemType[];
  status: "planning" | "active" | "on_hold" | "completed" | "archived";
  item_count: any;
  visibility: string;
  created_at: string;
  created_by: string;
  completed_count: number;
  shared_users: SharedUsersType[];
};
