import { AddProjectDialog } from "@/app/_components/AddProjectDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Personal Website",
      description: "Redesign and deploy my personal portfolio website.",
      tasks: 5,
    },
    {
      id: 2,
      name: "Task Manager App",
      description: "Build a task manager app to organize daily tasks.",
      tasks: 8,
    },
    {
      id: 3,
      name: "Fitness Tracker",
      description: "Create a fitness tracker to monitor workouts and progress.",
      tasks: 3,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <AddProjectDialog />
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search projects..." className="max-w-sm" />
        <Button variant="outline">
          <Search className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {project.tasks} tasks
              </p>
              <Button variant="outline" className="mt-4 w-full">
                View Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}