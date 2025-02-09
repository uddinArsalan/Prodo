import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTaskDeleteMutation } from "@/hooks/mutations/useTaskDeleteMutation";

export default function ConfirmationTaskDialog({ taskId }: { taskId: number }) {
  const {deleteTaskMutation} = useTaskDeleteMutation({
    taskId,
    closeTaskDeleteModal: () => setIsOpen(false),
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    deleteTaskMutation.mutate()
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <p>Are you sure , you want to delete this task</p>
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
