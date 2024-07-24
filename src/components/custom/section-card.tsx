import dummyfood from "@/assets/home/dumyımage.jpg";
import { BentoCard } from "../magicui/bento-grid";

const SectionCard = () => {
  return (
    <div className="h-full">
      <BentoCard
        name="Antreman Programları"
        className="group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl"
        background={
          <img
            src={dummyfood}
            alt="food"
            className="object-cover w-full h-fullrounded-t-xl  duration-300 ease-in"
          />
        }
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        href="#"
        cta="Antreman Programları"
        Icon={undefined}
      />
    </div>
  );
};

export default SectionCard;
