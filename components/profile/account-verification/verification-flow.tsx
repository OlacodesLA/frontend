"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DocumentUploadDialog } from "./document-upload-dialog";
import { VerificationSuccess } from "./verification-success";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/use-auth-store";
import { useQueryState } from "nuqs";

const userInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  email: z.string().email("Invalid email address"),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  occupation: z.string().min(2, "Occupation must be at least 2 characters"),
  gender: z.string().min(1, "Gender is required"),
  // uzelTag: z.string().min(3, "UZEL tag must be at least 3 characters"),
});

type UserInfoSchema = z.infer<typeof userInfoSchema>;

type Step = "consent" | "document-type" | "document-upload";

export function VerificationFlow() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isPersonalInfoComplete, setIsPersonalInfoComplete] = useState(false);

  const [step, setStep] = useQueryState("flow", {
    defaultValue: "",
  });
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleNext = (currentStep: Step) => {
    switch (currentStep) {
      case "consent":
        setStep("document-type");
        break;
      case "document-type":
        setStep("document-upload");
        break;
      case "document-upload":
        setStep(null);
        setIsSuccessOpen(true);
        break;
    }
  };

  const { user } = useAuthStore((state) => state);

  const {
    initials,
    first_name,
    last_name,
    email,
    phone_number,
    residential_address,
    country,
  } = user;

  const form = useForm<UserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      nationality: "",
      address: "",
      phoneNumber: "",
      occupation: "",
      gender: "",
      // uzelTag: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: first_name,
        lastName: last_name,
        email: email,
        dateOfBirth: "",
        nationality: country,
        address: residential_address,
        phoneNumber: phone_number,
        occupation: "",
        gender: "",
        // uzelTag: "",
      });
    }
  }, [user, form]);

  function onSubmit(data: UserInfoSchema) {
    console.log(data);
    setIsPersonalInfoComplete(true);
  }

  const handleUploadComplete = () => {
    setIsUploadDialogOpen(false);
    setIsSuccessDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 divide-y-2 divide-primary-light border-2 border-primary-light rounded-md">
      <div className="grid md:grid-cols-2 w-full divide-x-2 divide-primary-light">
        <div className="flex justify-between w-full flex-col space-y-6 p-4">
          <div className="flex items-center gap-4 px-4">
            <Avatar className="md:size-12 size-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm">{form.getValues("email")}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">UZEL Tag</span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-red-500 border-red-200 bg-red-100">
                  Not Verified
                </span>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Document Verification</h2>
          {!isPersonalInfoComplete ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Note: To proceed with document verification, you will have to
                fill out your identity/personal information.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Verification of documents</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Please upload a colored photo or scanned image of your
                  International Passport, National ID or Driver's License.
                </p>
                <Button
                  className="w-full mt-4"
                  onClick={() => setStep("consent")}
                >
                  Upload Document
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2  divide-x-2 divide-primary-light">
        <div className="space-y-4 p-4 h-56">
          <div className="w-full">
            <h3 className="font-medium">Set Your UZEL Tag</h3>
            <p className="text-sm text-muted-foreground mt-2 w-full">
              Put in your unique Information to set up your UZEL Tag and get
              access to our in app transactions between UZEL users.
            </p>
          </div>
          <div className="flex w-full gap-4">
            <Input className="md:w-80" placeholder="Write here" />
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </div>
        <div className="space-y-4 p-4 md:h-56">
          <h2 className="text-lg font-semibold">Security</h2>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">
                  Two-step verification
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Receiving codes via Email
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <DocumentUploadDialog
        // step={step}
        handleNext={handleNext}
        setIsSuccessOpen={setIsSuccessOpen}
      />

      <VerificationSuccess
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
      />
    </div>
  );
}
