"use client";
import Image from "next/image";
import Logo from "../../../public/UZEL.svg";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const verificationSchema = z.object({
  email: z.string(),
});

type VerificationData = z.infer<typeof verificationSchema>;

export default function EmailVerification() {
  const [isResending, setIsResending] = useState(false);
  const form = useForm<VerificationData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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
        <Image src={Logo} className="" alt="" />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Forgot account password</h1>
            <p className="text-sm text-gray-600">
              Confirm your email address is correct and press the button to
              proceed
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      className="bg-[#FBFBFB]"
                      placeholder="Email address"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-[#6139E7] hover:bg-[#6139E7] text-white"
              >
                Send Password Reset Link
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
