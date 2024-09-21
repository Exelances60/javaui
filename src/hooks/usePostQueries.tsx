import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth-contex";
import axiosInstance from "@/lib/axios";
import axiosGraph from "@/lib/axiosGraph";
import { IBaseResponse } from "@/types/base-response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";

export interface ICreatePost {
  title: string;
  content: string;
  image: string;
  categoryId: number;
}

interface GraphqlError {
  message: string;
  extensions: {
    classification: string;
  };
  path: string[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  likes?: number;
  liked: boolean;
  createdAt: string;
  author?: {
    id: number;
    fullName: string;
    job?: string;
    image: string;
  };
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input)
  }
`;

const createPost = async (data: ICreatePost) => {
  const response = await axiosGraph.post("/graphql", {
    query: CREATE_POST_MUTATION,
    variables: {
      input: data,
    },
  });
  if (response.data.errors) {
    throw response.data.errors;
  }
  return response.data.data.createPost;
};

export const useCreatePost = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation<string, GraphqlError[], ICreatePost>({
    mutationFn: (data) => createPost(data),
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.map((e) => e.message).join(" "),
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Post başarıyla oluşturuldu.",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["home-posts"],
      });
    },
  });
};

const GET_POSTS_QUERY = gql`
  query GetAllPosts {
    getAllPosts {
      message
      data {
        id
        title
        content
        image
        author {
          fullName
          image
        }
      }
    }
  }
`;

const getPosts = async () => {
  const response = await axiosGraph.post("/graphql", {
    query: GET_POSTS_QUERY,
  });
  if (response.data.errors) {
    throw response.data.errors;
  }
  return response.data.data.getAllPosts.data;
};

export const usePostQueries = () => {
  const { data, error, isLoading, refetch } = useQuery<Post[], GraphqlError[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    gcTime: 1000 * 60 * 30,
  });
  return { postData: data, error, isLoading, refetch };
};

interface IHomePosts {
  postProgram: Post[];
  postDiets: Post[];
  postFood: Post[];
  postScience: Post[];
  postSuggestions: Post[];
}

const getHomePosts = async () => {
  try {
    const response = await axiosInstance.get("/post/home-posts");
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useHomePostQueries = () => {
  const { data, error, isLoading, refetch } = useQuery<IHomePosts, Error>({
    queryKey: ["home-posts"],
    queryFn: getHomePosts,
    refetchOnWindowFocus: false,
  });
  return { postData: data, error, isLoading, refetch };
};

const getPost = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/post/${id}`);
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const usePostById = (id: number) => {
  const { data, error, isLoading, refetch, isError } = useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    gcTime: 1000 * 60 * 30, // 30 dakika
    staleTime: 1000 * 60 * 30, // 30 dakika
    refetchOnWindowFocus: false,
  });
  return { postData: data, error, isLoading, refetch, isError };
};

const likePost = async (postId: number) => {
  try {
    const response = await axiosInstance.post(`/post/like/${postId}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useLikePost = (id: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation<IBaseResponse<string>, Error, number>({
    mutationFn: likePost,
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["post", id], () => {
        return data.data;
      });
    },
  });
};

export interface ICriteria {
  filterKey: string;
  operation: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

const getAllPostsWithPagination = async (criteria: {
  page: number;
  size: number;
  criteria: ICriteria[];
}) => {
  try {
    const response = await axiosInstance.post("/post/all-posts", criteria);
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useAllPostsWithPagination = (criteria: {
  page: number;
  size: number;
  criteria: ICriteria[];
}) => {
  const { data, error, isLoading, refetch } = useQuery<Post[], Error>({
    queryKey: ["all-posts", criteria.criteria.map((c) => c.value).join("")],
    queryFn: () => getAllPostsWithPagination(criteria),
    refetchOnWindowFocus: false,
  });
  return { postData: data, error, isLoading, refetch };
};

const deletePost = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/post/${id}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useDeletePost = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  if (!user) {
    throw new Error("Kullanıcı bilgileri bulunamiyor.");
  }
  return useMutation<IBaseResponse<string>, Error, number>({
    mutationFn: deletePost,
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data, postId) => {
      queryClient.setQueryData(
        ["all-posts", user.id.toString()],
        (oldData: Post[] | undefined) => {
          console.log(oldData);
          return oldData?.filter((post) => post.id !== postId);
        }
      );
      toast({
        title: "Başarılı",
        description: data.message,
        variant: "success",
      });
    },
  });
};
