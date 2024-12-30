"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
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
import { Account, PaymentFormData } from "@/interfaces/payments";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePaymentStore } from "@/store/use-paymanet-store";

const accounts: Account[] = [
  { type: "NGN account", balance: "N50,000", currency: "NGN" },
  { type: "CAD account", balance: "$2000", currency: "CAD" },
  { type: "GBP account", balance: "0", currency: "GBP" },
  { type: "USD account", balance: "$0", currency: "USD" },
];

export function OTPModal() {
  const router = useRouter();
  const { setOtpModal, otpModal, setSuccess } = usePaymentStore(
    (state) => state
  );
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });
  const [localpayment, setLocalPayment] = useQueryState(
    "local_payment",
    parseAsBoolean.withDefault(false)
  );

  const onSubmit = (data: any) => {
    console.log(data);

    setSuccess(true);
    setOtpModal(false);
    // Handle OTP verification
  };

  return (
    <Dialog open={otpModal} onOpenChange={setOtpModal}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="py-3">
          <DialogTitle className="text-center">Input OTP</DialogTitle>
          <div>
            <div className="border-dashed border-t border-primary100 my-4" />
          </div>
          <p className="text-xs text-center text-muted-foreground">
            To authenticate your request, please input the OTP sent to the email
            you used during registration (amo****@gmail.com) to complete your
            request.
          </p>
        </DialogHeader>

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
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#6139E7] hover:bg-[#6139E7] text-white"
            >
              Proceed
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
