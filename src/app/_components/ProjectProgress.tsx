import { Progress } from "@/components/ui/progress";
import { useProject } from "@/hooks/queries/useProject";
import { TaskType } from "../types";

export const ProjectProgress = () => {
  const getProgressPercentage = (tasks : TaskType[]) =>
    tasks?.length
      ? (tasks.filter((task) => task.status === "completed").length /
          tasks.length) *
        100
      : 0;
      
  const { projects } = useProject();
  return (
    <>
      {projects?.map((project) => (
        <div key={project.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{project.title}</span>
            <span className="text-sm text-muted-foreground">
              {getProgressPercentage(project.tasks)}%
            </span>
          </div>
          <Progress
            value={getProgressPercentage(project.tasks)}
            className="h-2"
          />
        </div>
      ))}
    </>
  );
};
