import React from "react";
import SettigsProfileCard from "@/components/custom/Profile/settigs-profile-card";
import { Brush, Earth, StickyNote, UserIcon } from "lucide-react";

const Profile = () => {
  return (
    <div className="container h-full p-5 flex flex-col overflow-y-auto">
      <div className="w-full mt-2 flex flex-col gap-3">
        <SettigsProfileCard />
        {/*    Burası Settigs Kısmı */}
        <div className="flex w-full">
          <div className="md:w-1/5 w-full mt-5 flex flex-col gap-2 pr-1 border-r-2 text-sm font-medium">
            <p className="flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all hover:text-primary">
              <UserIcon size={16} />
              Profil
            </p>
            <p className="flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all hover:text-primary">
              <Brush size={16} />
              Tema Ayarları
            </p>
            <p className="flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all hover:text-primary">
              <StickyNote size={16} />
              Postlar
            </p>
            <p className="flex items-center gap-1 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground cursor-pointer transition-all hover:text-primary">
              <Earth size={16} />
              Sosyal Medya
            </p>
          </div>
          <div className="md:w-4/5 w-full p-3 mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
