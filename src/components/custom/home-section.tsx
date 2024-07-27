import BlurFade from "../magicui/blur-fade";
import SectionCard from "./section-card";
import Marquee from "../magicui/marquee";

interface HomeSectionProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: any[];
  reverse?: boolean;
}

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeSection = ({ title, items, reverse }: HomeSectionProps) => {
  return (
    <BlurFade delay={0.25} inView>
      <div className="w-full p-4 h-[200px]">
        <h1 className="text-lg mb-2 font-semibold"> {title} </h1>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:20s]" reverse={reverse}>
            {firstRow.map((review) => (
              <SectionCard key={review.username} {...review} />
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
