"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, List, PieChart } from "lucide-react";
import { useTask } from "@/hooks/queries/useTask";
import Link from "next/link";
import { useMemo } from "react";
import { TaskType } from "../types";
import { StatCard } from "../_components/StatCard";
import { TaskItem } from "../_components/TaskItem";
import { ProjectProgress } from "../_components/ProjectProgress";
import { AddTaskDialog } from "../_components/AddTaskDialog";

export default function DashboardPage() {
  const { tasks } = useTask();

  const getTotalTasks = (tasks: TaskType[] | undefined) => tasks?.length || 0;

  const getCompletedTasks = (tasks: TaskType[] | undefined) =>
    tasks?.filter((task) => task.status === "completed").length || 0;

  const getPendingTasks = (tasks: TaskType[] | undefined) =>
    getTotalTasks(tasks) - getCompletedTasks(tasks);

  const getOverdueTasks = (tasks: TaskType[] | undefined) =>
    tasks?.filter(
      (task) =>
        task.dueDate &&
        task.status === "pending" &&
        new Date(task.dueDate) < new Date()
    ).length || 0;

  const totalTasks = useMemo(() => getTotalTasks(tasks), [tasks]);
  const totalCompletedTasks = useMemo(() => getCompletedTasks(tasks), [tasks]);
  const pendingTasks = useMemo(() => getPendingTasks(tasks), [tasks]);
  const overDueTask = useMemo(() => getOverdueTasks(tasks), [tasks]);

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: List },
    { label: "Completed Tasks", value: totalCompletedTasks, icon: CheckCircle },
    { label: "Pending Tasks", value: pendingTasks, icon: Clock },
    { label: "Overdue Tasks", value: overDueTask, icon: Clock },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <AddTaskDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks Overview</CardTitle>
          <CardDescription>Your recent tasks and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>
            Track the progress of your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ProjectProgress />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Button variant="outline" className="h-24 flex-col gap-2" asChild>
          <Link href="/dashboard">
            <div className="flex flex-col items-center gap-2">
              <Calendar className="size-6" />
              <span>Calendar</span>
            </div>
          </Link>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2" asChild>
          <Link href="/dashboard/tasks">
            <div className="flex flex-col items-center gap-2">
              <List className="size-6" />
              <span>Tasks</span>
            </div>
          </Link>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2" asChild>
          <Link href="/dashboard/projects">
            <div className="flex flex-col items-center gap-2">
              <PieChart className="size-6" />
              <span>Projects</span>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
