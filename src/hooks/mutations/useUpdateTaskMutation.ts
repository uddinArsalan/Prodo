import { TaskType } from "@/app/types";
import { changeTaskStatus } from "@/lib/client_data/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTaskUpdateMutation() {
  const qc = useQueryClient();
  const queryKey = ["tasks"];
  const updateTaskStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      isCompleted,
    }: {
      taskId: number;
      isCompleted: boolean;
    }) => changeTaskStatus(taskId, isCompleted),
    onMutate: async ({ taskId, isCompleted }) => {
      await qc.cancelQueries({ queryKey });
      const previousTasks = qc.getQueryData(queryKey);

      qc.setQueryData(["tasks"], (old: TaskType[]) =>
        old.map((task: TaskType) =>
          task.id === taskId
            ? { ...task, status: isCompleted ? "completed" : "pending" }
            : task
        )
      );

      return { previousTasks };
    },
    onError: (_, __, context) => {
      qc.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { updateTaskStatusMutation };
}
