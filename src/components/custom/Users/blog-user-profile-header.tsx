import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { UserInfo } from "@/hooks/useUserInfo";

interface BlogUserProfileHeaderProps {
  userInfo?: UserInfo;
}

const BlogUserProfileHeader = ({ userInfo }: BlogUserProfileHeaderProps) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  return (
    <>
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-[var(--gradient-bg)] opacity-80"></div>
        <img
          src={userInfo?.backgroundImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="text-center">
        <div className="absolute top-52 inset-x-0 flex justify-center">
          <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
            <DialogTrigger asChild>
              <Avatar className="w-32 h-32 border-4 border-background cursor-pointer shadow-lg">
                <AvatarImage src={userInfo?.image} alt={userInfo?.fullName} />
                <AvatarFallback>
                  {userInfo?.fullName[0]}
                  {userInfo?.fullName[1]}
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="relative">
                <img
                  src={userInfo?.image}
                  alt={userInfo?.fullName}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setIsAvatarModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-2xl font-semibold text-center mt-4">
                {userInfo?.fullName}
              </h2>
            </DialogContent>
          </Dialog>
        </div>
        <CardTitle className="text-3xl font-bold pt-10 md:pt-5">
          {userInfo?.fullName}
        </CardTitle>
        <CardDescription className="text-xl">{userInfo?.email}</CardDescription>
      </CardHeader>
    </>
  );
};

export default BlogUserProfileHeader;
