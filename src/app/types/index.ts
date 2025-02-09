export type UserRole = "user" | "admin" | "guest";

export type TaskStatus = "completed" | "pending";

export interface Timeline {
  updated_at: Date | null;
  created_at: Date;
  deleted_at: Date | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  deadline: Date | null;
  tasks : Task[]
}

export interface Task {
  title: string;
  description: string;
  projectId: number;
  dueDate: Date | null;
}
