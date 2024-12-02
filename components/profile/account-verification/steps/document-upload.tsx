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
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "../image-upload";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const documentUploadSchema = z.object({
  frontImage: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  backImage: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

interface DocumentUploadStepProps {
  onNext: () => void;
}

export function DocumentUploadStep({ onNext }: DocumentUploadStepProps) {
  const form = useForm<z.infer<typeof documentUploadSchema>>({
    resolver: zodResolver(documentUploadSchema),
  });

  function onSubmit(data: z.infer<typeof documentUploadSchema>) {
    onNext();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground italic">
          Take a photo of your document. The photo should be:
        </p>
        <ul className="list-disc pl-6 text-sm text-muted-foreground">
          <li>Bright and clear</li>
          <li>Corners of the document should be visible</li>
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="frontImage"
            render={({ field: { onChange }, ...field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    onChange={(file) => {
                      const dataTransfer = new DataTransfer();
                      if (file) dataTransfer.items.add(file);
                      onChange(dataTransfer.files);
                    }}
                    label="Upload the front of your document*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backImage"
            render={({ field: { onChange }, ...field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    onChange={(file:any) => {
                      const dataTransfer = new DataTransfer();
                      if (file) dataTransfer.items.add(file);
                      onChange(dataTransfer.files);
                    }}
                    label="Upload the back of your document*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
