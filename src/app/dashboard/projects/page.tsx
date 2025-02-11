"use client";
import { AddProjectDialog } from "@/app/_components/AddProjectDialog";
import ConfirmationProjectDialog from "@/app/_components/ConfirmationPostDialog";
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
import { Search } from "lucide-react";
import { useProject } from "@/hooks/queries/useProject";
import { useSearchStore } from "@/lib/store/SearchStore";
import { format } from "date-fns";
import Link from "next/link";

export default function ProjectsPage() {
  const { projects, isLoading, error } = useProject();
  const { projectSearchTerm, setProjectSearchTerm, filterProjects } =
    useSearchStore();

  const filteredProjects = filterProjects(projects || [], projectSearchTerm);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <AddProjectDialog />
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search projects..."
          className="max-w-sm"
          value={projectSearchTerm}
          onChange={(e) => setProjectSearchTerm(e.target.value)}
        />
        <Button variant="outline">
          <Search className="size-4" />
        </Button>
      </div>

      {error ? (
        <div className="text-center text-red-500">
          <p>Failed to load projects. Please try again.</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-2">
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
            filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row justify-between items-start p-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-semibold">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {project.description}
                    </CardDescription>

                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Deadline:</span>{" "}
                      {project.deadline ? (
                        format(new Date(project.deadline), "MM/dd/yyyy")
                      ) : (
                        <span className="text-gray-400">No deadline</span>
                      )}
                    </div>
                  </div>
                  <ConfirmationProjectDialog projectId={project.id} />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="outline" className="w-full">
                      View Tasks ({project.tasks?.length ?? 0})
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
