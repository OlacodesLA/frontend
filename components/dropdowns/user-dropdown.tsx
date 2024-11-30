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

interface UserDropdownProps {
  name: string;
  tag?: string;
  initials: string;
}

export function UserDropdown({
  name,
  tag = "unset",
  initials,
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-white text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center gap-2 bg-[#F7F5FF] p-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <DropdownMenuLabel className="p-0 text-sm font-normal">
              {name}
            </DropdownMenuLabel>
            <span className="text-xs text-muted-foreground">
              UZEL tag: {tag}
            </span>
          </div>
        </div>
        <DropdownMenuGroup className="p-2">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Your Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2">
          <DropdownMenuItem className="text-red-600 focus:bg-red-100 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
