import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { GitForkIcon, Image, Pencil, Smile } from "lucide-react";
import BlurFade from "./magicui/blur-fade";
import { PostContent } from "@/pages/CreatePost/create-post";

interface PostDockProps {
  setPostContent: React.Dispatch<React.SetStateAction<PostContent[]>>;
}

export function PostDock({ setPostContent }: PostDockProps) {
  const handleAddText = () => {
    setPostContent((prev) => {
      // Find the last active content
      const lastActiveIndex = prev.findIndex((content) => content.active);

      // Create a new content array with updated states
      const newPostContent = prev.map((content, index) => ({
        ...content,
        active: index === lastActiveIndex ? false : content.active,
      }));

      // Add a new text content
      return [
        ...newPostContent,
        {
          type: "text",
          content: "",
          setter: true,
          active: true,
        },
      ];
    });
  };

  return (
    <div className="absolute bottom-0 mb-5 left-0 right-0">
      <BlurFade delay={0.25} inView>
        <Dock direction="middle" magnification={50}>
          <DockIcon onClick={handleAddText}>
            <Pencil className="w-6 h-6" />
          </DockIcon>
          <DockIcon
            onClick={() => {
              // Handle image upload logic here
            }}
          >
            <Image className="w-6 h-6" />
          </DockIcon>
          <DockIcon>
            <GitForkIcon className="w-6 h-6" />
          </DockIcon>
          <DockIcon>
            <Smile className="w-6 h-6" />
          </DockIcon>
        </Dock>
      </BlurFade>
    </div>
  );
}
