import BlurFade from "@/components/magicui/blur-fade";
import ProfileSettigsForm from "./profile-settigs-form";

const ProfileSettigsTab = () => {
  return (
    <BlurFade>
      <div className="flex flex-col gap-2">
        <ProfileSettigsForm />
      </div>
    </BlurFade>
  );
};

export default ProfileSettigsTab;
