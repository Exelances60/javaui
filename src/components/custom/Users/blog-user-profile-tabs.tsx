import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin } from "lucide-react";
import { UserInfo } from "@/hooks/useUserInfo";
import { useAllPostsWithPagination } from "@/hooks/usePostQueries";
import ShortPost from "../short-post";

interface BlogUserProfileTabsProps {
  userInfo?: UserInfo;
}

const BlogUserProfileTabs = ({ userInfo }: BlogUserProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState("posts");
  const { postData, isLoading: PostDataLoading } = useAllPostsWithPagination({
    page: 0,
    size: 10,
    criteria: [
      {
        filterKey: "authorId",
        operation: "EQUALS",
        value: userInfo?.id,
      },
    ],
  });

  if (PostDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Son Yazılar</TabsTrigger>
        <TabsTrigger value="about">Hakkında</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="grid grid-cols-1 gap-2">
          {postData?.map((post, index) => (
            <ShortPost key={index} post={post} index={index} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="about">
        <div className="space-y-4">
          <p>{userInfo?.summary}</p>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{userInfo?.address || "Mevcut değil"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Joined {userInfo?.createdAt?.toString()}</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BlogUserProfileTabs;
