import BlurFade from "@/components/magicui/blur-fade";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeColorToggle } from "@/components/toggle-color";

const ThemeSettigsTab = () => {
  return (
    <BlurFade>
      <div className="flex flex-col gap-2">
        <h1>Renk Ayarları</h1>
        <ThemeColorToggle />
        <h1>Açık Tema - Koyu Tema</h1>
        <ModeToggle />
      </div>
    </BlurFade>
  );
};

export default ThemeSettigsTab;
