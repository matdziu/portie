export default interface SkillsChartViewProps {
  data: SkillData[];
}

export type SkillData = {
  skillName: string;
  value: number;
};
