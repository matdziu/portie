"use client";

import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PictureUploadInputViewProps } from "./models/picture-upload-input-view-props";

export default function PictureUploadInputView({
  initialImage,
  onImageChange,
}: PictureUploadInputViewProps) {
  const [preview, setPreview] = useState<string | undefined>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const allowedTypes = ["image/jpeg", "image/png"];

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  const handleFileChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
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
      handleFileChange(file);
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
          if (file) handleFileChange(file);
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