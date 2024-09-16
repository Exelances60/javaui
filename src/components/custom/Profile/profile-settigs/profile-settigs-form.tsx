import { Form } from "@/components/ui/form";
import { useGetUserInfo, useUpdateUserInfo } from "@/hooks/useUserInfo";
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
  ClipboardPenIcon,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormInput from "../../form-input";
import { ImageUploader } from "@/components/image-uploader";
import { useAuth } from "@/context/auth-contex";

const ProfileSettigsForm = () => {
  const { user } = useAuth();
  const { userInfo } = useGetUserInfo(user?.id ? +user.id : undefined);
  const { mutate: updateUser } = useUpdateUserInfo();
  const [isEdit, setIsEdit] = useState(false);

  const profileFormSchema = z.object({
    image: z.any().optional(),
    email: z.string().email({ message: "Geçerli bir email adresi giriniz" }),
    fullName: z.string().min(1, { message: "İsim soyisim alanı zorunludur" }),
    job: z.string().optional(),
    phone: z
      .string()
      .optional()
      .or(
        z
          .string()
          .length(11, { message: "Telefon numarası 11 haneli olmalıdır" })
      ),
    summary: z.string().optional(),
    address: z.string().optional(),
  });

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      image: "",
      email: userInfo?.email || "",
      fullName: userInfo?.fullName || "",
      job: userInfo?.job || "",
      phone: userInfo?.phone || "",
      summary: userInfo?.summary || "",
      address: userInfo?.address || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    try {
      updateUser(data);
      setIsEdit(false);
      profileForm.setValue("image", "");
    } catch (error) {
      /*    console.log(error); */
    }
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
          <div className="flex flex-col gap-2 lg:w-[400px] w-[300px]">
            <ImageUploader
              control={profileForm.control}
              name="image"
              isEdit={isEdit}
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
            <FormInput
              control={profileForm.control}
              name="summary"
              label="Özet"
              type="textarea"
              icon={ClipboardPenIcon}
              disabled={!isEdit}
            />
            <FormInput
              control={profileForm.control}
              name="address"
              label="Adres"
              type="textarea"
              icon={MapPin}
              disabled={!isEdit}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileSettigsForm;
