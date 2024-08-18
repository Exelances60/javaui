import BlurFade from "../magicui/blur-fade";
import SectionCard from "./section-card";
import Marquee from "../magicui/marquee";
import { Post } from "@/hooks/usePostQueries";

interface HomeSectionProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Post[];
  reverse?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeSection = ({ title, items, reverse }: HomeSectionProps) => {
  return (
    <BlurFade delay={0.25} inView>
      <div className="w-full p-4 h-[200px]">
        <h1 className="text-lg mb-2 font-semibold"> {title} </h1>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:20s]" reverse={reverse}>
            {items.map((review) => (
              <SectionCard key={review.id} data={review} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-slate-100/50 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-slate-100/50 dark:from-background"></div>
        </div>
      </div>
    </BlurFade>
  );
};

export default HomeSection;
