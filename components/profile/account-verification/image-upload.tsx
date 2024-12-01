"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  label: string;
  value?: FileList;
}

export function ImageUpload({ onChange, label, value }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative
        cursor-pointer
        rounded-lg
        border-2
        border-dashed
        p-6
        transition-colors
        ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="rounded-full bg-primary/10 p-2">
          <ImageIcon className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium">
          {value?.length ? value[0].name : label}
        </p>
        <p className="text-xs text-muted-foreground">
          Drag & drop or click to upload
        </p>
      </div>
    </div>
  );
}
