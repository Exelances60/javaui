import ThemeSettigsTab from "@/components/custom/Profile/theme-settigs-tab";
import ProfileSettigsTab from "@/components/custom/Profile/profile-settigs/profile-settigs-tab";
import PostsSettigsTab from "@/components/custom/Profile/post-settigs.tab";
import SocialSettigsTab from "@/components/custom/Profile/social-settigs-tab";
import { useGetUserInfo } from "@/hooks/useUserInfo";
import ErrorAlert from "@/components/error-alert";
import { SkeletonCard } from "@/components/skeleton-card";

const ProfileContets = ({ tab }: { tab: string }) => {
  const { error, isError, isLoading, userInfo } = useGetUserInfo();

  if (isError) {
    return <ErrorAlert error={error as Error} />;
  }
  if (isLoading) {
    return (
      <div className="w-full h-full flex gap-2 md:flex-wrap md:overflow-hidden">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <>
      {tab === "profile" && <ProfileSettigsTab />}
      {tab === "theme" && <ThemeSettigsTab />}
      {tab === "posts" && <PostsSettigsTab />}
      {tab === "social" && (
        <SocialSettigsTab socialMedia={userInfo?.socialMedia || []} />
      )}
    </>
  );
};

export default ProfileContets;
