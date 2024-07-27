import React from "react";
import SettigsProfileCard from "@/components/custom/Profile/settigs-profile-card";
import { Brush, Earth, StickyNote, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSettigsTab from "@/components/custom/Profile/theme-settigs-tab";
import ProfileSettigsTab from "@/components/custom/Profile/profile-settigs-tab";
import PostsSettigsTab from "@/components/custom/Profile/post-settigs.tab";
import SocialSettigsTab from "@/components/custom/Profile/social-settigs-tab";

const Profile = () => {
  const [tab, setTab] = React.useState("profile");
  return (
    <div className="container h-full p-5 flex flex-col overflow-y-auto">
      <div className="w-full mt-2 flex flex-col gap-3">
        <SettigsProfileCard />
        {/*    Burası Settigs Kısmı */}
        <div className="flex flex-col md:flex-row w-full">
          <div className="md:w-1/5 w-full mt-5 flex flex-col gap-2 pr-1 md:border-r-2 text-sm font-medium">
            <p
              className={cn(
                "flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all",
                tab === "profile" && "bg-muted text-primary"
              )}
              onClick={() => setTab("profile")}
            >
              <UserIcon size={16} />
              Profil
            </p>
            <p
              className={cn(
                "flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all",
                tab === "theme" && "bg-muted text-primary"
              )}
              onClick={() => setTab("theme")}
            >
              <Brush size={16} />
              Tema Ayarları
            </p>
            <p
              className={cn(
                "flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all",
                tab === "posts" && "bg-muted text-primary"
              )}
              onClick={() => setTab("posts")}
            >
              <StickyNote size={16} />
              Postlar
            </p>
            <p
              className={cn(
                "flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all",
                tab === "social" && "bg-muted text-primary"
              )}
              onClick={() => setTab("social")}
            >
              <Earth size={16} />
              Sosyal Medya
            </p>
          </div>
          <div className="md:w-4/5 w-full px-5 mt-5">
            {tab === "profile" && <ProfileSettigsTab />}
            {tab === "theme" && <ThemeSettigsTab />}
            {tab === "posts" && <PostsSettigsTab />}
            {tab === "social" && <SocialSettigsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
