import { Form } from "@/components/ui/form";
import { useGetUserInfo } from "@/hooks/useUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Briefcase,
  Edit,
  Mail,
  PersonStandingIcon,
  Phone,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormInput from "../../form-input";

const ProfileSettigsForm = () => {
  const { userInfo } = useGetUserInfo();
  const [isEdit, setIsEdit] = useState(false);

  const profileFormSchema = z.object({
    image: z.string().optional(),
    email: z.string().email({ message: "Geçerli bir email adresi giriniz" }),
    fullName: z.string().min(1, { message: "İsim soyisim alanı zorunludur" }),
    job: z.string().optional(),
    phone: z
      .string()
      .min(10, { message: "Telefon numarası alanı zorunludur" })
      .optional(),
  });

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      image: userInfo?.image || "",
      email: userInfo?.email || "",
      fullName: userInfo?.fullName || "",
      job: userInfo?.job || "",
      phone: userInfo?.phone || "",
    },
  });

  const onSubmit = (data: z.infer<typeof profileFormSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-2">
            <h2 className="text-xl font-semibold">Profil Ayarları</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                type="button"
                onClick={() => setIsEdit(!isEdit)}
                icon={Edit}
              >
                Düzenle
              </Button>
              <Button size="sm" type="submit" disabled={!isEdit} icon={Save}>
                Kaydet
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[300px]">
            <FormInput
              control={profileForm.control}
              name="image"
              label="Profil Fotoğrafı"
              type="file"
            />

            <FormInput
              control={profileForm.control}
              name="email"
              label="Email"
              type="email"
              icon={Mail}
              disabled={!isEdit}
            />

            <FormInput
              control={profileForm.control}
              name="fullName"
              label="İsim Soyisim"
              icon={PersonStandingIcon}
              disabled={!isEdit}
            />

            <FormInput
              control={profileForm.control}
              name="job"
              label="Meslek"
              icon={Briefcase}
              disabled={!isEdit}
            />

            <FormInput
              control={profileForm.control}
              name="phone"
              label="Telefon"
              icon={Phone}
              disabled={!isEdit}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileSettigsForm;
