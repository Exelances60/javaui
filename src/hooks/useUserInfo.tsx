import { queryClient } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth-contex";
import axiosInstance from "@/lib/axios";
import { IBaseResponse } from "@/types/base-response";
import { formatErrors } from "@/utils/format-erros";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface ISocialMedia {
  id: number;
  platform: ISocialMedaiPlartform;
  accountLink: string;
}

export type ISocialMedaiPlartform =
  | "Facebook"
  | "Twitter"
  | "Instagram"
  | "Linkedin";

export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  job: string;
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

const deleteSocialMedia = async (id: number) => {
  if (!id) {
    throw new Error("ID bulunamadı.");
  }
  try {
    const response = await axiosInstance.delete(`/social-media/delete/${id}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const useDeleteSocialMedia = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  return useMutation<IBaseResponse<string>, Error, number>({
    mutationFn: deleteSocialMedia,
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: data.message,
        variant: "info",
      });
    },
    onMutate(variables) {
      queryClient.setQueryData(["user", user?.id], (oldData: UserInfo) => {
        return {
          ...oldData,
          socialMedia: oldData.socialMedia.filter((x) => x.id !== variables),
        };
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: formatErrors(error),
        variant: "destructive",
      });
    },
  });
};
