import BlurFade from "@/components/magicui/blur-fade";
import DotPattern from "@/components/magicui/dot-pattern";
import WordPullUp from "@/components/magicui/word-pull-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen justify-center items-center flex flex-col">
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        words="404 Sayfa Bulunamadı"
      />
      <BlurFade
        delay={0.2}
        className="flex flex-col items-center justify-center mt-5"
      >
        <p className="text-lg  md:text-2xl">Bu sayfa bulunamadı.</p>
        <Button className="mt-4">
          <a href="/home" className="">
            Anasayfaya Dön
          </a>
        </Button>
      </BlurFade>
      <DotPattern
        width={20}
        height={20}
        cx={5}
        cy={1}
        cr={1}
        x={100}
        y={100}
        className={cn(
          "w-full h-full ",
          "[mask-image:linear-gradient(to_top_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
};

export default NotFoundPage;
