import { LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/use-auth-store";
import Link from "next/link";
import { removeToken } from "@/utils/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  tag?: string;
}

export function UserDropdown({ tag = "unset" }: UserDropdownProps) {
  const router = useRouter();
  const { first_name, last_name, initials } = useAuthStore(
    (state) => state.user
  );

  const handleLogout = () => {
    toast.loading("Logging out");
    removeToken();
    setTimeout(() => {
      toast.dismiss();
      toast.success("Logged out successfully");
      router.push("/auth/sign-in");
    }, 500);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="md:size-10 size-8 cursor-pointer">
          <AvatarFallback className="bg-primary-light font-medium text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:w-72 w-56" align="end">
        <div className="flex items-center gap-2 bg-primary-light p-3">
          <Avatar className="md:size-14 size-10">
            <AvatarFallback className="bg-white md:text-base font-medium text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-1">
            <DropdownMenuLabel className="p-0 md:text-base text-sm font-normal">
              {first_name} {last_name}
            </DropdownMenuLabel>
            <span className="text-xs text-muted-foreground">
              UZEL tag: {tag}
            </span>
          </div>
        </div>
        <DropdownMenuGroup className="py-2 flex flex-col space-y-1">
          <Link href="/app/profile">
            <DropdownMenuItem className="cursor-pointer md:py-2.5">
              <User className="mr-2 h-4 w-4" />
              Your Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/app/settings">
            <DropdownMenuItem className="cursor-pointer md:py-2.5">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2">
          <DropdownMenuItem
            onClick={() => handleLogout()}
            className="text-red-600 cursor-pointer focus:bg-red-100 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
