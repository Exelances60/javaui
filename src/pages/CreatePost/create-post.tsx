import { PostDock } from "@/components/post-dock";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import Youtube from "@tiptap/extension-youtube";
import FontFamily from "@tiptap/extension-font-family";
import ImageResize from "tiptap-extension-resize-image";
import "./styles.scss";
import { Input } from "@/components/ui/input";
import PostTools from "./post-tools";
import Placeholder from "@tiptap/extension-placeholder";

const CreatePost = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Image,
      ImageResize,
      BulletList,
      ListItem,
      Text,
      TextStyle,
      FontFamily,
      OrderedList,
      Youtube,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: `
    `,
    editable: true,
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().insertContent(`<img src="${url}" />`).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  return (
    <div className="container min-h-screen h-auto p-5 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Post Üreticisi</h1>
      <Input placeholder="Title" />
      <PostTools editor={editor}>
        <EditorContent editor={editor} />
      </PostTools>
      <PostDock
        addImage={addImage}
        editor={editor}
        addYoutubeVideo={addYoutubeVideo}
      />
    </div>
  );
};

export default CreatePost;
