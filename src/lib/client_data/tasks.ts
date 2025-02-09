import { Project, Task, TaskStatus } from "@/app/types";
import axios from "axios";

export type TaskType = Task & {
  id: number;
  status: TaskStatus;
  project: Project;
};

export async function getUserTasks() {
  try {
    const res = await axios.get(`/api/tasks/`);

    if (res.status !== 200) throw new Error("Failed to load tasks.");
    return res.data.data as TaskType[];
  } catch (error) {
    console.log(error, "Error loading tasks.");
    throw error;
  }
}

export async function changeTaskStatus(taskId: number, isCompleted: boolean) {
  try {
    const res = await axios.patch(`/api/tasks/${taskId}`, { isCompleted });

    if (res.status !== 200) throw new Error("Failed to update task status.");
    return res.data.message;
  } catch (error) {
    console.log(error, "Error updating task status.");
    throw error;
  }
}
