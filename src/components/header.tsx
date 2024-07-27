import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Dumbbell } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import AvatarDropdown from "./avatar-dropdown";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <Link
          to="/home"
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/home" && "text-foreground"
          )}
        >
          <Dumbbell className="h-6 w-6" />
          <span className="sr-only">Fitness Blog</span>
        </Link>
        <Link
          to="/home"
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/home" && "text-foreground"
          )}
        >
          Ana Sayfa
        </Link>
        <Link
          to={"/fit-yemek-tarifleri"}
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/fit-yemek-tarifleri" && "text-foreground"
          )}
        >
          Fit Yemek Tarifleri
        </Link>
        <Link
          to={"/egitim-videolari"}
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/egitim-videolari" && "text-foreground"
          )}
        >
          Eğitim Videoları
        </Link>
        <Link
          to={"/egitmenler"}
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/egitmenler" && "text-foreground"
          )}
        >
          Eğitmenler
        </Link>
        <Link
          to={"/antreman-programlari"}
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/antreman-programlari" && "text-foreground"
          )}
        >
          Antreman Programları
        </Link>
      </nav>
      <div className="flex items-center gap-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5 " />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/home"
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/home" && "text-foreground"
                )}
              >
                <Dumbbell className="h-6 w-6" />
                <span className="sr-only">Fitness Blog</span>
              </Link>
              <Link
                to="/home"
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/home" && "text-foreground"
                )}
              >
                Ana Sayfa
              </Link>
              <Link
                to={"/fit-yemek-tarifleri"}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/fit-yemek-tarifleri" && "text-foreground"
                )}
              >
                Fit Yemek Tarifleri
              </Link>
              <Link
                to={"/egitim-videolari"}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/egitim-videolari" && "text-foreground"
                )}
              >
                Eğitim Videoları
              </Link>
              <Link
                to={"/egitmenler"}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/egitmenler" && "text-foreground"
                )}
              >
                Eğitmenler
              </Link>
              <Link
                to={"/antreman-programlari"}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === "/antreman-programlari" && "text-foreground"
                )}
              >
                Antreman Programları
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Input icon={Search} placeholder="Search..." />
          </div>
        </form>
        <AvatarDropdown />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
