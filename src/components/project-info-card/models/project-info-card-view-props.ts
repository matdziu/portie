import { SkillData } from "@/components/skills-chart/models/skills-chart-view-props";

export default interface ProjectInfoCardViewProps {
  name: string;
  description: string;
  label: string;
  imageUrl: string;
  skillData: SkillData[];
}
