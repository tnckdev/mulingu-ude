import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { selectUser } from "@/lib/redux/slices/user";
import { NavLink } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserInfo = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4">
              <p>{user.name}</p>
              <Avatar>
                <AvatarImage src={user.image} />
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
              <DropdownMenuItem>
                <NavLink to={"/settings"} className="text-foreground">Settings</NavLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NavLink to={"/signout"} className="text-foreground">Sign out</NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <NavLink to={"/signin"}>
          <Button>Sign in</Button>
        </NavLink>
      )}
    </div>
  );
};

export default UserInfo;
