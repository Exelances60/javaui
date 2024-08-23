import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface ICategory {
  id: number;
  name: string;
}

const getAllCategory = async () => {
  try {
    const response = await axiosInstance.get("/category/all");
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useCategory = () => {
  const { toast } = useToast();
  const { data, isLoading, isError } = useQuery<ICategory[], Error>({
    queryKey: ["category"],
    queryFn: getAllCategory,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, //  1 day
  });

  if (isError) {
    toast({
      title: "Hata",
      description: "Kategoriler yüklenirken bir hata oluştu",
      variant: "destructive",
    });
  }

  return {
    categories: data,
    isLoading,
    isError,
  };
};
