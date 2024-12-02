"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const consentSchema = z.object({
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy and data processing",
  }),
});

interface ConsentStepProps {
  onNext: () => void;
}

export function ConsentStep({ onNext }: ConsentStepProps) {
  const form = useForm<z.infer<typeof consentSchema>>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      consent: false,
    },
  });

  function onSubmit(data: z.infer<typeof consentSchema>) {
    onNext();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Let's get you verified</h2>
        <p className="text-muted-foreground">
          Prepare a valid means of identification. We also require that you
          consent to the processing of your personal data for your account
          verification.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormControl>
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <p className="text-sm text-muted-foreground">
                        By clicking the "Continue" button, I agree that I have
                        read the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>{" "}
                        and have given my consent to the processing of my
                        personal information, including biometrics, as specified
                        in this{" "}
                        <a href="#" className="text-primary hover:underline">
                          notification of processing of personal information
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
