"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function VerifyEmailView() {
  const screenTranslations = useTranslations("VerifyEmail");
  const commonTranslations = useTranslations("Common");

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full md:w-[400px]">
        <CardHeader className="flex flex-col justify-center">
          <CardTitle className="w-full flex flex-col justify-center items-center text-center text-2xl">
            <Image
              src="/logo-extended.png"
              width={250}
              height={75}
              className="mb-4"
              alt=""
            />
            {screenTranslations("title")}
          </CardTitle>
          <CardDescription className="w-full justify-center text-center text-xl">
            {screenTranslations("body")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div></div>
        </CardContent>
        <CardFooter className="w-full flex items-center justify-center">
          <Link className="hover:underline" href={"/"}>{commonTranslations("portieLink")}</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
