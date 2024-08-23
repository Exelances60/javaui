import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCategory } from "@/hooks/useCategory";

const PostConfirm = ({
  publishPost,
}: {
  publishPost: (image: string, category: string) => void;
}) => {
  const [image, setImage] = useState<string | "">("");
  const [category, setCategory] = useState<string | "">("");
  const { categories } = useCategory();

  return (
    <Dialog>
      <DialogTrigger asChild>
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
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex justify-end gap-2 ">
          <DialogClose asChild>
            <Button size="sm" onClick={() => publishPost(image, category)}>
              Yayınla
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostConfirm;
