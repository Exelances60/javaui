import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Control, useController } from "react-hook-form";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  isEdit?: boolean;
};

export function ImageUploader({ control, name, isEdit }: ImageUploaderProps) {
  const { field } = useController({ name, control });
  const [images, setImages] = useState<File | null>(null);

  const cardOnClick = () => {
    if (!isEdit) return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setImages(target.files[0]);
        if (field.onChange) {
          field.onChange(target.files[0]);
        }
      }
    };
  };

  return (
    <Card
      onClick={cardOnClick}
      className={cn(
        "cursor-pointer ease-in duration-300 ",
        !isEdit && "pointer-events-none opacity-50"
      )}
    >
      <CardContent className="p-6 space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          {images ? (
            <img
              src={URL.createObjectURL(images)}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full"
            />
          ) : (
            <>
              <FileIcon className="text-gray-300" />
              <span className="text-sm font-medium text-gray-500">
                Dosyayı sürükleyin veya yüklemek için tıklayın
              </span>
            </>
          )}
        </div>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profil Fotoğrafı</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEdit}
                  type="file"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e: any) => {
                    setImages(e.target.files[0]);
                    field.onChange(e.target.files[0]);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
