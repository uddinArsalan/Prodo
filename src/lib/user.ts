import { headers } from "next/headers";

export async function getServerSideUser() {
  const headersList = await headers();
  console.log(headersList);
  console.log(headersList.get("x-invoke-path"));
  const userId = headersList.get("x-invoke-path")?.split("?")[1]?.split("=")[1];

  if (!userId) {
    return null;
  }
  return { id: userId };
}
