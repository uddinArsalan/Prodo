import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTaskDeleteMutation } from "@/hooks/mutations/useTaskDeleteMutation";
import { Trash } from "lucide-react";

export default function ConfirmationTaskDialog({ taskId }: { taskId: number }) {
  const { deleteTaskMutation } = useTaskDeleteMutation({ taskId });
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    await deleteTaskMutation.mutateAsync();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Trash className="size-4 text-red-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            Delete Task
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            onClick={() => setIsOpen(false)}
            variant="outline"
            className="hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteTaskMutation.isPending}
          >
            {deleteTaskMutation.isPending ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
