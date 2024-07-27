import React from "react";
import { useAuth } from "@/context/auth-contex";
import useTextHooks from "@/hooks/useTextHooks";

const SettigsProfileCard = () => {
  const { toTitleCase } = useTextHooks();
  const { user } = useAuth();
  return (
    <div className="flex gap-2 items-center">
      <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="profile"
        className="rounded-lg w-16 h-16 drop-shadow-md"
      />
      <div className="flex flex-col justify-center">
        <span className="text-lg font-bold">
          {toTitleCase(user?.name || "")}
        </span>
        <span className="text-md text-gray-500">{user?.email}</span>
      </div>
    </div>
  );
};

export default SettigsProfileCard;
