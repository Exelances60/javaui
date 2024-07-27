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
import { LockIcon, MailIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { formatErrors } from "@/utils/format-erros";
import { useAuth } from "@/context/auth-contex";
import SparklesText from "@/components/magicui/sparkles-text";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import BlurFade from "@/components/magicui/blur-fade";
import { ThemeColorToggle } from "@/components/toggle-color";

const formSchema = z.object({
  email: z.string().email({ message: "Geçerli bir email adresi giriniz." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
});
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/auth/login", values);
      login(response.data.data);
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
      <div className="absolute flex gap-2 top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div className="relative flex h-screen w-full flex-col  items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
        <BlurFade delay={0.1}>
          <div className="w-96 ">
            <div className="flex justify-center">
              <SparklesText text="Login" />
            </div>
            <Form {...form}>
              <form
                className="mt-4 space-y-4 p-5 md:p-0"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input icon={MailIcon} {...field} />
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
                    Hesabın yok mu?{" "}
                    <a
                      className="text-blue-500 cursor-pointer"
                      onClick={() => navigate("/register")}
                    >
                      Kayıt ol
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">Şifremi unuttum?</p>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  loading={form.formState.isSubmitting}
                >
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
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
    </>
  );
};
export default Login;
