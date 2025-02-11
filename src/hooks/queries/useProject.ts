import { Category, Project } from "@/app/types";
import { getCategories, getUserProjects } from "@/lib/client_data/projects";
import { useQuery } from "@tanstack/react-query";

export const useProject = () => {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await getUserProjects();
      return response;
    },
    staleTime: Infinity,
  });
  
  const { data: categories } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories();
      return response;
    },
    staleTime: Infinity,
  });
  return { projects, categories, isLoading, error };
};
