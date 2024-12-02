"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ConsentStep } from "./steps/consent-step";
import { DocumentTypeStep } from "./steps/document-type";
import { DocumentUploadStep } from "./steps/document-upload";
import { useQueryState } from "nuqs";

type Step = "consent" | "document-type" | "document-upload";
interface DocumentUploadDialogProps {
  // step: string;
  handleNext: (currentSte: Step) => void;
  setIsSuccessOpen: any;
}

export function DocumentUploadDialog({
  // step,
  handleNext,
  setIsSuccessOpen,
}: DocumentUploadDialogProps) {
  const [step, setStep] = useQueryState("flow", {
    defaultValue: "",
  });
  const isOpen = step !== "";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => open || setIsSuccessOpen(false) || setStep(null)}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Means of Identification
          </DialogTitle>
        </DialogHeader>

        {step === "consent" && (
          <ConsentStep onNext={() => handleNext("consent")} />
        )}

        {step === "document-type" && (
          <DocumentTypeStep onNext={() => handleNext("document-type")} />
        )}

        {step === "document-upload" && (
          <DocumentUploadStep onNext={() => handleNext("document-upload")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
