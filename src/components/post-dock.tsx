import { Dock, DockIcon } from "@/components/magicui/dock";
import { Image, Pencil, Smile, VideoIcon } from "lucide-react";
import BlurFade from "./magicui/blur-fade";
import type { Editor } from "@tiptap/react";

interface PostDockProps {
  addImage: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor: Editor | null;
  addYoutubeVideo: () => void;
}

export function PostDock({ addImage, editor, addYoutubeVideo }: PostDockProps) {
  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 ml-5">
      <BlurFade delay={0.25} inView>
        <Dock
          direction="middle"
          magnification={50}
          className="flex flex-col h-full"
        >
          <DockIcon onClick={() => editor?.chain().focus().run()}>
            <Pencil className="w-6 h-6" />
          </DockIcon>
          <DockIcon onClick={addImage}>
            <Image className="w-6 h-6" />
          </DockIcon>
          <DockIcon onClick={addYoutubeVideo}>
            <VideoIcon className="w-6 h-6" />
          </DockIcon>
          <DockIcon>
            <Smile className="w-6 h-6" />
          </DockIcon>
        </Dock>
      </BlurFade>
    </div>
  );
}
