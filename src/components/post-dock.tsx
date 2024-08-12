import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { GitForkIcon, Image, Pencil, Smile } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function PostDock() {
  return (
    <div className="absolute bottom-0 mb-5 left-0 right-0">
      <Dock direction="middle" magnification={50}>
        <DockIcon onClick={() => console.log("clicked")}>
          <Pencil className="w-6 h-6" />
        </DockIcon>
        <DockIcon>
          <Image className="w-6 h-6" />
        </DockIcon>
        <DockIcon>
          <GitForkIcon className="w-6 h-6" />
        </DockIcon>
        <DockIcon>
          <Smile className="w-6 h-6" />
        </DockIcon>
      </Dock>
    </div>
  );
}
