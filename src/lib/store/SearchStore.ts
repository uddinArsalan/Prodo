import { Project, TaskType } from "@/app/types";
import { create } from "zustand";

interface SearchState {
  taskSearchTerm: string;
  projectSearchTerm: string;
  setTaskSearchTerm: (term: string) => void;
  setProjectSearchTerm: (term: string) => void;
  filterTasks: (tasks: TaskType[], searchTerm: string) => TaskType[];
  filterProjects: (projects: Project[], searchTerm: string) => Project[];
}

export const useSearchStore = create<SearchState>((set) => ({
  taskSearchTerm: "",
  projectSearchTerm: "",
  setTaskSearchTerm: (term) => set({ taskSearchTerm: term }),
  setProjectSearchTerm: (term) => set({ projectSearchTerm: term }),
  filterTasks: (tasks, searchTerm) =>
    tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  filterProjects: (projects, searchTerm) =>
    projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
}));
