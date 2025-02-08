import { AddTaskDialog } from "@/app/_components/AddTaskDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Search, Plus } from "lucide-react";

export default function TasksPage() {
  const tasks = [
    {
      id: 1,
      title: "Design homepage layout",
      project: "Personal Website",
      dueDate: "2023-12-15",
      completed: false,
    },
    {
      id: 2,
      title: "Implement task creation feature",
      project: "Task Manager App",
      dueDate: "2023-12-20",
      completed: true,
    },
    {
      id: 3,
      title: "Add workout tracking functionality",
      project: "Fitness Tracker",
      dueDate: "2023-12-10",
      completed: false,
    },
  ];

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.project}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={task.completed} />
                  <span>{task.completed ? "Completed" : "Pending"}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
