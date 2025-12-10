export type MembersType = {};

export type ServerType = {
  id: string;
  name: string;
  description: string;
  total_projects: number; // dummy will be removed
  created_at: string;
  user_role: "admin" | "member" | "moderator" | "owner";
  members: MembersType[];
};

export interface InvitesType {
  server_name: string;
  invited_by: string;
  invited_at: string;
  created_at: string;
  server_id: string;
  status: string;
  id: string;
  role: string;
}
