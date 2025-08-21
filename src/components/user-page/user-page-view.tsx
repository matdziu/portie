"use client";

import BuiltWithPortieButtonView from "../built-with-portie-button/built-with-portie-button-view";
import ProjectInfoCardView from "../project-info-card/project-info-card-view";
import UserInfoCardView from "../user-info-card/user-info-card-view";
import UserLinksView from "../user-links/user-links-view";

export default function UserPageView() {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full md:w-1/4 md:overflow-y-scroll no-scrollbar px-4 md:px-8 pt-11 pb-16">
        <UserInfoCardView />
        <div className="mt-8 mb-4 hidden md:flex items-start">
          <UserLinksView />
        </div>
      </div>

      <div className="flex flex-wrap content-start w-full md:w-3/4 h-full items-start gap-4 px-4 pb-16 pt-2 md:pt-11 md:overflow-y-scroll">
        <ProjectInfoCardView
          name="Boardly"
          description="Android app used by 3000+ users to find people to play board games together."
          label="side project"
          imageUrl="https://play-lh.googleusercontent.com/RLRI2HQ6Gc4ISGPrnoa3WBgVZ6gWxBpBFUcHrTC6QtWZUEIgvYBV0WSdJWtyjMThfaU=w240-h480-rw"
          skillData={[
            { skillName: "Android", value: 100 },
            { skillName: "Jetpack Compose", value: 50 },
            { skillName: "Firebase", value: 50 },
            { skillName: "Scrum", value: 80 },
            { skillName: "Kotlin", value: 80 },
            { skillName: "Java", value: 80 },
            { skillName: "Booo", value: 80 },
          ]}
        />
        <ProjectInfoCardView
          name="Boardly"
          description="Android app used by 3000+ users to find people to play board games together."
          label="side project"
          imageUrl="https://play-lh.googleusercontent.com/RLRI2HQ6Gc4ISGPrnoa3WBgVZ6gWxBpBFUcHrTC6QtWZUEIgvYBV0WSdJWtyjMThfaU=w240-h480-rw"
          skillData={[
            { skillName: "NextJS", value: 100 },
            { skillName: "Typescript", value: 50 },
            { skillName: "Tailwind", value: 50 },
            { skillName: "Komunikacja", value: 50 },
          ]}
          topLinkUrl="https://www.google.com/"
          bottomLinkUrl="https://www.x.com/"
        />
        <ProjectInfoCardView
          name="Boardly"
          description="Android app used by 3000+ users to find people to play board games together."
          label="side project"
          imageUrl="https://play-lh.googleusercontent.com/RLRI2HQ6Gc4ISGPrnoa3WBgVZ6gWxBpBFUcHrTC6QtWZUEIgvYBV0WSdJWtyjMThfaU=w240-h480-rw"
          skillData={[
            { skillName: "NextJS", value: 100 },
            { skillName: "Typescript", value: 50 },
            { skillName: "Tailwind", value: 50 },
            { skillName: "Komunikacja", value: 50 },
          ]}
          topLinkUrl="https://www.google.com/"
          bottomLinkUrl="https://www.x.com/"
        />
        <div className="flex w-full pt-8 pb-20 items-center justify-center md:hidden">
          <UserLinksView />
        </div>
      </div>
      <div className="fixed bottom-6 left-6 z-50">
        <BuiltWithPortieButtonView />
      </div>
    </div>
  );
}
