import { User } from "@/app/types";
import axios from "axios";

export async function getUserInfo() {
  try {
    const res = await axios.get(`/api/user/`);

    if (res.status !== 200) throw new Error("Error getting user info ");
    return res.data.data as User;
  } catch (error) {
    console.log(error, "Error getting user info ");
    throw error;
  }
}
