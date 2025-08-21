import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Text,
  XAxis,
  YAxis,
} from "recharts";
import SkillsChartViewProps from "./models/skills-chart-view-props";

export default function SkillsChartView({ data }: SkillsChartViewProps) {
  const barSize = 15;
  const barGap = 15;
  const containerHeight = data.length * (barSize + barGap);

  const [yAxisWidth, setYAxisWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const hiddenTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hiddenTextRef.current) return;
    const computedStyle = window.getComputedStyle(hiddenTextRef.current);
    const fontFamily = computedStyle.getPropertyValue("font-family");
    const fontSize = computedStyle.getPropertyValue("font-size");
    const font = `${fontSize} ${fontFamily}`;

    let maxWidth = 0;
    data.forEach((item) => {
      const textWidth = measureTextWidth(item.skillName, font);
      if (textWidth > maxWidth) {
        maxWidth = textWidth;
      }
    });

    const parsedFontSize = parseFloat(fontSize);
    const yAxisCorrection = isNaN(parsedFontSize) ? 50.0 : parsedFontSize;
    setYAxisWidth(maxWidth + yAxisCorrection);
  }, [data]);

  return (
    <>
      {/* Hidden element to get the correct font size from Tailwind */}
      <span
        ref={hiddenTextRef}
        className="text-xs"
        style={{
          position: "absolute",
          top: -9999,
          left: -9999,
          visibility: "hidden",
        }}
      >
        {
          data.reduce((a, b) =>
            a.skillName.length > b.skillName.length ? a : b
          ).skillName
        }
      </span>

      <ResponsiveContainer
        width="100%"
        height={containerHeight}
        onResize={(width) => setContainerWidth(width)}
      >
        <BarChart
          data={data}
          layout="vertical"
          barGap={barGap}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          className="cursor-pointer"
        >
          {/* Used for intercepting clicks and showing a pointer cursor */}
          <Rectangle
            x={0}
            y={0}
            width={containerWidth}
            height={containerHeight}
            fill="transparent"
            className="cursor-pointer"
          />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            dataKey="skillName"
            type="category"
            tickLine={false}
            axisLine={false}
            width={yAxisWidth}
            className="cursor-pointer"
            tick={<SkillAxisTick />}
          />
          <Bar
            dataKey="value"
            fill="var(--primary)"
            className="cursor-pointer"
            barSize={barSize}
            radius={[0, 10, 10, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

// Using this function to make enough space for the longest skill name
const measureTextWidth = (text: string, font: string): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

const SkillAxisTick = ({
  x,
  y,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) => {
  return (
    <Text
      x={x}
      y={y}
      dx={-5}
      dy={5}
      fill="var(--foreground)"
      textAnchor="end"
      className="text-xs"
    >
      {payload?.value}
    </Text>
  );
};
