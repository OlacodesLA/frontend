import * as React from "react";
import logo from "../../public/UZEL.svg";
import Image from "next/image";
import {
  Home,
  CreditCard,
  ArrowLeftRight,
  User,
  CreditCard as VirtualCard,
  PiggyBank,
  Briefcase,
  Plane,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: CreditCard, label: "Payments", href: "/app/payments" },
  { icon: ArrowLeftRight, label: "P2P Trade", href: "/" },
  { icon: User, label: "Accounts", href: "/" },
  { icon: VirtualCard, label: "Virtual cards", href: "/" },
  { icon: PiggyBank, label: "Save Funds", href: "/" },
  { icon: Briefcase, label: "Invoicing", href: "/" },
  { icon: Plane, label: "Travel cards", href: "/" },
  { icon: ClipboardList, label: "Transactions", href: "/" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Home");

  return (
    <ShadcnSidebar className="border-r">
      <SidebarHeader className="flex items-center justify-center py-10 px-4 border-b">
        <Image src={logo} className="" alt="" />
      </SidebarHeader>
      <SidebarContent className="px-5">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem
              onClick={() => setActiveItem(item.label)}
              className={cn(
                activeItem === item.label && "bg-[#D0C4F8] rounded-sm",
                "flex items-center mx-4 my-2 hover:b-primary/10"
              )}
              key={item.label}
            >
              <SidebarMenuButton
                asChild
                className="hover:bg-[#D0C4F8] py-2 group hover:text-primary100"
              >
                <Link href={item.href}>
                  <item.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      activeItem === item.label
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="group-hover:font-medium">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
