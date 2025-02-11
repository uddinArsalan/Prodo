"use client";
import { AddTaskDialog } from "@/app/_components/AddTaskDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import ConfirmationTaskDialog from "@/app/_components/ConfirmationTaskDialog";
import { useTaskUpdateMutation } from "@/hooks/mutations/useUpdateTaskMutation";
import { Skeleton } from "@/components/ui/skeleton";
import { useTask } from "@/hooks/queries/useTask";
import { useSearchStore } from "@/lib/store/SearchStore";

export default function TasksPage() {
  const { tasks, isLoading, error } = useTask();
  const { updateTaskStatusMutation } = useTaskUpdateMutation();
  const { filterTasks, setTaskSearchTerm, taskSearchTerm } = useSearchStore();
  const handleStatusChange = (taskId: number, isChecked: boolean) => {
    updateTaskStatusMutation.mutate({ taskId, isCompleted: isChecked });
  };
  const filteredTasks = filterTasks(tasks || [], taskSearchTerm);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <AddTaskDialog />
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search tasks..."
          className="max-w-sm"
          value={taskSearchTerm}
          onChange={(e) => setTaskSearchTerm(e.target.value)}
        />
        <Button variant="outline">
          <Search className="size-4" />
        </Button>
      </div>

      {error ? (
        <div className="text-center text-red-500">
          <p>Failed to load tasks. Please try again.</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : !tasks || tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No tasks found. Start by adding a new task!
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.project.title}</TableCell>
                  <TableCell>
                    {format(new Date(task.dueDate!), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={(checked) =>
                          handleStatusChange(task.id, checked as boolean)
                        }
                      />
                      <span>{task.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ConfirmationTaskDialog taskId={task.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
