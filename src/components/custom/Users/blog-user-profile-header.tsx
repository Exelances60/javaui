import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useFollowUser, UserInfo } from "@/hooks/useUserInfo";
import { useAuth } from "@/context/auth-contex";
import { motion, AnimatePresence } from "framer-motion";
import { Check, UserPlus } from "lucide-react";

interface BlogUserProfileHeaderProps {
  userInfo?: UserInfo;
}

const BlogUserProfileHeader = ({ userInfo }: BlogUserProfileHeaderProps) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const { user } = useAuth();
  const { mutate: follow } = useFollowUser();

  const handleFollow = () => {
    follow(userInfo?.id || 0);
  };

  return (
    <>
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-[var(--gradient-bg)] opacity-80"></div>
        <img
          src={
            userInfo?.backgroundImage ||
            "https://st5.depositphotos.com/1558912/64911/i/450/depositphotos_649119262-stock-photo-fitness-background-pink-dumbbells-towel.jpg"
          }
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
        {userInfo?.id !== user?.id ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={userInfo?.isFollowed ? "following" : "not-following"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-center"
            >
              <Button
                variant={userInfo?.isFollowed ? "outline" : "default"}
                className={`mt-6 px-6 py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
                  userInfo?.isFollowed
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={() => handleFollow()}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={userInfo?.isFollowed ? "check" : "plus"}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="mr-2"
                  >
                    {userInfo?.isFollowed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <UserPlus className="h-5 w-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
                {userInfo?.isFollowed ? "Following" : "Follow"}
              </Button>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </CardHeader>
    </>
  );
};

export default BlogUserProfileHeader;
