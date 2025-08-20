import { Card } from "../ui/card";
import ProjectInfoCardViewProps from "./models/project-info-card-view-props";

export default function ProjectInfoCardView({
  name,
  description,
  imageUrl,
}: ProjectInfoCardViewProps) {
  return (
    <div className="flex flex-col p-4 bg-card text-card-foreground rounded-md border shadow-sm w-full md:w-lg">
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
