"use client";
import Image from "next/image";
import Logo from "../../../public/UZEL.svg";
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
import {
  resendCodeAPI,
  verifyAccountLoginAPI,
  verifyEmailAPI,
} from "@/api/endpoints/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/use-auth-store";
import { useResendOtp } from "@/utils/resend-otp";
import Spinner from "@/components/ui/spinner";
import { saveToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

const verificationSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type VerificationData = z.infer<typeof verificationSchema>;

const RESEND_TIMEOUT = 60;

export default function EmailVerification() {
  const router = useRouter();
  const { email } = useAuthStore((state) => state.user);

  const form = useForm<VerificationData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailAPI,
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
      toast.success("Account verified successfully");
      router.push("/app");
      saveToken(data?.data?.data?.access_token);
    },
    onError: (error: any) => {
      console.error("Error verifying otp:", error);
      const errorData = error?.data?.data;
      if (errorData && typeof errorData === "object") {
        // Loop through each field in the error object and show the message
        Object.values(errorData).forEach((errorMessage) => {
          if (typeof errorMessage === "string") {
            toast.error(errorMessage);
          }
        });
      } else if (!errorData) {
        toast.error(error?.data?.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const onSubmit = (data: VerificationData) => {
    console.log(data);
    const { email } = useAuthStore.getState().user;
    if (email) {
      mutate({ ...data, email });
    }

    // Handle OTP verification
  };

  const { isResending, timer, handleResendOtp } = useResendOtp(
    resendCodeAPI,
    email,
    false
  );

  console.log("Email", email);

  return (
    <div className="">
      <div className="lg:pt-10 lg:px-20">
        <Image src={Logo} className="" alt="" />
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
                  <FormItem className="flex justify-center items-center flex-col w-full">
                    <FormLabel className="sr-only">One-time password</FormLabel>
                    <FormControl className="flex justify-center items-center">
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup className="space-x-3">
                          <InputOTPSlot index={0}/>
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
                disabled={isResending || isPending}
                className="w-full bg-[#6139E7] hover:bg-[#6139E7] text-white"
              >
                {isPending ? <Spinner /> : "Verify your email"}
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <Button
              variant="link"
              onClick={handleResendOtp}
              disabled={isResending || timer > 0}
            >
              {timer > 0
                ? `Resend Code in ${timer}s`
                : isResending
                ? "Resending..."
                : "Resend Code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
