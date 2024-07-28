import { useAuth } from "@/context/auth-contex";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface ISocialMedia {
  id: number;
  platform: ISocialMedaiPlartform;
  accountLink: string;
}

type ISocialMedaiPlartform = "Facebook" | "Twitter" | "Instagram" | "Linkedin";

export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  socialMedia: ISocialMedia[];
}

const fetchUserInfo = async (userId?: number) => {
  if (!userId) {
    throw new Error("User ID bulunamadı.");
  }

  try {
    const response = await axiosInstance.get(`/user/user-details`, {
      params: { id: userId },
    });
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const useGetUserInfo = () => {
  const { user } = useAuth();

  const { data, error, isLoading, isError } = useQuery<UserInfo, Error>({
    queryKey: ["user", user?.id],
    queryFn: () => fetchUserInfo(user?.id ? +user.id : undefined),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, //  1 day
  });

  return {
    userInfo: data,
    error,
    isLoading,
    isError,
  };
};
