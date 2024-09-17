import BlurFade from "@/components/magicui/blur-fade";
import { useAuth } from "@/context/auth-contex";
import { useAllPostsWithPagination } from "@/hooks/usePostQueries";
import ShortPost from "../short-post";

const PostsSettigsTab = () => {
  const { user } = useAuth();
  const { postData, isLoading: PostDataLoading } = useAllPostsWithPagination({
    page: 0,
    size: 10,
    criteria: [
      {
        filterKey: "authorId",
        operation: "EQUALS",
        value: user?.id,
      },
    ],
  });

  if (PostDataLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <BlurFade>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Postlar</h1>
        <p>Bu kısımda postlarınızı düzenleyebilirsiniz.</p>
        <div className="w-full grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-2">
          {postData?.map((post, index) => (
            <ShortPost key={index} post={post} index={index} settigs />
          ))}
        </div>
      </div>
    </BlurFade>
  );
};

export default PostsSettigsTab;
