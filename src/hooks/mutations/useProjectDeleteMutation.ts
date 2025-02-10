import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useProjectDeleteMutation({ projectId }: { projectId: number }) {
  const qc = useQueryClient();
  const queryKey1 = ["projects"];
  const queryKey2 = ["tasks"];
  const deleteProjectMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(`/api/projects/${projectId}`, {
          headers: { "Content-Type": "application/json" },
        });
        // if (res.status !== 200) throw new Error(res.statusText);
        return res.data.message;
      } catch (error) {
        console.error("Error deleting project", error);
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKey1 });
      qc.invalidateQueries({ queryKey: queryKey2 });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { deleteProjectMutation };
}
