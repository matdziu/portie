import Image from "next/image";
import ProjectInfoCardViewProps from "./models/project-info-card-view-props";

export default function ProjectInfoCardView({
  name,
  description,
  label,
  imageUrl,
}: ProjectInfoCardViewProps) {
  return (
    <div className="flex flex-col p-4 bg-card text-card-foreground rounded-md border shadow-sm w-full md:w-lg">
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
          <p className="flex-shrink-0 text-xs text-center font-extrabold bg-primary text-primary-foreground rounded-lg px-2">
            {label}
          </p>
        </div>
      </div>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
}
