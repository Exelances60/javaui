import { queryClient } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth-contex";
import axiosInstance from "@/lib/axios";
import { IBaseResponse } from "@/types/base-response";
import { formatErrors } from "@/utils/format-erros";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  image?: string;
  backgroundImage?: string;
  id: number;
  fullName: string;
  email: string;
  phone: string;
  job: string;
  socialMedia: ISocialMedia[];
  summary?: string;
  address?: string;
  isFollowed: boolean;
  followerCount: number;
  followingCount: number;
  postCount: number;
  createdAt: Date;
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
    throw error.response.data;
  }
};

export const useGetUserInfo = (id?: number) => {
  const { data, error, isLoading, isError } = useQuery<UserInfo, Error>({
    queryKey: ["user", id],
    queryFn: () => fetchUserInfo(id),
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
    throw error.response.data;
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

type UpdateUserInfoData = {
  email: string;
  fullName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  job?: string;
  phone?: string;
  summary?: string;
  address?: string;
};

const updateUserInfo = async (data: UpdateUserInfoData, userId: number) => {
  try {
    const response = await axiosInstance.putForm(
      "/user/update-user",
      {
        ...data,
        phone: data.phone || null,
        image: data.image || null,
        job: data.job || null,
      },
      {
        params: {
          id: userId,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useUpdateUserInfo = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation<IBaseResponse<UserInfo>, Error, UpdateUserInfoData>({
    mutationFn: (data) => {
      const userId = user?.id;
      if (!userId) {
        throw new Error("Kullanıcı ID'si bulunamadı.");
      }
      return updateUserInfo(data, +userId);
    },
    onSuccess: (data) => {
      toast({
        title: "Başarılı",
        description: data.message,
        variant: "success",
      });
    },
    onSettled(data, error) {
      if (!error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        queryClient.setQueryData(["user", user?.id], (_oldData: UserInfo) => {
          return data?.data;
        });
      }
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

const followUser = async (userId?: number) => {
  try {
    const response = await axiosInstance.post(`/user/follow/${userId}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useFollowUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation<IBaseResponse<UserInfo>, Error, number>({
    mutationFn: followUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.data.id], (oldData: UserInfo) => {
        return {
          ...oldData,
          isFollowed: data.data.isFollowed,
          followerCount: data.data.followerCount,
          followingCount: data.data.followingCount,
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
