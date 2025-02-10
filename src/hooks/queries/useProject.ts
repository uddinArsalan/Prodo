import { Project } from "@/app/types";
import { getUserProjects } from "@/lib/client_data/projects";
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
      console.log(response)
      return response;
    },
    staleTime: Infinity,
  });
  return { projects, isLoading, error };
};
