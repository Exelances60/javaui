import useTextHooks from "@/hooks/useTextHooks";
import { useGetUserInfo } from "@/hooks/useUserInfo";
import ErrorAlert from "@/components/error-alert";
import { Skeleton } from "@/components/ui/skeleton";

const SettigsProfileCard = () => {
  const { error, isError, isLoading, userInfo } = useGetUserInfo();
  const { toTitleCase } = useTextHooks();

  if (isError) {
    return <ErrorAlert error={error as Error} />;
  }
  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <img
        src={
          userInfo?.image
            ? userInfo.image
            : "https://www.w3schools.com/howto/img_avatar.png"
        }
        alt="profile"
        className="rounded-lg w-20 h-16 object-cover drop-shadow-md"
      />
      <div className="flex flex-col justify-center">
        <span className="text-lg font-bold">
          {toTitleCase(userInfo?.fullName || "")}
        </span>
        <span className="text-md text-gray-500">{userInfo?.email}</span>
      </div>
    </div>
  );
};

export default SettigsProfileCard;
