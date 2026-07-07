import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { niceAxisMax } from "../../utils/chartScale";
import ChartTooltip from "./ChartTooltip";

interface BarDatum {
  label: string;
  value: number;
}

interface VerticalBarChartProps {
  data: BarDatum[];
  color?: string;
}

const WIDTH = 460;
const HEIGHT = 220;
const PAD_TOP = 28;
const PAD_BOTTOM = 26;
const BAR_WIDTH = 24;
const RADIUS = 4;

const roundedColumnPath = (x0: number, y0: number, width: number, height: number, radius: number) => {
  const r = Math.min(radius, width / 2, height / 2);
  const y1 = y0 + height;
  if (r <= 0) return `M ${x0} ${y0} H ${x0 + width} V ${y1} H ${x0} Z`;
  return `M ${x0} ${y0 + r} Q ${x0} ${y0} ${x0 + r} ${y0} H ${x0 + width - r} Q ${x0 + width} ${y0} ${x0 + width} ${y0 + r} V ${y1} H ${x0} Z`;
};

const VerticalBarChart = ({ data, color = "#6da7ec" }: VerticalBarChartProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const niceMax = niceAxisMax(Math.max(...data.map((d) => d.value)));
  const colWidth = WIDTH / data.length;

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;
  const hoveredX = hoverIndex !== null ? hoverIndex * colWidth + colWidth / 2 : 0;
  const hoveredBarHeight = hovered ? (hovered.value / niceMax) * plotHeight : 0;
  const hoveredTopY = PAD_TOP + (plotHeight - hoveredBarHeight);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height={HEIGHT}
        style={{ display: "block", overflow: "visible" }}
      >
        <line
          x1={0}
          x2={WIDTH}
          y1={PAD_TOP + plotHeight}
          y2={PAD_TOP + plotHeight}
          stroke="#c3c2b7"
          strokeWidth={1}
        />

        {data.map((d, i) => {
          const barHeight = (d.value / niceMax) * plotHeight;
          const cx = i * colWidth + colWidth / 2;
          const x0 = cx - BAR_WIDTH / 2;
          const y0 = PAD_TOP + (plotHeight - barHeight);

          return (
            <g
              key={d.label}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <rect x={i * colWidth} y={0} width={colWidth} height={HEIGHT} fill="transparent" />

              <text x={cx} y={y0 - 8} fontSize={12} fontWeight={600} fill="#111827" textAnchor="middle">
                {d.value.toLocaleString()}
              </text>

              <path
                d={roundedColumnPath(x0, y0, BAR_WIDTH, barHeight, RADIUS)}
                fill={color}
                opacity={hoverIndex === null || hoverIndex === i ? 1 : 0.55}
                style={{ transition: "opacity 0.15s ease" }}
              />

              <text
                x={cx}
                y={PAD_TOP + plotHeight + 18}
                fontSize={11}
                fill="#6B7280"
                textAnchor="middle"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered && (
        <ChartTooltip
          left={`${(hoveredX / WIDTH) * 100}%`}
          top={`${(hoveredTopY / HEIGHT) * 100}%`}
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

export default VerticalBarChart;
