import { cn } from "@/lib/utils";
import Image from "next/image";
import SkillsChartView from "../skills-chart/skills-chart-view";
import ProjectInfoCardViewProps from "./models/project-info-card-view-props";

export default function ProjectInfoCardView({
  name,
  description,
  label,
  imageUrl,
  skillData,
  topLinkUrl,
  bottomLinkUrl,
}: ProjectInfoCardViewProps) {
  return (
    <div className="flex flex-col bg-card text-card-foreground rounded-md border shadow-sm w-full md:w-lg">
      <a
        href={topLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("flex flex-col ps-4 pe-4 pt-4 pb-2", {
          "rounded-sm transition-all hover:bg-gray-700 hover:scale-102":
            topLinkUrl,
        })}
      >
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center w-10 h-10 flex-shrink-0">
            <Image
              width={200}
              height={200}
              className="rounded-full"
              src={imageUrl}
              alt=""
            />
          </div>

          <div className="flex items-center justify-between w-full gap-1">
            <h1 className="text-lg font-semibold">{name}</h1>
            {label && (
              <p className="flex-shrink-0 text-xs text-center font-extrabold bg-primary text-primary-foreground rounded-lg px-2">
                {label}
              </p>
            )}
          </div>
        </div>
        {description && <p className="text-sm mt-2">{description}</p>}
      </a>
      <a
        href={bottomLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("w-full ps-4 pe-4 pb-2 pt-1", {
          "rounded-sm transition-all hover:bg-gray-700 hover:scale-102":
            bottomLinkUrl,
        })}
      >
        {skillData.length > 0 && (
          <SkillsChartView
            data={skillData}
            clickable={bottomLinkUrl !== undefined}
          />
        )}
      </a>
    </div>
  );
}
