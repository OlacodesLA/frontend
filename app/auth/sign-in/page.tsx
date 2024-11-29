"use client";
import logo from "../../../public/UZEL.svg";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    console.log(data);
    // Handle login
  };

  return (
    <div className="flex min-h-screen">
      <div className=" flex flex-1 items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="">
            <h1 className="text-2xl font-bold">Welcome Back, Makinwa!</h1>
            <p className="text-[16px] text-[#4F5E71]">
              Please provide the following information to continue with your
              account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    placeholder="Email address"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
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
            <Button
              type="submit"
              className="w-full bg-[#6139E7] hover:bg-purple-700"
            >
              Sign in
            </Button>
          </form>
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/auth/sign-up" className="text-[#6139E7] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex  bg-[#D3C9FD] p-10 w-[40%]">
        <div className="">
          <Image src={logo} className="" alt="" />
          <p className="mt-2 text-lg">
            Welcome to the future of <br />
            multi-currency transactions
          </p>
        </div>
      </div>
    </div>
  );
}
