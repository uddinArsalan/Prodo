"use client";
import { AddProjectDialog } from "@/app/_components/AddProjectDialog";
import ConfirmationProjectDialog from "@/app/_components/ConfirmationPostDialog";
import { Project } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProjects } from "@/lib/client_data/projects";
import { useQuery } from "@tanstack/react-query";
import { Search, Trash } from "lucide-react";
import { useState } from "react";

export default function ProjectsPage() {
  const [projectToDelete, setProjectToDelete] = useState<number>();
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await getUserProjects();
      return response;
    },
    staleTime: Infinity,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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

      {error ? (
        <div className="text-center text-red-500">
          <p>Failed to load projects. Please try again.</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))
          ) : !projects || projects.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No projects found. Start by adding a new project!
            </p>
          ) : (
            projects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setProjectToDelete(project.id)}
                  >
                    <Trash className="size-5 text-red-500" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {project.tasks.length} tasks
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {projectToDelete && (
        <ConfirmationProjectDialog projectId={projectToDelete} />
      )}
    </div>
  );
}
