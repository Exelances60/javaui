import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-contex";
import { Link } from "react-router-dom";
import useTextHooks from "@/hooks/useTextHooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetUserInfo } from "@/hooks/useUserInfo";
import { CircleUser } from "lucide-react";
import { Button } from "./ui/button";

const AvatarDropdown = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const { userInfo } = useGetUserInfo(user?.id ? +user.id : undefined);
  const { toTitleCase } = useTextHooks();
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer shadow">
          <AvatarImage
            className="cursor-pointer object-cover "
            src={userInfo?.image || "/profile.png"}
            alt="profile"
          />
          <AvatarFallback>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Hesap Ayarları</span>
            </Button>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <span className="font-semibold">
            {toTitleCase(userInfo?.fullName || "")}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/profile" className="w-full h-full">
            Profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Destek</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
