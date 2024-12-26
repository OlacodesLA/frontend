import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AccountVerification() {
  return (
    <Card className="mb-6 bg-primary-light shadow-none">
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
  );
}
