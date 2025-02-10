import { getUserTasks, TaskType } from "@/lib/client_data/tasks";
import { useQuery } from "@tanstack/react-query";

export const useTask = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<TaskType[], Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getUserTasks();
      return response;
    },
    staleTime: Infinity,
  });

  return { tasks, isLoading, error };
};
