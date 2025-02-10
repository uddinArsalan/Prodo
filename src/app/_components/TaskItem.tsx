import { CheckCircle } from "lucide-react";
import { TaskType } from "../types";

export const TaskItem = ({ task }: { task: TaskType }) => {
  return(
    <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center gap-4">
      <CheckCircle className="size-4 text-white" />
      <span>{task.title}</span>
    </div>
    <span className="text-sm text-white capitalize">
      {task.status}
    </span>
  </div>
  )
  
};
