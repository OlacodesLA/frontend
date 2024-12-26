"use client";
import { UserDropdown } from "@/components/dropdowns/user-dropdown";
import { Button } from "@/components/ui/button";
import logo from "@/public/UZEL.svg";

import { useAuthStore } from "@/store/use-auth-store";
import { Moon } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const InternationalPaymentLayout = ({ children }: Props) => {
  const { first_name, last_name } = useAuthStore((state) => state.user);

  return (
    <div>
      <div className="flex flex-col h-full w-full">
        <div className="flex">
          <div className="flex items-center justify-center py-8 px-4 border-b">
            <Image src={logo} className="" alt="" />
          </div>
          <div className="flex justify-between w-full items-center mb-3 p-4 border-b">
            <div>
              <h1 className="md:text-2xl text-xl font-bold">
                Welcome, {first_name}
              </h1>
              <p className="text-sm text-muted-foreground md:mb-3">
                Send, keep, and receive funds in different currencies.
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                variant="outline"
                className="bg-white shadow-sm md:flex hidden hover:bg-white text-[#6139E7]"
              >
                Manage Accounts
              </Button>

              <Button variant="outline" className="rounded-full w-9 h-9">
                <Moon size={21} />
              </Button>
              <UserDropdown />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default InternationalPaymentLayout;
