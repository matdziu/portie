"use client";

import BuiltWithPortieButtonView from "../built-with-portie-button/built-with-portie-button-view";
import ProjectInfoCardView from "../project-info-card/project-info-card-view";
import UserInfoCardView from "../user-info-card/user-info-card-view";
import UserLinksView from "../user-links/user-links-view";
import { UserPageViewProps } from "./models/user-page-view-props";

export default function UserPageView({
  pageWithRelatedData,
}: UserPageViewProps) {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full md:w-1/4 md:overflow-y-scroll no-scrollbar px-4 md:px-8 pt-11 pb-10">
        <UserInfoCardView
          fullName={pageWithRelatedData.fullName}
          imageUrl={pageWithRelatedData.pictureUrl ?? undefined}
          location={pageWithRelatedData.location}
          position={pageWithRelatedData.position}
          description={pageWithRelatedData.description ?? undefined}
        />
        <div className="mt-8 mb-4 hidden md:flex items-start">
          <UserLinksView
            personalWebsiteLink={
              pageWithRelatedData.personalWebsiteLink ?? undefined
            }
            githubLink={pageWithRelatedData.githubLink ?? undefined}
            linkedInLink={pageWithRelatedData.linkedInLink ?? undefined}
            mediumLink={pageWithRelatedData.mediumLink ?? undefined}
            twitterLink={pageWithRelatedData.twitterLink ?? undefined}
            youtubeLink={pageWithRelatedData.youtubeLink ?? undefined}
            instagramLink={pageWithRelatedData.instagramLink ?? undefined}
          />
        </div>
      </div>

      <div className="flex flex-wrap content-start w-full md:w-3/4 h-full items-start gap-4 px-4 pb-16 pt-2 md:pt-11 md:overflow-y-scroll">
        {pageWithRelatedData.projects.map((project) => (
          <ProjectInfoCardView
            key={project.id}
            name={project.name}
            description={project.description ?? undefined}
            label={project.label ?? undefined}
            topLinkUrl={project.topLink ?? undefined}
            bottomLinkUrl={project.bottomLink ?? undefined}
            imageUrl={project.pictureUrl ?? undefined}
            skillData={project.skills.map((skill) => ({
              skillName: skill.name,
              value: skill.value,
            }))}
          />
        ))}
        <div className="flex w-full pt-8 pb-20 items-center justify-center md:hidden">
          <UserLinksView
            personalWebsiteLink={
              pageWithRelatedData.personalWebsiteLink ?? undefined
            }
            githubLink={pageWithRelatedData.githubLink ?? undefined}
            linkedInLink={pageWithRelatedData.linkedInLink ?? undefined}
            mediumLink={pageWithRelatedData.mediumLink ?? undefined}
            twitterLink={pageWithRelatedData.twitterLink ?? undefined}
            youtubeLink={pageWithRelatedData.youtubeLink ?? undefined}
            instagramLink={pageWithRelatedData.instagramLink ?? undefined}
          />
        </div>
      </div>
      <div className="fixed bottom-6 left-6 z-50">
        <BuiltWithPortieButtonView />
      </div>
    </div>
  );
}
