import { Task } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateTaskMutation() {
  const qc = useQueryClient();
  const queryKey = ["tasks"];
  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Task) => {
      try {
        const res = await axios.post("/api/tasks", newTask, {
          headers: { "Content-Type": "application/json" },
        });
        return res.data.data as Task;
      } catch (error) {
        console.error("Error creating task", error);
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { createTaskMutation };
}
