import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link2Icon, LogOut } from "lucide-react";
import { UrlState } from "@/Context";
import useFetch from "@/hooks/Use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);
  return (
    <>
      <nav className="py-5 flex justify-between items-center">
        <Link to="/">
          <span className="h-16 text-fuchsia-600 font-bold text-2xl ">
            MiniURL
          </span>
        </Link>
        <div>
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-purple-300 font-medium  hover:bg-purple-500"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <Link2Icon className="mr-2 h-4 w-4 " />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader width={"100%"} color="#eb98f5" />}
    </>
  );
};

export default Header;
