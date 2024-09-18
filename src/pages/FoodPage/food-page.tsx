import { LoadingSpinner } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAllPostsWithPagination } from "@/hooks/usePostQueries";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import dummyfood from "@/assets/home/dumyımage.jpg";

const FoodPage = () => {
  const { postData, isLoading, error } = useAllPostsWithPagination({
    page: 0,
    size: 30,
    criteria: [
      {
        filterKey: "categoryId",
        operation: "EQUALS",
        value: 1,
      },
    ],
  });

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Food Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {postData?.map((post) => (
          <Card
            key={post.id}
            className="flex flex-col overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative pt-[56.25%]">
              <img
                src={post.image}
                alt={post.title}
                onError={(e) => {
                  e.currentTarget.src = dummyfood;
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardContent className="flex-grow p-3">
              <h2 className="text-lg font-semibold mb-1 line-clamp-1">
                {post.title}
              </h2>
              <p
                className="text-xs text-muted-foreground line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content).slice(0, 80) + "...",
                }}
              />
            </CardContent>
            <CardFooter className="p-3 flex justify-between items-center bg-muted">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <Button variant="ghost" size="sm" className="text-xs">
                Read more
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
