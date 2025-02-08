import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock, List, PieChart, Plus, Settings } from "lucide-react";

export default function DashboardPage() {
  const tasks = [
    { id: 1, title: "Design homepage layout", status: "completed" },
    { id: 2, title: "Implement task creation feature", status: "in-progress" },
    { id: 3, title: "Add workout tracking functionality", status: "pending" },
  ];

  const stats = [
    { label: "Total Tasks", value: "24", icon: List },
    { label: "Completed Tasks", value: "12", icon: CheckCircle },
    { label: "Pending Tasks", value: "8", icon: Clock },
    { label: "Overdue Tasks", value: "4", icon: Clock },
  ];

  const projects = [
    { id: 1, name: "Personal Website", progress: 75 },
    { id: 2, name: "Task Manager App", progress: 50 },
    { id: 3, name: "Fitness Tracker", progress: 25 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 size-4" />
            Settings
          </Button>
          <Button>
            <Plus className="mr-2 size-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tasks Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks Overview</CardTitle>
          <CardDescription>Your recent tasks and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CheckCircle className="size-4 text-muted-foreground" />
                  <span>{task.title}</span>
                </div>
                <span className="text-sm text-muted-foreground capitalize">{task.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Track the progress of your projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Calendar className="size-6" />
          <span>Calendar</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <List className="size-6" />
          <span>Tasks</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <PieChart className="size-6" />
          <span>Analytics</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Settings className="size-6" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
}