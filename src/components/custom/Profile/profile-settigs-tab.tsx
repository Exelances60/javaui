import BlurFade from "@/components/magicui/blur-fade";
import React from "react";

const ProfileSettigsTab = () => {
  return (
    <BlurFade>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Profil</h1>
        <p>Bu kısımda profil bilgilerinizi güncelleyebilirsiniz.</p>
      </div>
    </BlurFade>
  );
};

export default ProfileSettigsTab;
