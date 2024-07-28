import ThemeSettigsTab from "@/components/custom/Profile/theme-settigs-tab";
import ProfileSettigsTab from "@/components/custom/Profile/profile-settigs-tab";
import PostsSettigsTab from "@/components/custom/Profile/post-settigs.tab";
import SocialSettigsTab from "@/components/custom/Profile/social-settigs-tab";
import { useGetUserInfo } from "@/hooks/userUserInfo";
import ErrorAlert from "@/components/error-alert";
import { SkeletonCard } from "@/components/skeleton-card";

const ProfileContets = ({ tab }: { tab: string }) => {
  const { error, isError, isLoading, userInfo } = useGetUserInfo();

  if (isLoading) {
    return (
      <div className="w-full h-full flex gap-2 ">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (isError) {
    return <ErrorAlert error={error as Error} />;
  }

  return (
    <>
      {tab === "profile" && <ProfileSettigsTab />}
      {tab === "theme" && <ThemeSettigsTab />}
      {tab === "posts" && <PostsSettigsTab />}
      {tab === "social" && <SocialSettigsTab />}
    </>
  );
};

export default ProfileContets;
