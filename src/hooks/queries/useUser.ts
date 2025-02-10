import { User } from "@/app/types";
import { getUserInfo } from "@/lib/client_data/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUserInfo,
    staleTime: 5 * 60 * 1000,
  });
  return { user, isLoading, error };
};
