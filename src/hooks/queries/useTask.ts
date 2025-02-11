import { getUserTasks } from "@/lib/client_data/tasks";
import { useQuery } from "@tanstack/react-query";
import { TaskType } from "@/app/types";

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
