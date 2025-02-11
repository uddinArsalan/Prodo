"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useProject } from "@/hooks/queries/useProject";
import { useParams } from "next/navigation";
import ConfirmationTaskDialog from "@/app/_components/ConfirmationTaskDialog";

export default function ProjectTasksPage() {
  const { projectId } = useParams();
  const { projects } = useProject();

  const project = projects?.find((p) => p.id === Number(projectId));

  if (!project) {
    return (
      <div className="p-6 text-center text-gray-400  justify-center">
        Project not found.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks for {project.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.tasks && project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <Card
              key={task.id}
              className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-700"
            >
              <CardHeader className="flex flex-row justify-between items-start p-4 pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {task.title}
                  </CardTitle>
                  <p className="text-sm text-gray-400 mt-1">
                    {task.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-300">
                      Priority:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === "high"
                          ? " bg-red-800 text-red-100"
                          : task.priority === "medium"
                          ? " bg-yellow-800 text-yellow-100"
                          : " bg-green-800 text-green-100"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-300">
                      Category:
                    </span>
                    <span className="text-sm text-gray-400">
                      {task.category?.name || "Uncategorized"}
                    </span>
                    <ConfirmationTaskDialog taskId={task.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No tasks found for this project.
          </p>
        )}
      </div>
    </div>
  );
}
