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

const registrationSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  phone_number: z.string().min(10, "Invalid phone number"),
  residential_address: z.string().min(5, "Residential address is required"),
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
});

type RegistrationData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const { mutate } = useMutation({
    mutationFn: registerAPI,
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });

  const onSubmit = async ({ dob, ...rest }: RegistrationData) => {
    const formattedDob = dob ? format(dob, "dd-MM-yy") : "";
    // Combine the formatted DOB with the rest of the data
    const finalData = {
      ...rest,
      dob: formattedDob,
    };
    // console.log("Final Date", finalData);

    // Trigger the mutation (POST request)
    mutate(finalData);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-[60%] max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-gray-600">
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
                    />
                  )}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">
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
                    <Input {...field} id="last_name" placeholder="Last name" />
                  )}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">
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
                <p className="text-red-500 text-xs mt-1">
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
                  />
                )}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs mt-1">
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
                  />
                )}
              />
              {errors.residential_address && (
                <p className="text-red-500 text-xs mt-1">
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
                        className={`w-full justify-start text-left font-normal ${
                          !field.value && "text-muted-foreground"
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#6139E7] hover:bg-purple-700"
            >
              Create account
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
