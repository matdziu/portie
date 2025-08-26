-- CreateTable
CREATE TABLE "public"."UserDb" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserDb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPageDb" (
    "id" TEXT NOT NULL,
    "pageName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "personalWebsiteLink" TEXT,
    "githubLink" TEXT,
    "linkedInLink" TEXT,
    "mediumLink" TEXT,
    "twitterLink" TEXT,
    "youtubeLink" TEXT,
    "instagramLink" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPageDb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDb_email_key" ON "public"."UserDb"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPageDb_pageName_key" ON "public"."UserPageDb"("pageName");

-- CreateIndex
CREATE UNIQUE INDEX "UserPageDb_userId_key" ON "public"."UserPageDb"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserPageDb" ADD CONSTRAINT "UserPageDb_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."UserDb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
