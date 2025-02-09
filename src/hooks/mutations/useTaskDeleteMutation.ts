import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useTaskDeleteMutation({
  taskId,
  closeTaskDeleteModal,
}: {
  taskId: number;
  closeTaskDeleteModal: () => void;
}) {
  const qc = useQueryClient();
  const queryKey = ["tasks"];
  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(`/api/tasks${taskId}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.status !== 200) throw new Error(res.statusText);
        return res.data.message;
      } catch (error) {
        console.error("Error deleting task", error);
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey });
      closeTaskDeleteModal();
    },
    onError: (error) => {
      console.log(error);
      closeTaskDeleteModal();
    },
  });
  return { deleteTaskMutation };
}
