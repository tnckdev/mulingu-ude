import { Earth } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import NavbarLink from "@/components/navbar-link";
import { NavLink, Outlet } from "react-router";

import UserInfo from "@/components/user-info";

const Navbar = () => {
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
              {/* <NavbarLink to={"/dictionary"} text={"Dictionary"} />
              <NavbarLink to={"/components"} text={"Components"} />
              <NavbarLink to={"/leaderboard"} text={"Leaderboard"} />
              <NavbarLink to={"/categories"} text={"Categories"} /> */}
            </nav>

            <div className="flex items-center gap-4">
              <UserInfo />
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
