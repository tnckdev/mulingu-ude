import { Earth } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import NavbarLink from "@/components/navbar-link";
import { NavLink } from "react-router";

import axios from "axios";
import { useEffect, useState } from "react";
import { Session } from "@/utils/auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/session`,
          { withCredentials: true }
        );
        setSession(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSession();
  }, []);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-background shadow-sm dark:bg-background/90 border w-full">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 items-center">
            <NavLink to={"/"}>
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Earth />
                <span>Mulingu.com</span>
              </div>
            </NavLink>

            <nav className="hidden md:flex gap-4">
              <NavbarLink to={"/"} text={"Home"} />
              <NavbarLink to={"/learn"} text={"Learn"} />
              <NavbarLink to={"/dictionary"} text={"Dictionary"} />
              <NavbarLink to={"/components"} text={"Components"} />
              <NavbarLink to={"/leaderboard"} text={"Leaderboard"} />
              <NavbarLink to={"/categories"} text={"Categories"} />
            </nav>

            <div className="flex items-center gap-4">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-4">
                      <p>{session.user.name}</p>
                      <Avatar>
                        <AvatarImage src={session.user.image} />
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NavLink to={"/signout"}>Sign out</NavLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink to={"/signin"}>
                  <Button>Sign in</Button>
                </NavLink>
              )}
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-14 w-full">{children}</main>
    </>
  );
};

export default Navbar;
