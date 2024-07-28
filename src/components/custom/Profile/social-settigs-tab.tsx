import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
      twitter: "",
      instagram: "",
      linkedin: "",
      facebook: "",
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
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="facebook"
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
            </div>
          </form>
        </Form>
      </div>
    </BlurFade>
  );
};

export default SocialSettigsTab;
