"use client";

import { BriefcaseBusiness, MapPin } from "lucide-react";
import Image from "next/image";

export default function UserInfoCardView() {
  return (
    <div className="flex flex-col w-full items-start justify-start ps-8 pt-16 pb-4 pe-0">
      <div className="flex flex-row md:flex-col">
        <div className="w-25 h-25 md:w-38 md:h-38 flex-shrink-0">
          <Image
            width={200}
            height={200}
            className="rounded-full"
            src="https://media.licdn.com/dms/image/v2/C4E03AQGIv2Z4ZFMdHg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1653907478892?e=2147483647&v=beta&t=1sSt7zIsuDs3_HhQsVaOPSWz3gwPRO2JMf110pVbid8"
            alt=""
          />
        </div>
        <div className="flex flex-col px-4 md:px-0">
          <h1 className="mt-0 md:mt-4 font-extrabold text-3xl">
            Mateusz Dziubek
          </h1>
          <div>
            <p className="flex mt-4 text-sm items-center text-start">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span>Cracow, Poland</span>
            </p>
            <p className="flex mt-2 text-sm items-center text-start">
              <BriefcaseBusiness size={16} className="mr-2 flex-shrink-0" />
              <span>Senior Software Engineer at Paramount</span>
            </p>
          </div>
        </div>
      </div>
      <p className="mt-8 text-lg">
        Senior software engineer with acute product sense, business knowledge
        and AI skills.
      </p>
    </div>
  );
}
