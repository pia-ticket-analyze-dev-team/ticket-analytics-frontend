import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { slaBreachRate } from "../../data/mockDashboard";

const WIDTH = 240;
const HEIGHT = 130;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT - 10;
const RADIUS = 92;
const STROKE = 16;

const TRACK_COLOR = "#e1e0d9";
const FILL_COLOR = "#ec835a";
const BAD_COLOR = "#d03b3b";

const pointAt = (fraction: number) => {
  const angleDeg = 180 * (1 - fraction);
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + RADIUS * Math.cos(angleRad),
    y: CENTER_Y - RADIUS * Math.sin(angleRad),
  };
};

const arcPath = (fraction: number) => {
  const start = pointAt(0);
  const end = pointAt(fraction);
  const largeArc = fraction >= 1 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};

const SlaBreachGauge = () => {
  const ratio = Math.min(slaBreachRate.value / slaBreachRate.max, 1);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height={HEIGHT}
        style={{ display: "block", maxWidth: 260 }}
      >
        <path
          d={arcPath(1)}
          fill="none"
          stroke={TRACK_COLOR}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <path
          d={arcPath(ratio)}
          fill="none"
          stroke={FILL_COLOR}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
      </svg>

      <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#111827", mt: -1 }}>
        {slaBreachRate.value}%
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <ArrowUpwardIcon sx={{ fontSize: 14, color: BAD_COLOR }} />
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: BAD_COLOR }}>
          {slaBreachRate.delta}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
          {slaBreachRate.comparisonLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default SlaBreachGauge;
