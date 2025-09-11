"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { HomeViewProps } from "./models/home-view-props";

export default function HomeView({ isLoggedIn }: HomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-top w-screen p-8">
      <h1 className="font-bold text-6xl text-center w-full lg:w-1/2">
        Create a <span className="underline-primary">portfolio</span>
        <br />
        that gets you a <span className="underline-primary">job</span>
      </h1>
      <Button className="mt-12">
        <a
          href="https://www.portie.me/p/matt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <ExternalLink />
          <p className="text-">Check out a sample portfolio</p>
        </a>
      </Button>
      <p className="mt-10 text-center text-xl font-semibold w-full lg:w-1/2">
        Showcase your projects and skills in a clear, compelling way that
        recruiters, clients, and even non-technical people can instantly
        understand.
      </p>
      <Image
        width={2164}
        height={1614}
        className="mt-10 w-full md:w-1/2 flex-shrink-0"
        src="/sample-portfolio-laptop.png"
        priority={true}
        alt=""
      />
      <div className="flex flex-col mt-10 items-center justify-center">
        <h2 className="text-2xl font-bold text-center">THE PROBLEM:</h2>
        <div className="text-xl text-start w-full lg:w-3/4 mt-5">
          You&apos;ve built amazing things...but:
          <ul className="flex flex-col gap-2 mt-5 text-start list-disc pl-5">
            <li>your GitHub is designed for engineers, not recruiters,</li>
            <li>
              your repos are filled with technical details, not a clear,
              compelling story about what you&apos;ve accomplished,
            </li>
            <li>
              Linktree is great for links, but it doesn&apos;t do your projects
              justice,
            </li>
            <li>LinkedIn projects section just sucks,</li>
            <li>
              you need a way to go beyond code and show the world what
              you&apos;re truly capable of.
            </li>
          </ul>
        </div>
        <div className="mt-10">
          {isLoggedIn ? (
            <Button asChild>
              <Link href="/dashboard/manage-content">Go to dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/sign-in">Create account</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-15 mt-15">
        <Image
          width={3201}
          height={4000}
          className="w-3/4 md:w-1/4 flex-shrink-0"
          src="/sample-portfolio-mobile.png"
          priority={true}
          alt=""
        />
        <div className="flex flex-col w-full lg:w-lg">
          <h2 className="text-2xl font-bold text-center md:text-start underline-primary">
            THE SOLUTION:
          </h2>
          <div className="text-xl text-start w-full lg:w-3/4 mt-5">
            Introducing{" "}
            <span className="font-extrabold underline-primary">Portie</span>,
            the fast and simple portfolio builder for developers.
            <br />
            <br />
            Quickly create a stunning, single-page website that highlights your
            top projects, the technologies you used, and how to contact you.
            With our visual technology bar charts, you can show off your tech
            stack in a way that’s easy for anyone to read.
            <ul className="flex flex-col gap-2 mt-5 text-start list-disc pl-5">
              <li>
                <span className="font-extrabold">Go beyond links</span> -
                showcase your projects, not just their links.
              </li>
              <li>
                <span className="font-extrabold">Visually impressive</span> -
                represent your skills with clean, readable charts.
              </li>
              <li>
                <span className="font-extrabold">Built for recruiters</span> -
                make it effortless for hiring managers to see your value.
              </li>
              <li>
                <span className="font-extrabold">Launch in minutes</span> - our
                simple creator gets you a live portfolio in no time.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button className="mt-12">
        <a
          href="https://www.portie.me/p/matt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <ExternalLink />
          <p className="text-">Check out a sample portfolio</p>
        </a>
      </Button>
    </div>
  );
}
