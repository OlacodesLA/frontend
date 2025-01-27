"use client";
import Image from "next/image";
import logo from "../../../public/UZEL.svg";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "@/api/endpoints/auth";
import ReactQueryProvider from "@/query/react-query-provider";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";

const registrationSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    country: z.string().min(1, "Country is required"),
    phone_number: z.string().min(10, "Invalid phone number"),
    residential_address: z.string().min(5, "Residential address is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),

    // dob: z.date().refine((date) => {
    //   const today = new Date();
    //   const birthDate = new Date(date);
    //   let age = today.getFullYear() - birthDate.getFullYear();
    //   const monthDiff = today.getMonth() - birthDate.getMonth();
    //   if (
    //     monthDiff < 0 ||
    //     (monthDiff === 0 && today.getDate() < birthDate.getDate())
    //   ) {
    //     age = age - 1;
    //   }
    //   return age >= 18;
    // }, "You must be at least 18 years old"),
    dob: z.date(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegistrationData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerAPI,
    onSuccess: (data) => {
      toast.dismiss();
      console.log("User registered successfully:", data);
      toast.success("User registered successfully");
      const userData = data?.data?.data;
      if (userData) {
        const setUser = useAuthStore.getState().setUser;
        setUser(userData); // Store user data in Zustand
        setTimeout(() => {
          router.push("/auth/verify-email");
        }, 500);
      }
    },
    onError: (error: any) => {
      toast.dismiss();
      console.error("Error registering user:", error);
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

  const onSubmit = async ({
    dob,
    confirm_password,
    ...rest
  }: RegistrationData) => {
    const formattedDob = dob ? format(dob, "yyyy-MM-dd") : "";
    // Combine the formatted DOB with the rest of the data
    const finalData = {
      ...rest,
      dob: formattedDob,
    };
    // console.log("Final Date", finalData);

    // Trigger the mutation (POST request)
    toast.loading("Validating credentials");
    mutate(finalData);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="md:w-[60%] max-w-md space-y-8">
          <div className="text-center">
            <h1 className="md:text-2xl text-xl font-bold">
              Create your account
            </h1>
            <p className="md:text-sm text-[14px] text-gray-600">
              Please provide the following information to set up your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="first_name"
                      placeholder="First name"
                      className="bg-[#FBFBFB]"
                    />
                  )}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field}
                      id="last_name"
                      placeholder="Last name"
                      className="bg-[#FBFBFB]" />
                  )}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>
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

            <div>
              <Label htmlFor="country">Country</Label>
              <Controller
                name="country"
                control={control}
                
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="phone_number"
                    placeholder="+1 234 567 8900"
                    className="bg-[#FBFBFB]"
                  />
                )}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="residential_address">Residential Address</Label>
              <Controller
                name="residential_address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="residential_address"
                    placeholder="Enter a location"
                    className="bg-[#FBFBFB]"
                  />
                )}
              />
              {errors.residential_address && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.residential_address.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                          }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.dob && (
                <p className="text-red-500 text-[14px] mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">Password</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="bg-[#FBFBFB]"
                    />
                  )}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="confirm_password"
                      type="password"
                      placeholder="Confirm Password"
                      className="bg-[#FBFBFB]"
                    />
                  )}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-[14px] mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#6139E7] hover:bg-[#6139E7]"
            >
              {isPending ? <Spinner /> : " Create account"}
            </Button>
          </form>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/auth/sign-in" className="text-purple-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex  bg-[#D3C9FD] p-10 w-[40%]">
        <div className="pt-5">
          <Image src={logo} className="" alt="" />
          <p className="mt-2 text-lg leading-[30px]">
            Welcome to the future of <br />
            multi-currency transactions
          </p>
        </div>
      </div>
    </div>
  );
}
