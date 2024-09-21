import Post from "@/components/custom/Post";
import { LoadingSpinner } from "@/components/loading";
import { useAllPostsWithPagination } from "@/hooks/usePostQueries";

const FoodPage = () => {
  const { postData, isLoading, error } = useAllPostsWithPagination({
    page: 0,
    size: 30,
    criteria: [
      {
        filterKey: "categoryId",
        operation: "EQUALS",
        value: 3,
      },
    ],
  });

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  if (error) {
    return <div>Bir hata oluştu</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Food Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {postData?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
