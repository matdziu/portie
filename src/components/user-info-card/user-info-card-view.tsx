"use client";

import { BriefcaseBusiness, MapPin, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { UserInfoCardViewProps } from "./models/user-info-card-view-props";

export default function UserInfoCardView({
  fullName,
  imageUrl,
  location,
  position,
  description,
}: UserInfoCardViewProps) {
  return (
    <div className="flex flex-col w-full items-start justify-start">
      <div className="flex flex-row md:flex-col">
        <div className="w-25 h-25 md:w-38 md:h-38 flex-shrink-0">
          {imageUrl ? (
            <Image
              width={200}
              height={200}
              className="rounded-full w-full h-full object-cover"
              src={imageUrl}
              alt=""
            />
          ) : (
            <UserCircle2 className="rounded-full w-full h-full" />
          )}
        </div>
        <div className="flex flex-col px-4 md:px-0">
          <h1 className="mt-0 md:mt-4 font-extrabold text-3xl">{fullName}</h1>
          <div>
            <p className="flex mt-4 text-sm items-center text-start">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span>{location}</span>
            </p>
            <p className="flex mt-2 text-sm items-center text-start">
              <BriefcaseBusiness size={16} className="mr-2 flex-shrink-0" />
              <span>{position}</span>
            </p>
          </div>
        </div>
      </div>
      {description && <p className="mt-8 text-lg">{description}</p>}
    </div>
  );
}
