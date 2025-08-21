export default interface SkillsChartViewProps {
  data: SkillData[];
  clickable: boolean;
}

export type SkillData = {
  skillName: string;
  value: number;
};
