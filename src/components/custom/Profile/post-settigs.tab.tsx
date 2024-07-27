import BlurFade from "@/components/magicui/blur-fade";
import React from "react";

const PostsSettigsTab = () => {
  return (
    <BlurFade>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Postlar</h1>
        <p>Bu kısımda postlarınızı düzenleyebilirsiniz.</p>
      </div>
    </BlurFade>
  );
};

export default PostsSettigsTab;
