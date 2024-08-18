import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  PencilOffIcon,
} from "lucide-react";
import type { Editor } from "@tiptap/core";

interface EditorContentProps {
  editor: Editor;
  children?: React.ReactNode;
}

const PostTools = ({ editor, children }: EditorContentProps) => {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Başlıklar</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 1 }).run()
                }
              >
                Heading 1
                <ContextMenuShortcut>
                  <Heading1 className="w-6 h-6" />
                </ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 2 }).run()
                }
              >
                Heading 2
                <ContextMenuShortcut>
                  <Heading2 className="w-6 h-6" />
                </ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 3 }).run()
                }
              >
                Heading 3
                <ContextMenuShortcut>
                  <Heading3 className="w-6 h-6" />
                </ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Listeler</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                Bullet List
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                Ordered List
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />

          <ContextMenuSub>
            <ContextMenuSubTrigger>Font Ayarları</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setFontFamily("Inter").run()
                }
              >
                Inter
              </ContextMenuItem>

              <ContextMenuItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setFontFamily("Comic Sans MS, Comic Sans")
                    .run()
                }
              >
                Comic Sans MS
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setFontFamily("Arial").run()
                }
              >
                Arial
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setFontFamily("Courier New").run()
                }
              >
                Courier New
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setFontFamily("Georgia").run()
                }
              >
                Georgia
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setFontFamily("Tahoma").run()
                }
              >
                Tahoma
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setFontFamily("monospace").run()
                }
              >
                Monospace
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => editor.chain().focus().setBold().run()}
          >
            Kalınlaştır
            <ContextMenuShortcut>
              <BoldIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem
            onClick={() => editor.chain().focus().unsetBold().run()}
          >
            Kalınlaştırmayı Kaldır
            <ContextMenuShortcut className="ml-2">
              <PencilOffIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />

          <ContextMenuItem
            onClick={() => editor.chain().focus().setItalic().run()}
          >
            Italic
            <ContextMenuShortcut>
              <ItalicIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem
            onClick={() => editor.chain().focus().unsetItalic().run()}
          >
            Italic Kaldır
            <ContextMenuShortcut>
              <PencilOffIcon className="w-4 h-4" />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

export default PostTools;
