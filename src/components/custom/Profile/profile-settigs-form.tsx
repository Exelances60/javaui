import { Form } from "@/components/ui/form";
import { useGetUserInfo } from "@/hooks/useUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../form-input";
import { Briefcase, Mail, PersonStandingIcon, Phone } from "lucide-react";

const ProfileSettigsForm = () => {
  const { userInfo } = useGetUserInfo();
  console.log(userInfo);

  const profileFormSchema = z.object({
    email: z.string().email({ message: "Geçerli bir email adresi giriniz" }),
    fullName: z.string().min(1, { message: "İsim soyisim alanı zorunludur" }),
    job: z.string(),
    phone: z.string().min(10, { message: "Telefon numarası alanı zorunludur" }),
  });

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: userInfo?.email,
      fullName: userInfo?.fullName,
      job: userInfo?.job,
      phone: userInfo?.phone,
    },
  });

  const onSubmit = (data: z.infer<typeof profileFormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...profileForm}>
      <form
        className="flex flex-col gap-2 w-[300px]"
        onSubmit={profileForm.handleSubmit(onSubmit)}
      >
        <FormInput
          control={profileForm.control}
          name="email"
          label="Email"
          type="email"
          icon={Mail}
        />

        <FormInput
          control={profileForm.control}
          name="fullName"
          label="İsim Soyisim"
          icon={PersonStandingIcon}
        />

        <FormInput
          control={profileForm.control}
          name="job"
          label="Meslek"
          icon={Briefcase}
        />

        <FormInput
          control={profileForm.control}
          name="phone"
          label="Telefon"
          icon={Phone}
        />
      </form>
    </Form>
  );
};

export default ProfileSettigsForm;
