import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Post } from "@/hooks/usePostQueries";

interface IPostAuthor {
  postData?: Post;
}

const PostAuthor = ({ postData }: IPostAuthor) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end items-center">
      <p>Yazar : </p>
      <div className="p-2">
        <Badge>{postData?.author?.fullName}</Badge>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="w-10 h-10 cursor-pointer">
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
                <p className="text-sm text-muted-foreground">Yazar</p>
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
    </div>
  );
};

export default PostAuthor;
