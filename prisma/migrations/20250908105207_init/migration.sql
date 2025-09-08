-- CreateTable
CREATE TABLE "public"."ProjectSkillDb" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "userProjectId" TEXT NOT NULL,

    CONSTRAINT "ProjectSkillDb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserDb" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "annualPassExpiry" TIMESTAMP(3),
    "stripeCustomerId" TEXT,
    "lastCheckoutSessionId" TEXT,

    CONSTRAINT "UserDb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPageDb" (
    "id" TEXT NOT NULL,
    "pageName" TEXT NOT NULL,
    "pictureUrl" TEXT,
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

-- CreateTable
CREATE TABLE "public"."UserProjectDb" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pictureUrl" TEXT,
    "description" TEXT,
    "label" TEXT,
    "topLink" TEXT,
    "bottomLink" TEXT,
    "displayOrder" INTEGER NOT NULL,
    "userPageId" TEXT NOT NULL,

    CONSTRAINT "UserProjectDb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDb_email_key" ON "public"."UserDb"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDb_lastCheckoutSessionId_key" ON "public"."UserDb"("lastCheckoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPageDb_pageName_key" ON "public"."UserPageDb"("pageName");

-- CreateIndex
CREATE UNIQUE INDEX "UserPageDb_userId_key" ON "public"."UserPageDb"("userId");

-- AddForeignKey
ALTER TABLE "public"."ProjectSkillDb" ADD CONSTRAINT "ProjectSkillDb_userProjectId_fkey" FOREIGN KEY ("userProjectId") REFERENCES "public"."UserProjectDb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPageDb" ADD CONSTRAINT "UserPageDb_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."UserDb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProjectDb" ADD CONSTRAINT "UserProjectDb_userPageId_fkey" FOREIGN KEY ("userPageId") REFERENCES "public"."UserPageDb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
