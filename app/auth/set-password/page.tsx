"use client";
import logo from "../../../public/UZEL.svg";
import Image from "next/image";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordData = z.infer<typeof passwordSchema>;

export default function PasswordSetup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordData) => {
    console.log(data);
    // Handle password setup
  };

  return (
    <div>
      <div className="lg:pt-10 lg:px-20">
        <Image src={logo}
          className=""
          alt="" />

      </div>
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Set Password</h1>
            <p className="text-sm text-gray-600">
              Please create a password for your account, which will be <br />required
              for future log in
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter Password"
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#6139E7] hover:bg-[#6139E7]"
            >
              Set password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
