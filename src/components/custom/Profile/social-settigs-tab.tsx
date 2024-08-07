import { queryClient } from "@/App";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth-contex";
import { ISocialMedia, useDeleteSocialMedia } from "@/hooks/useUserInfo";
import axiosInstance from "@/lib/axios";
import { formatErrors } from "@/utils/format-erros";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Facebook } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SocialSettigsTabProps {
  socialMedia: ISocialMedia[];
}

const formSchema = z.object({
  Twitter: z.string().optional().or(z.literal("")),
  Instagram: z.string().optional().or(z.literal("")),
  LinkedIn: z.string().optional().or(z.literal("")),
  Facebook: z.string().optional().or(z.literal("")),
});

const SocialSettigsTab = ({ socialMedia }: SocialSettigsTabProps) => {
  const { toast } = useToast();
  const { mutate, isSuccess: deleteSucces } = useDeleteSocialMedia();
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: socialMedia.reduce(
      (acc, { platform, accountLink }) => {
        acc[platform as keyof typeof acc] = accountLink || "";
        return acc;
      },
      {
        Twitter: "",
        Instagram: "",
        LinkedIn: "",
        Facebook: "",
      }
    ),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/social-media/save", {
        socialMediaAccounts: { ...values },
      });
      toast({
        title: "Başarılı",
        description: response.data.message,
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Hata",
        description: formatErrors(error.response.data),
        variant: "destructive",
      });
    }
  }

  const deleteSocialMedia = async (name: string) => {
    const id = socialMedia.find((x) => x.platform === name)?.id;
    if (id !== undefined) {
      mutate(id);
      if (!deleteSucces) {
        form.setValue(name as keyof z.infer<typeof formSchema>, "");
      }
    } else {
      toast({
        title: "Hata",
        description: "Silinecek sosyal medya hesabı bulunamadı.",
        variant: "destructive",
      });
    }
  };

  const platforms = [
    { name: "Twitter", icon: TwitterLogoIcon, placeholder: "Twitter" },
    { name: "Instagram", icon: InstagramLogoIcon, placeholder: "Instagram" },
    { name: "LinkedIn", icon: LinkedInLogoIcon, placeholder: "LinkedIn" },
    { name: "Facebook", icon: Facebook, placeholder: "Facebook" },
  ];

  return (
    <BlurFade>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Sosyal Medya Hesaplarınız</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {platforms.map(({ name, icon, placeholder }) => (
              <div key={name} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          icon={icon}
                          placeholder={placeholder}
                          className="w-96"
                          type="url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="secondary"
                  size={"sm"}
                  className="px-5"
                  type="submit"
                >
                  Ekle
                </Button>
                {form.getValues(name as keyof z.infer<typeof formSchema>) && (
                  <Button
                    variant="destructive"
                    size={"sm"}
                    className="px-5"
                    type="button" // <-- Buraya type="button" ekledik
                    onClick={() => deleteSocialMedia(name)}
                  >
                    Sil
                  </Button>
                )}
              </div>
            ))}
          </form>
        </Form>
      </div>
    </BlurFade>
  );
};

export default SocialSettigsTab;
