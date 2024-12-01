"use client";
import logo from "../../../public/UZEL.svg";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { loginAPI, resendCodeAPI } from "@/api/endpoints/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useResendOtp } from "@/utils/resend-otp";
import { getProfileAPI } from "@/api/endpoints/profile";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const { user, setUser } = useAuthStore((state) => state);
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { isResending, timer, handleResendOtp } = useResendOtp(
    resendCodeAPI,
    form.getValues("email"),
    true
  );

  const { mutate, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: async (data) => {
      console.log("User logged in successfully:", data);
    },
    onError: async (error: any) => {
      toast.dismiss();
      console.error("Error logging in user:", error);
      const errorData = error?.data?.data;
      if (errorData && typeof errorData === "object") {
        // Loop through each field in the error object and show the message
        Object.values(errorData).forEach((errorMessage) => {
          if (typeof errorMessage === "string") {
            toast.error(errorMessage);
          }
        });
      } else if (!errorData) {
        if (error?.data?.message == "email not verified") {
          setUser({ ...user, email: form.getValues("email") });
          handleResendOtp();
          router.push("/auth/verify-otp");
        } else {
          toast.error(error?.data?.message);
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const onSubmit = async (data: LoginData) => {
    console.log(data);
    toast.loading("Validating credentials");
    // Handle login
    mutate(data);
  };
  // console.log("Errors", formState.);

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-5 w-full">
                      <FormControl>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Email address"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="mt-6 text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-5 w-full">
                      <FormControl>
                        <div>
                          <Label htmlFor="password">Password</Label>

                          <Input
                            {...field}
                            id="password"
                            type="password"
                            className=""
                            placeholder="Enter Password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="mt-6 text-xs md:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#6139E7] hover:bg-purple-700"
              >
                {isPending ? <Spinner /> : "Sign in"}
              </Button>
            </form>
          </Form>
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
