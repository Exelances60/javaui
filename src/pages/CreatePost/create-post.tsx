import "./styles.scss";
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
import { Input } from "@/components/ui/input";
import PostTools from "./post-tools";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import { useCreatePost } from "@/hooks/usePostQueries";
import PostConfirm from "./post-confirm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const CreatePost = () => {
  const [imageUrlOpen, setImageUrlOpen] = useState(false);
  const [videoUrlOpen, setVideoUrlOpen] = useState(false);
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const [title, setTitle] = useState("");
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
  const { mutate } = useCreatePost();

  if (!editor) {
    return null;
  }

  const addImage = () => {
    if (url) {
      editor.chain().focus().insertContent(`<img src="${url}" />`).run();
    }
    setImageUrlOpen(false);
    setUrl("");
  };

  const addYoutubeVideo = () => {
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }

    setImageUrlOpen(false);
  };

  const publishPost = async (image: string, categoryString: string) => {
    try {
      if (!categoryString) {
        throw new Error("Kategori seçmelisiniz");
      }
      const content = editor.getHTML();
      const categoryId = parseInt(categoryString);
      mutate({ title, content, image, categoryId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mt-10 min-h-screen h-auto p-5 flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Post Oluşturucusu</h1>
        <PostConfirm publishPost={publishPost} />
      </div>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <PostTools editor={editor}>
        <EditorContent editor={editor} />
      </PostTools>
      <PostDock
        setImageUrlOpen={setImageUrlOpen}
        editor={editor}
        setVideoUrlOpen={setVideoUrlOpen}
      />
      <Dialog
        open={imageUrlOpen}
        onOpenChange={(open) => {
          setUrl("");
          return setImageUrlOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle className="mb-2">Resim</DialogTitle>
            <Input
              placeholder="Resim url giriniz"
              onChange={(e) => setUrl(e.target.value)}
            />
          </DialogHeader>
          {url && (
            <div className="flex justify-center">
              <img src={url} alt="resim" className="w-1/2" />
            </div>
          )}
          <DialogFooter className="pt-2">
            <Button
              variant="default"
              className="px-8"
              size="sm"
              onClick={() => addImage()}
            >
              Ekle
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="px-8" size="sm">
                İptal
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={videoUrlOpen}
        onOpenChange={(open) => {
          setUrl("");
          return setVideoUrlOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle className="mb-2">Video</DialogTitle>
            <Input
              placeholder="Youtube video url giriniz"
              onChange={(e) => setUrl(e.target.value)}
            />
          </DialogHeader>
          {url && (
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${url.split("v=")[1]}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <DialogFooter className="pt-2">
            <Button
              variant="default"
              className="px-8"
              size="sm"
              onClick={() => addYoutubeVideo()}
            >
              Ekle
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="px-8" size="sm">
                İptal
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
