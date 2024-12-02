"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/use-auth-store";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";

const Detail = ({ label, text }: { label: string; text: string }) => {
  return (
    <div>
      <label className="font-medium text-sm">{label}</label>
      <p className="text-muted-foreground text-sm">{text ? text : "nil"}</p>
    </div>
  );
};

export function AccountVerification() {
  const { user } = useAuthStore((state) => state);

  const {
    first_name,
    last_name,
    email,
    phone_number,
    residential_address,
    country,
  } = user || {};

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardContent className="flex md:flex-row flex-col items-center justify-between pt-4 ">
          <div className="flex items-center gap-4">
            <div className="md:size-20 md:text-xl  size-16 shrink-0 bg-gradient-to-b from-[#AC93FF] to-[#6139E7] border-[#D0C4F8] border-4 rounded-full bg-primary/10 flex items-center text-white justify-center">
              40%
            </div>
            <div>
              <h2 className="font-semibold">Account Verification Program</h2>
              <p className="md:text-sm text-xs text-muted-foreground max-w-2xl">
                Drop and fill your files to help us with your account
                verification. Kindly check your mail to complete your account
                verification.
              </p>
            </div>
          </div>
          <Link
            href="/app/profile/account-verification"
            className="md:ml-0 ml-auto"
          >
            <Button className="">Continue</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-border border-b">
          <div>
            <CardTitle>Basic Information</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Provide the following information in order to process your account
              verification.
            </p>
          </div>
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
            <CardTitle>Verification Document</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Submit and upload one of the documents below to verify your
              identity.
            </p>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 ">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Drag and drop your files here or click to browse
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-primary">Continue</Button>
      </div>
    </div>
  );
}
