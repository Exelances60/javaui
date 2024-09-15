import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin } from "lucide-react";
import { UserInfo } from "@/hooks/useUserInfo";

interface BlogUserProfileTabsProps {
  userInfo?: UserInfo;
  user: {
    name: string;
    email: string;
    bio: string;
    location: string;
    joinDate: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    recentPosts: {
      title: string;
      date: string;
      likes: number;
      comments: number;
    }[];
  };
}

const BlogUserProfileTabs = ({ user, userInfo }: BlogUserProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Recent Posts</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <ul className="space-y-4">
          {user.recentPosts.map((post, index) => (
            <li
              key={index}
              className="bg-secondary/50 p-4 rounded-md hover:bg-secondary transition-colors"
            >
              <a
                href="#"
                className="text-primary hover:underline font-semibold"
              >
                {post.title}
              </a>
              <p className="text-sm text-muted-foreground mt-1">{post.date}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-muted-foreground flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {post.likes}
                </span>
                <span className="text-sm text-muted-foreground flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {post.comments}
                </span>
              </div>
            </li>
          ))}
        </ul>
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
