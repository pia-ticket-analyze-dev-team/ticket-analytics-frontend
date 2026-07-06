import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ChartTooltip from "./ChartTooltip";

interface BarDatum {
  label: string;
  value: number;
}

interface HorizontalBarChartProps {
  data: BarDatum[];
  color?: string;
  showAxis?: boolean;
  labelWidth?: number;
}

const WIDTH = 460;
const ROW_HEIGHT = 36;
const BAR_HEIGHT = 18;
const RADIUS = 4;
const RIGHT_PAD = 56;
const AXIS_HEIGHT = 22;
const GRID_COLOR = "#e1e0d9";
const MUTED = "#898781";

const roundedBarPath = (x0: number, y0: number, width: number, height: number, radius: number) => {
  const r = Math.min(radius, width / 2, height / 2);
  if (r <= 0) return `M ${x0} ${y0} H ${x0 + width} V ${y0 + height} H ${x0} Z`;
  const x1 = x0 + width;
  return `M ${x0} ${y0} H ${x1 - r} Q ${x1} ${y0} ${x1} ${y0 + r} V ${y0 + height - r} Q ${x1} ${y0 + height} ${x1 - r} ${y0 + height} H ${x0} Z`;
};

const HorizontalBarChart = ({
  data,
  color = "#2a78d6",
  showAxis = false,
  labelWidth = 90,
}: HorizontalBarChartProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const plotWidth = WIDTH - labelWidth - RIGHT_PAD;
  const height = data.length * ROW_HEIGHT + (showAxis ? AXIS_HEIGHT : 4);
  const niceMax = Math.ceil(Math.max(...data.map((d) => d.value)) / 2000) * 2000;
  const gridSteps = [0, 0.25, 0.5, 0.75, 1];

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;
  const hoveredY = hoverIndex !== null ? hoverIndex * ROW_HEIGHT + ROW_HEIGHT / 2 : 0;
  const hoveredBarWidth = hovered ? (hovered.value / niceMax) * plotWidth : 0;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        width="100%"
        height={height}
        style={{ display: "block", overflow: "visible" }}
      >
        {showAxis &&
          gridSteps.map((frac) => {
            const x = labelWidth + frac * plotWidth;
            return (
              <line
                key={frac}
                x1={x}
                x2={x}
                y1={0}
                y2={data.length * ROW_HEIGHT}
                stroke={GRID_COLOR}
                strokeWidth={1}
              />
            );
          })}

        {data.map((d, i) => {
          const barWidth = (d.value / niceMax) * plotWidth;
          const y = i * ROW_HEIGHT + (ROW_HEIGHT - BAR_HEIGHT) / 2;
          const x0 = labelWidth;

          return (
            <g
              key={d.label}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <rect
                x={0}
                y={i * ROW_HEIGHT}
                width={WIDTH}
                height={ROW_HEIGHT}
                fill="transparent"
              />
              <text
                x={x0 - 10}
                y={i * ROW_HEIGHT + ROW_HEIGHT / 2 + 4}
                fontSize={12}
                fill="#374151"
                textAnchor="end"
              >
                {d.label.length > 24 ? `${d.label.slice(0, 23)}…` : d.label}
              </text>
              <path
                d={roundedBarPath(x0, y, Math.max(barWidth, 2), BAR_HEIGHT, RADIUS)}
                fill={color}
                opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.55}
                style={{ transition: "opacity 0.15s ease" }}
              />
              <text
                x={x0 + barWidth + 8}
                y={i * ROW_HEIGHT + ROW_HEIGHT / 2 + 4}
                fontSize={12}
                fontWeight={600}
                fill="#111827"
              >
                {d.value.toLocaleString()}
              </text>
            </g>
          );
        })}

        {showAxis && (
          <g>
            {gridSteps.map((frac) => (
              <text
                key={frac}
                x={labelWidth + frac * plotWidth}
                y={data.length * ROW_HEIGHT + 16}
                fontSize={11}
                fill={MUTED}
                textAnchor="middle"
              >
                {frac === 0 ? "0" : `${(niceMax * frac) / 1000}K`}
              </text>
            ))}
          </g>
        )}
      </svg>

      {hovered && (
        <ChartTooltip
          left={`${((labelWidth + hoveredBarWidth / 2) / WIDTH) * 100}%`}
          top={`${(hoveredY / height) * 100}%`}
        >
          <Typography sx={{ fontSize: 11, color: "#D1D5DB" }}>{hovered.label}</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
            {hovered.value.toLocaleString()}
          </Typography>
        </ChartTooltip>
      )}
    </Box>
  );
};

export default HorizontalBarChart;
