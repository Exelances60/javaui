import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const PostConfirm = ({
  publishPost,
}: {
  publishPost: (image: string) => void;
}) => {
  const [image, setImage] = useState<string | "">("");
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">Yayınla</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Postu Yayınla</DialogTitle>
          <DialogDescription>
            Postunuzu yayınlamak istediğinizden emin misiniz?
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Kapak fotoğrafı"
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="flex justify-end gap-2 ">
          <DialogClose asChild>
            <Button size="sm" onClick={() => publishPost(image)}>
              Yayınla
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostConfirm;
