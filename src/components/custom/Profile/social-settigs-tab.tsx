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
import { ISocialMedia } from "@/hooks/useUserInfo";
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
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      Twitter:
        socialMedia.find((s) => s.platform === "Twitter")?.accountLink || "",
      Instagram:
        socialMedia.find((s) => s.platform === "Instagram")?.accountLink || "",
      LinkedIn:
        socialMedia.find((s) => s.platform === "Linkedin")?.accountLink || "",
      Facebook:
        socialMedia.find((s) => s.platform === "Facebook")?.accountLink || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/social-media/save", {
        socialMediaAccounts: { ...values },
      });
      console.log(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Hata",
        description: formatErrors(error.response.data),
        variant: "destructive",
      });
    }
  }

  return (
    <BlurFade>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Sosyal Medya Hesaplarınız</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="Twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        icon={TwitterLogoIcon}
                        placeholder="Twitter"
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
              {form.getValues("Twitter") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("Twitter", "")}
                >
                  Sil
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="Instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        icon={InstagramLogoIcon}
                        placeholder="Instagram"
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
              {form.getValues("Instagram") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("Instagram", "")}
                >
                  Sil
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="LinkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        icon={LinkedInLogoIcon}
                        placeholder="LinkedIn"
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
              {form.getValues("LinkedIn") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("LinkedIn", "")}
                >
                  Sil
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="Facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        icon={Facebook}
                        placeholder="Facebook"
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
              {form.getValues("Facebook") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("Facebook", "")}
                >
                  Sil
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </BlurFade>
  );
};

export default SocialSettigsTab;
