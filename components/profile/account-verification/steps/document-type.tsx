"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const documentTypeSchema = z.object({
  documentType: z.enum(["passport", "national-id", "drivers-license"], {
    required_error: "Please select a document type",
  }),
});

interface DocumentTypeStepProps {
  onNext: () => void;
}

export function DocumentTypeStep({ onNext }: DocumentTypeStepProps) {
  const form = useForm<z.infer<typeof documentTypeSchema>>({
    resolver: zodResolver(documentTypeSchema),
  });

  function onSubmit(data: z.infer<typeof documentTypeSchema>) {
    onNext();
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base font-semibold">
                  Choose your document Type
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="passport"
                        checked={field.value === "passport"}
                        onCheckedChange={() => field.onChange("passport")}
                      />
                      <label
                        htmlFor="passport"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        International Passport
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="national-id"
                        checked={field.value === "national-id"}
                        onCheckedChange={() => field.onChange("national-id")}
                      />
                      <label
                        htmlFor="national-id"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        National ID
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="drivers-license"
                        checked={field.value === "drivers-license"}
                        onCheckedChange={() =>
                          field.onChange("drivers-license")
                        }
                      />
                      <label
                        htmlFor="drivers-license"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Drivers License
                      </label>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
