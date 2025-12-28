// utils/permissions.ts

// Define the shape of the permission object coming from your API
interface ProjectUserPermission {
  joined_at: string;
  permission: "read" | "write";
}

/**
 * Checks if a user can perform an action based on their Workspace Role
 * AND their specific Project Permission.
 */
export const canPerformProjectAction = (
  workspaceRole: string | undefined,
  projectPermission: ProjectUserPermission | null,
  requiredAction: "read" | "write"
): boolean => {
  // 1. SUPER USER CHECK (Workspace Level)
  // If they are Admin or Owner of the workspace, they can do EVERYTHING.
  // We return true immediately, regardless of what projectPermission says (even if null).
  if (workspaceRole === "owner" || workspaceRole === "admin") {
    return true;
  }

  // 2. NO ACCESS CHECK
  // If they are not an admin, and have no project permission object,
  // they strictly have no access.
  if (!projectPermission) {
    return false;
  }

  // 3. WRITE CHECK
  // If the action requires 'write', the user MUST have 'write' permission.
  if (requiredAction === "write") {
    return projectPermission.permission === "write";
  }

  // 4. READ CHECK
  // If we reached here, the action is 'read'.
  // Since the user has a permission object (checked in step 2), they can read.
  return true;
};
