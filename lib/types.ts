

type Author = {
  fullname: string;
  avatar: string;
  email: string;
};

export interface Comments {
  id: string;
  project_item: string;
  author: Author;
  content: string;
  created_at: string;
  updated_at: string;
}

export type ProjectItem = {
  id: string;
  completed_at?: string;
  started_by: {
    fullname: string;
    avatar: string;
  };
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string | null;
  is_important: boolean;
  created_at: string;
  comments: Comments[];
};

export type SharedUsers = {
  id: string;
  user_id: string;
  fullname: string;
  avatar: string;
  email: string;
  role: string;
};
export type ProjectDetailType = {
  id: string;
  title: string;
  description: string;
  item_count: number;
  visibility: "private" | "public" | "shared";
  owner_email: string;
  created_at: string;
  project_items: ProjectItem[];
  shared_users: SharedUsers[];
};

// ===============================
// Root Dashboard Data Type
// ===============================
export interface DashboardData {
  user: DashboardUser;
  statistics: DashboardStatistics;
  recent_projects: Project[];
  upcoming_tasks: Task[];
  shared_projects: Project[];
  quick_stats: QuickStats;
  settings: UserSettings;
}

// ===============================
// User
// ===============================
export interface DashboardUser {
  id: string;
  email: string;
  first_name: string;
  last_name?: string;
  username?: string;
  avatar?: string;
}

// ===============================
// Statistics
// ===============================
export interface DashboardStatistics {
  total_projects: number;
  visibility_distribution: Record<string, number>; // e.g. { private: 2 }
  items_by_status: Record<string, number>; // e.g. { completed: 2, in_progress: 1 }
  items_by_priority: Record<string, number>; // e.g. { medium: 3 }
}

// ===============================
// Quick Stats
// ===============================
export interface QuickStats {
  total_projects: number;
  total_tasks: number;
  shared_projects_count: number;
  todays_tasks: number;
  in_progress_tasks: number;
  overdue_tasks: number;
  completed_this_week: number;
}

// ===============================
// Project
// ===============================
export interface Project {
  id: string;
  title: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  visibility?: "public" | "private";
  owner?: DashboardUser;
}

// ===============================
// Task (Placeholder)
// ===============================
// Adjust fields once you know the task model
export interface Task {
  id?: string;
  title?: string;
  due_date?: string;
  status?: string;
  priority?: string;
  project_id?: string;
}

// ===============================
// User Settings
// ===============================
export interface UserSettings {
  theme: "light" | "dark";
  language: string;
  items_per_page: number;
  auto_archive_completed: boolean;
  default_due_date_days: number;
  enable_email_notifications: boolean;
  enable_push_notifications: boolean;
}
