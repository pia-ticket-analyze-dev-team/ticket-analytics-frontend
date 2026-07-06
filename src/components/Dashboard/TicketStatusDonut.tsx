import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ticketStatusBreakdown } from "../../data/mockDashboard";
import ChartTooltip from "./ChartTooltip";

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 78;
const STROKE = 30;
const GAP = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const total = ticketStatusBreakdown.reduce((sum, s) => sum + s.value, 0);

const { segments } = ticketStatusBreakdown.reduce<{
  cumulative: number;
  segments: Array<(typeof ticketStatusBreakdown)[number] & {
    index: number;
    dasharray: string;
    dashoffset: number;
    percentage: number;
    midAngle: number;
  }>;
}>(
  (acc, slice, i) => {
    const rawLen = (slice.value / total) * CIRCUMFERENCE;
    const segmentLen = Math.max(rawLen - GAP, 0);

    return {
      cumulative: acc.cumulative + rawLen,
      segments: [
        ...acc.segments,
        {
          ...slice,
          index: i,
          dasharray: `${segmentLen} ${CIRCUMFERENCE - segmentLen}`,
          dashoffset: -acc.cumulative - GAP / 2,
          percentage: (slice.value / total) * 100,
          midAngle: ((acc.cumulative + rawLen / 2) / CIRCUMFERENCE) * 360 - 90,
        },
      ],
    };
  },
  { cumulative: 0, segments: [] }
);

const TicketStatusDonut = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const hovered = hoverIndex !== null ? segments[hoverIndex] : null;
  const tooltipX = hovered
    ? CENTER + (RADIUS + STROKE / 2) * Math.cos((hovered.midAngle * Math.PI) / 180)
    : 0;
  const tooltipY = hovered
    ? CENTER + (RADIUS + STROKE / 2) * Math.sin((hovered.midAngle * Math.PI) / 180)
    : 0;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
      <Box sx={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {segments.map((seg) => (
            <circle
              key={seg.label}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={seg.color}
              strokeWidth={hoverIndex === seg.index ? STROKE + 4 : STROKE}
              strokeDasharray={seg.dasharray}
              strokeDashoffset={seg.dashoffset}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
              style={{ transition: "stroke-width 0.15s ease", cursor: "pointer" }}
              onMouseEnter={() => setHoverIndex(seg.index)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}

          <text
            x={CENTER}
            y={CENTER - 6}
            textAnchor="middle"
            fontSize={22}
            fontWeight={700}
            fill="#111827"
          >
            {total.toLocaleString()}
          </text>
          <text x={CENTER} y={CENTER + 16} textAnchor="middle" fontSize={12} fill="#9CA3AF">
            Total
          </text>
        </svg>

        {hovered && (
          <ChartTooltip left={`${(tooltipX / SIZE) * 100}%`} top={`${(tooltipY / SIZE) * 100}%`}>
            <Typography sx={{ fontSize: 11, color: "#D1D5DB" }}>{hovered.label}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
              {hovered.value.toLocaleString()} ({hovered.percentage.toFixed(1)}%)
            </Typography>
          </ChartTooltip>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, minWidth: 0 }}>
        {segments.map((seg) => (
          <Box key={seg.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: seg.color,
                flexShrink: 0,
              }}
            />
            <Typography sx={{ fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>
              {seg.label}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" }}>
              {seg.value.toLocaleString()} ({seg.percentage.toFixed(1)}%)
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TicketStatusDonut;
