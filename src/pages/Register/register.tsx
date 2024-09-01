import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { formatErrors } from "@/utils/format-erros";
import axiosInstance from "@/lib/axios";
import { LockIcon, MailIcon, PersonStandingIcon } from "lucide-react";
import DotPattern from "@/components/magicui/dot-pattern";
import BlurFade from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";
import SparklesText from "@/components/magicui/sparkles-text";

const formSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Adınız en az 4 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir email adresi giriniz." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/auth/register", {
        fullName: values.fullName,
        email: values.email,
        password: +values.password,
      });
      toast({
        title: "Başarılı",
        description: response.data.message,
        variant: "success",
      });
      form.reset();
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
    <>
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
        <BlurFade delay={0.1}>
          <div className="w-96 ">
            <div className="flex justify-center">
              <SparklesText text="Kayıt Ol" />
            </div>{" "}
            <Form {...form}>
              <form
                className="mt-4 space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="fullName">Full Name</FormLabel>
                      <FormControl>
                        <Input icon={PersonStandingIcon} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input type="email" icon={MailIcon} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input type="password" icon={LockIcon} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex w-full justify-between">
                  <p className="text-right text-sm text-gray-500">
                    Hesabın var mı?{" "}
                    <a
                      className="text-blue-500 cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      Giriş yap
                    </a>
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </BlurFade>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)] "
          )}
        />
      </div>
    </>
  );
};

export default Register;
