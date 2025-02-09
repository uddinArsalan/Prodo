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
import { getUserTasks, TaskType } from "@/lib/client_data/tasks";
import { useQuery } from "@tanstack/react-query";
import { Search, Trash } from "lucide-react";
import ConfirmationTaskDialog from "@/app/_components/ConfirmationTaskDialog";
import { useState } from "react";
import { useTaskUpdateMutation } from "@/hooks/mutations/useUpdateTaskMutation";
import { Skeleton } from "@/components/ui/skeleton";

export default function TasksPage() {
  const [taskToDelete, setTaskToDelete] = useState<number>();
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<TaskType[], Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getUserTasks();
      return response;
    },
    staleTime: 5000 * 60,
  });

  const { updateTaskStatusMutation } = useTaskUpdateMutation();
  const handleStatusChange = (taskId: number, isChecked: boolean) => {
    updateTaskStatusMutation.mutate({ taskId, isCompleted: isChecked });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <AddTaskDialog />
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search tasks..." className="max-w-sm" />
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
              tasks.map((task) => (
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTaskToDelete(task.id)}
                      aria-label="Delete task"
                    >
                      <Trash className="size-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {taskToDelete && <ConfirmationTaskDialog taskId={taskToDelete} />}
    </div>
  );
}
