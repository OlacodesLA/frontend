"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BasicInfoModal } from "../modal";
// import { NextOfKinModal } from "./next-of-kin-modal";

export function ProfileDetails() {
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
  const [isNextOfKinOpen, setIsNextOfKinOpen] = useState(false);

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
          <Detail label="First Name" text="Ademakinwa" />
          <Detail label="Last Name" text="Ademakinwa" />
          <Detail label="Email Address" text="amoriademakinwa@gmail.com" />
          <Detail
            label="Residential Address"
            text="12, Makinwa street, Lekki, Lagos, Nigeria."
          />
          <Detail label="Nationality" text="Nigerian" />
          <Detail label="Phone Number" text="+234 916 0345 054" />
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
          <Detail label="First Name" text="Ademakinwa" />
          <Detail label="Last Name" text="Ademakinwa" />
          <Detail label="Email Address" text="amoriademakinwa@gmail.com" />
          <Detail
            label="Residential Address"
            text="12, Makinwa street, Lekki, Lagos, Nigeria."
          />
          <Detail label="Relationship" text="Mother" />
          <Detail label="Phone Number" text="+234 916 0345 054" />
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
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
};
