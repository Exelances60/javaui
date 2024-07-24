import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import BlurFade from "../magicui/blur-fade";
import SectionCard from "./section-card";

interface HomeSectionProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: any[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeSection = ({ title, items }: HomeSectionProps) => {
  return (
    <BlurFade delay={0.25} inView>
      <div className="w-full p-4 h-[200px]">
        <h1 className="text-lg mb-2 font-semibold"> {title} </h1>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-full"
        >
          <CarouselContent className="h-[200px]">
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/5 h-full w-full"
              >
                <SectionCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </BlurFade>
  );
};

export default HomeSection;
