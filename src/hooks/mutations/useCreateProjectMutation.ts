import { Project } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateProjectMutation({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const qc = useQueryClient();
  const queryKey = ["projects"];
  const createProjectMutation = useMutation({
    mutationFn: async ( newProject : Partial<Project> ) => {
      try {
        const res = await axios.post("/api/projects", newProject, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.status !== 200) throw new Error(res.statusText);
        return res.data.data as Project;
      } catch (error) {
        console.error("Error creating", error);
        throw error;
      }
    },
    onSuccess: (createdProject) => {
      qc.invalidateQueries({ queryKey });
      closeModal();
    },
    onError: (error) => {
      console.log(error);
      closeModal();
    },
  });
  return { createProjectMutation };
}
