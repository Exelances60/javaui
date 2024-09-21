import { Post, useDeletePost } from "@/hooks/usePostQueries";
import { CalendarIcon, HeartIcon, MessageCircleIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

interface ShortPostProps {
  post: Post;
  index: number;
  settigs?: boolean;
}

const ShortPost = ({ post, index, settigs }: ShortPostProps) => {
  const { mutate: deletePost, isPending } = useDeletePost();
  return (
    <div
      key={index}
      className="bg-secondary/50 p-4 rounded-md hover:bg-secondary transition-colors shadow dark:border-2 "
    >
      <Link
        to={`/post/${post.id}`}
        className="text-primary hover:underline font-semibold"
      >
        {post.title}
      </Link>
      <p className="text-sm text-muted-foreground mt-1 flex gap-1 items-center">
        <CalendarIcon size={15} />{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="flex items-center space-x-4 mt-2">
        <span className="text-sm text-muted-foreground flex gap-1 items-center">
          <HeartIcon size={15} />
          {post.likes}
        </span>
        <span className="text-sm text-muted-foreground flex gap-1 items-center">
          <MessageCircleIcon size={15} />0
        </span>
        {settigs && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <X
                  className="cursor-pointer"
                  size={20}
                  color="red"
                  onClick={() => {}}
                />
              </TooltipTrigger>
              <TooltipContent className="text-muted-foreground p-5">
                <p>Postu silmek istediğinize emin misiniz?</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    color="danger"
                    variant="destructive"
                    size={"sm"}
                    loading={isPending}
                    onClick={() => deletePost(post.id)}
                    className="h-8"
                  >
                    Sil
                  </Button>
                  <Button color="primary" size={"sm"} className="h-8">
                    İptal
                  </Button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default ShortPost;
