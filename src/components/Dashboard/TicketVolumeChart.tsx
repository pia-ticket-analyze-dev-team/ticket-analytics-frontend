import { useRef, useState, type MouseEvent } from "react";
import { Box, Typography } from "@mui/material";
import { ticketVolumeSeries } from "../../data/mockDashboard";
import ChartTooltip from "./ChartTooltip";

const WIDTH = 600;
const HEIGHT = 230;
const PAD_LEFT = 40;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

const PLOT_WIDTH = WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = HEIGHT - PAD_TOP - PAD_BOTTOM;

const LINE_COLOR = "#2a78d6";
const AREA_COLOR = "rgba(42, 120, 214, 0.1)";
const GRID_COLOR = "#e1e0d9";
const MUTED = "#898781";

const niceMax = Math.ceil(Math.max(...ticketVolumeSeries.map((p) => p.value)) / 2000) * 2000;
const gridSteps = [0, 0.25, 0.5, 0.75, 1];

const xScale = (i: number) =>
  PAD_LEFT + (i / (ticketVolumeSeries.length - 1)) * PLOT_WIDTH;
const yScale = (v: number) => PAD_TOP + (1 - v / niceMax) * PLOT_HEIGHT;

const formatK = (v: number) => (v === 0 ? "0" : `${v / 1000}K`);

const TicketVolumeChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const points = ticketVolumeSeries.map((p, i) => ({ x: xScale(i), y: yScale(p.value), ...p }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_TOP + PLOT_HEIGHT} L ${points[0].x} ${PAD_TOP + PLOT_HEIGHT} Z`;

  const handleMove = (e: MouseEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const ratio = (svgX - PAD_LEFT) / PLOT_WIDTH;
    const index = Math.round(ratio * (ticketVolumeSeries.length - 1));
    setHoverIndex(Math.min(Math.max(index, 0), ticketVolumeSeries.length - 1));
  };

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height={HEIGHT}
        preserveAspectRatio="none"
        style={{ display: "block", overflow: "visible" }}
      >
        {gridSteps.map((frac) => {
          const y = PAD_TOP + (1 - frac) * PLOT_HEIGHT;
          return (
            <g key={frac}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke={GRID_COLOR}
                strokeWidth={1}
              />
              <text x={PAD_LEFT - 8} y={y + 4} fontSize={11} fill={MUTED} textAnchor="end">
                {formatK(niceMax * frac)}
              </text>
            </g>
          );
        })}

        {ticketVolumeSeries.map((p, i) =>
          i % 2 === 0 ? (
            <text
              key={p.label}
              x={xScale(i)}
              y={HEIGHT - 6}
              fontSize={11}
              fill={MUTED}
              textAnchor="middle"
            >
              {p.label}
            </text>
          ) : null
        )}

        <path d={areaPath} fill={AREA_COLOR} stroke="none" />
        <path d={linePath} fill="none" stroke={LINE_COLOR} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {points.map((p, i) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r={hoverIndex === i ? 5 : 3}
            fill={LINE_COLOR}
            stroke="#fff"
            strokeWidth={2}
          />
        ))}

        {hovered && (
          <line
            x1={hovered.x}
            x2={hovered.x}
            y1={PAD_TOP}
            y2={PAD_TOP + PLOT_HEIGHT}
            stroke={GRID_COLOR}
            strokeWidth={1}
          />
        )}

        <rect
          x={PAD_LEFT}
          y={PAD_TOP}
          width={PLOT_WIDTH}
          height={PLOT_HEIGHT}
          fill="transparent"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        />
      </svg>

      {hovered && (
        <ChartTooltip
          left={`${(hovered.x / WIDTH) * 100}%`}
          top={`${(hovered.y / HEIGHT) * 100}%`}
        >
          <Typography sx={{ fontSize: 11, color: "#D1D5DB" }}>{hovered.label}</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
            {hovered.value.toLocaleString()} tickets
          </Typography>
        </ChartTooltip>
      )}
    </Box>
  );
};

export default TicketVolumeChart;
