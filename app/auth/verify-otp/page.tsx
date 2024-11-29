"use client";
import Image from "next/image";
import Logo from "../../../public/UZEL.svg"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const verificationSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type VerificationData = z.infer<typeof verificationSchema>;

export default function EmailVerification() {
  const [isResending, setIsResending] = useState(false);
  const form = useForm<VerificationData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: VerificationData) => {
    console.log(data);
    // Handle OTP verification
  };

  const resendCode = () => {
    setIsResending(true);
    // Implement resend logic here
    setTimeout(() => setIsResending(false), 3000);
  };

  return (
    
    <div className="">
      <div className="lg:pt-10 lg:px-20">
        <Image src={Logo}
          className=""
          alt="" />

      </div>
      <div className="flex min-h-screen items-center justify-center bg-white p-6">

        <div className="w-full max-w-md space-y-8">



          <div className="text-center">
            <h1 className="text-2xl font-bold">Enter the given OTP</h1>
            <p className="text-sm text-gray-600">
              Please enter the OTP sent to the email address you provided
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex justify-center">
                    <FormLabel className="sr-only">One-time password</FormLabel>
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup className="space-x-3">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#6139E7] hover:bg-purple-700 text-white"
              >
                Sign in into your account
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <Button variant="link" onClick={resendCode} disabled={isResending}>
              {isResending ? "Resending..." : "Resend Code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
