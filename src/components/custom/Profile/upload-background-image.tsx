import React, { useState } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-contex";
import { UserInfo } from "@/hooks/useUserInfo";

const UploadBackgroundImage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const response = await axiosInstance.postForm(
        "/storage/upload-background",
        {
          file: selectedFile,
        }
      );
      if (response.data.success) {
        queryClient.setQueryData(["user", user?.id], (oldData: UserInfo) => {
          return {
            ...oldData,
            backgroundImage: response.data.data.backgroundImage,
          };
        });
        toast({
          title: "Başarılı",
          description: "Arka plan resmi başarıyla yüklendi.",
          variant: "success",
        });
        setIsUploadOpen(false);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 transition-colors bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Camera className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Arka Plan Resmi Yükle</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            {selectedFile ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className="w-full h-auto max-h-64 object-cover rounded-md"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Tıkla </span> veya drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Label>
              </div>
            )}
            {selectedFile && (
              <Button onClick={handleUpload}>Resim Yükle</Button>
            )}
          </div>
        </div>
        <DialogDescription>
          Arka plan resminizi yükleyin. Maksimum boyut 800x400px olmalıdır.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UploadBackgroundImage;
