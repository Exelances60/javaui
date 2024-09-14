import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Separator } from "./ui/separator";

export default function BlogUserProfile() {
  const { id } = useParams();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [user, setUser] = useState({
    name: "Emily Chen",
    email: "emily.chen@example.com",
    bio: "Travel enthusiast and food blogger. Exploring the world one dish at a time. Sharing my culinary adventures and travel stories.",
    location: "San Francisco, CA",
    joinDate: "January 2020",
    postsCount: 127,
    followersCount: 1500,
    followingCount: 300,
    recentPosts: [
      {
        title: "10 Must-Try Dishes in Tokyo",
        date: "2023-06-15",
        likes: 89,
        comments: 23,
      },
      {
        title: "A Foodie's Guide to Paris",
        date: "2023-05-22",
        likes: 112,
        comments: 34,
      },
      {
        title: "Hidden Gems: Street Food in Bangkok",
        date: "2023-04-30",
        likes: 76,
        comments: 18,
      },
    ],
  });

  console.log(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-[var(--gradient-bg)] opacity-80"></div>
          <img
            src="https://g-jybxsstrw0.vusercontent.net/placeholder.svg"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="text-center">
          <div className="absolute top-52 inset-x-0 flex justify-center">
            <Dialog
              open={isAvatarModalOpen}
              onOpenChange={setIsAvatarModalOpen}
            >
              <DialogTrigger asChild>
                <Avatar className="w-32 h-32 border-4 border-background cursor-pointer shadow-lg">
                  <AvatarImage
                    src="https://g-jybxsstrw0.vusercontent.net/placeholder.svg"
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="relative">
                  <img
                    src="https://g-jybxsstrw0.vusercontent.net/placeholder.svg"
                    alt={user.name}
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
                  {user.name}
                </h2>
              </DialogContent>
            </Dialog>
          </div>
          <CardTitle className="text-3xl font-bold pt-10 md:pt-5">
            {user.name}
          </CardTitle>
          <CardDescription className="text-xl">{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground italic">{user.bio}</p>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <div className="bg-primary/10 rounded-lg p-3 transition-transform hover:scale-105">
                <div className="text-2xl font-bold">{user.postsCount}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 transition-transform hover:scale-105">
                <div className="text-2xl font-bold">{user.followersCount}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 transition-transform hover:scale-105">
                <div className="text-2xl font-bold">{user.followingCount}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>
            <Separator />
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
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
                      <p className="text-sm text-muted-foreground mt-1">
                        {post.date}
                      </p>
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
                  <p>{user.bio}</p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <Separator />
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
