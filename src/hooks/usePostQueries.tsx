import { useToast } from "@/components/ui/use-toast";
import axiosGraph from "@/lib/axiosGraph";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  author?: {
    fullName: string;
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
