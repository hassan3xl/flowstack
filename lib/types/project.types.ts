import { UserType } from "./user.types";

type ProjectMembersType = {
  id: string;
  permission: "read" | "write";
  user: UserType;
};

export type CommentsType = {
  id: string;
  content: string;
  author: UserType;
  created_at: string;
  created_by: string;
};

export type TaskType = {
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

export type ProjectType = {
  id: string;
  title: string;
  priority: string;
  description: string;
  tasks: TaskType[];
  status: "planning" | "active" | "on_hold" | "completed" | "archived";
  item_count: any;
  visibility: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  completed_count: number;
  members: ProjectMembersType[];
  collaborators: ProjectMembersType[];
};
