import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Post, useLikePost } from "@/hooks/usePostQueries";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface IPostAuthor {
  postData?: Post;
}

const PostAuthor = ({ postData }: IPostAuthor) => {
  const navigate = useNavigate();
  const { mutate: likePost } = useLikePost(postData?.id ?? 0);

  const handleLikePost = async (postId: number) => {
    if (!postId) {
      return;
    }
    try {
      likePost(postId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-end items-center">
        <p>Yazar : </p>
        <div className="p-2">
          <Badge>{postData?.author?.fullName}</Badge>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="w-10 h-10 cursor-pointer shadow-lg">
              <AvatarImage
                src={postData?.author?.image}
                alt={postData?.author?.fullName}
              />
              <AvatarFallback>
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-4 pb-3 flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={postData?.author?.image}
                    alt={postData?.author?.fullName}
                  />
                  <AvatarFallback>
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {postData?.author?.fullName}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {postData?.author?.job ? postData?.author?.job : "Yazar"}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-4 bg-muted/50">
                <Button
                  className="w-full"
                  size={"sm"}
                  onClick={() => {
                    navigate(`/user/${postData?.author?.id}`);
                  }}
                >
                  Profil Sayfasına Git
                </Button>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Heart
            className={cn(
              "w-6 h-6 cursor-pointer ml-2 transition-colors duration-200",
              {
                "text-red-600 fill-red-600": postData?.liked,
                "text-gray-400 hover:text-red-600": !postData?.liked,
              }
            )}
            onClick={() => handleLikePost(postData?.id ?? 0)}
          />
        </motion.div>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={postData?.likes}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn("font-medium ml-2", {
              "text-red-600": postData?.liked,
              "text-gray-600": !postData?.liked,
            })}
          >
            {postData?.likes}
          </motion.span>
        </AnimatePresence>
      </div>
    </>
  );
};

export default PostAuthor;
