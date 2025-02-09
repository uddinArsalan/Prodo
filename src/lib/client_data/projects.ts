import { Project } from "@/app/types";
import axios from "axios";

export async function getUserProjects() {
  try {
    const res = await axios.get(`/api/projects/`);

    if (res.status !== 200) throw new Error("Failed to load projects.");
    return res.data.data as Project[];
  } catch (error) {
    console.log(error, "Error loading projects.");
    throw error;
  }
}
