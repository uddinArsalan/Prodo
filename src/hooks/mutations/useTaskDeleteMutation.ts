import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useTaskDeleteMutation({ taskId }: { taskId: number }) {
  const qc = useQueryClient();
  const queryKey1 = ["tasks"];
  const queryKey2 = ["projects"];
  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(`/api/tasks/${taskId}`, {
          headers: { "Content-Type": "application/json" },
        });
        // if (res.status !== 200) throw new Error(res.statusText);
        return res.data.message;
      } catch (error) {
        console.error("Error deleting task", error);
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey : queryKey1 });
      qc.invalidateQueries({ queryKey : queryKey2 });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { deleteTaskMutation };
}
