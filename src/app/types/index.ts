export type UserRole = "user" | "admin" | "guest";

export type TaskStatus = "completed" | "pending";

export type TaskPriority = "low" | "medium" | "high";

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
  tasks: TaskType[];
}

export type TaskType = Task & {
  id: number;
  status: TaskStatus;
  project: Project;
  category: Category;
};

export interface Category {
  id: number;
  name: string;
}

export interface Task {
  title: string;
  description: string;
  projectId: number;
  dueDate: Date | null;
  priority: TaskPriority;
  categoryId: number | null;
}
