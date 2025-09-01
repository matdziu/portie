"use client";

import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PictureUploadInputViewProps } from "./models/picture-upload-input-view-props";

export default function PictureUploadInputView({
  value,
  onValueChange,
}: PictureUploadInputViewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const allowedTypes = ["image/jpeg", "image/png"];

  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else if (typeof value === "string" && value) {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFile = (file: File) => {
    if (file) {
      onValueChange(file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && allowedTypes.includes(file.type)) {
      handleFile(file);
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 flex-shrink-0 transition-all",
        { "bg-muted": !preview },
        { "border-dashed border-primary": isDragging }
      )}
      onClick={handleDivClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={allowedTypes.join(", ")}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
        ref={fileInputRef}
      />
      {preview ? (
        <Image src={preview} alt="" fill className="object-cover" />
      ) : (
        <Camera className="h-8 w-8 text-muted-foreground" />
      )}
    </div>
  );
}
