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
    <div className="w-full h-screen">
      <div className="w-full flex justify-end p-2">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-96 ">
          <h1 className="text-3xl font-bold text-center">Kayıt Ol</h1>
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
      </div>
    </div>
  );
};

export default Register;
