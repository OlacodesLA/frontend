"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BasicInfoModal } from "../modal";
import { useAuthStore } from "@/store/use-auth-store";
// import { NextOfKinModal } from "./next-of-kin-modal";

export function ProfileDetails() {
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
  const [isNextOfKinOpen, setIsNextOfKinOpen] = useState(false);
  const { user } = useAuthStore((state) => state);

  const {
    initials,
    first_name,
    last_name,
    email,
    phone_number,
    residential_address,
    country,
    next_of_kin,
  } = user || {};
  const {
    email: next_email,
    first_name: next_first_name,
    last_name: next_last_name,
    phone_number: next_phone_number,
    residential_address: next_residential_adress,
    relationship: next_relationship,
  } = next_of_kin || {};

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardContent className="flex items-center justify-between pt-4 ">
          <div className="flex items-center gap-4">
            <Avatar className="md:size-16 size-14">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="md:text-xl text-base font-semibold">
                Amori Ademakinwa
              </h2>
              <p className="md:text-sm  text-xs text-muted-foreground">
                @Makinwa234
              </p>
            </div>
          </div>
          <Button>Upload Photo</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-border border-b">
          <div>
            <CardTitle>Basic Information</CardTitle>
            <p className="text-sm text-muted-foreground mt-2 w-[90%]">
              This is the information you provided when creating your account,
              along with the option to edit.
            </p>
          </div>
          <Button
            variant="defaultOutline"
            onClick={() => setIsBasicInfoOpen(true)}
          >
            Edit details
          </Button>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Detail label="First Name" text={first_name} />
          <Detail label="Last Name" text={last_name} />
          <Detail label="Email Address" text={email} />
          <Detail label="Residential Address" text={residential_address} />
          <Detail label="Nationality" text={country} />
          <Detail label="Phone Number" text={phone_number} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-border border-b">
          <div>
            <CardTitle>Next of Kin Information</CardTitle>
            <p className="text-sm text-muted-foreground mt-2 w-[90%]">
              This section contains information regarding your next of kin.
            </p>
          </div>
          <Button
            variant="defaultOutline"
            onClick={() => setIsNextOfKinOpen(true)}
          >
            Edit details
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Detail label="First Name" text={next_first_name} />
          <Detail label="Last Name" text={next_last_name} />
          <Detail label="Email Address" text={next_email} />
          <Detail label="Residential Address" text={next_residential_adress} />
          <Detail label="Relationship" text={next_relationship} />
          <Detail label="Phone Number" text={next_phone_number} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <div className="space-y-4">
            <div className="w-full">
              <h3 className="font-medium">Your UZEL Tag</h3>
              <p className="text-sm text-muted-foreground mt-2 w-full">
                Put in your unique information to set up your UZEL Tag and get
                access to our in-app transactions between UZEL users.
              </p>
            </div>
            <div className="flex w-full gap-4">
              <Input className="md:w-80" placeholder="Write here" />
            </div>
            <div className="!ml-auto">
              <Button className="bg-primary ml-auto">Set UZEL tag</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BasicInfoModal
        open={isBasicInfoOpen}
        onOpenChange={setIsBasicInfoOpen}
      />
      {/* <NextOfKinModal open={isNextOfKinOpen} onOpenChange={setIsNextOfKinOpen} /> */}
    </div>
  );
}

const Detail = ({ label, text }: { label: string; text: string }) => {
  return (
    <div>
      <label className="font-medium text-sm">{label}</label>
      <p className="text-muted-foreground text-sm">{text ? text : "nil"}</p>
    </div>
  );
};
