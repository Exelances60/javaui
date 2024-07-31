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
import { ISocialMedia } from "@/hooks/useUserInfo";
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
  twitter: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
});

const SocialSettigsTab = ({ socialMedia }: SocialSettigsTabProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitter:
        socialMedia.find((s) => s.platform === "Twitter")?.accountLink || "",
      instagram:
        socialMedia.find((s) => s.platform === "Instagram")?.accountLink || "",
      linkedin:
        socialMedia.find((s) => s.platform === "Linkedin")?.accountLink || "",
      facebook:
        socialMedia.find((s) => s.platform === "Facebook")?.accountLink || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                name="twitter"
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
              {form.getValues("twitter") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("twitter", "")}
                >
                  Sil
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="instagram"
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
              {form.getValues("instagram") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("instagram", "")}
                >
                  Sil
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="linkedin"
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
              {form.getValues("linkedin") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("linkedin", "")}
                >
                  Sil
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="facebook"
                disabled={Boolean(form.getValues("facebook"))}
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
              {form.getValues("facebook") && (
                <Button
                  variant="destructive"
                  size={"sm"}
                  className="px-5"
                  onClick={() => form.setValue("facebook", "")}
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
