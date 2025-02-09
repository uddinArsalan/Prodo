import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProjectDeleteMutation } from "@/hooks/mutations/useProjectDeleteMutation";

export default function ConfirmationProjectDialog({
  projectId,
}: {
  projectId: number;
}) {
  const { deleteProjectMutation } = useProjectDeleteMutation({
    projectId,
    closeProjectDeleteModal: () => setIsOpen(false),
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    deleteProjectMutation.mutate();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <p>Are you sure , you want to delete this project and all its tasks</p>
      </DialogContent>
      <DialogFooter>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button onClick={handleConfirm} variant="destructive">
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
