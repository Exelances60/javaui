import dummyfood from "@/assets/home/dumyımage.jpg";
import { cn } from "@/lib/utils";
import React from "react";

const SectionCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={dummyfood}
          alt={name}
          className="object-cover w-full h-full"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black",
            // light theme overlay
            "bg-opacity-80",
            // dark theme overlay
            "dark:bg-opacity-80"
          )}
        />
      </div>
      <div className="relative z-10 p-4 text-white">
        <div className="flex flex-row items-center gap-2 mb-2">
          <img
            src={img || dummyfood}
            alt={name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="text-lg font-semibold">{name}</h4>
            <p className="text-sm text-white">{username}</p>
          </div>
        </div>
        <blockquote className="text-sm">{body}</blockquote>
      </div>
    </figure>
  );
};

export default SectionCard;
