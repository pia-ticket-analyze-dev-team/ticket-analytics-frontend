import { Box, Typography } from "@mui/material";

const WIDTH = 240;
const HEIGHT = 130;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT - 10;
const RADIUS = 92;
const STROKE = 16;

const TRACK_COLOR = "#e1e0d9";
const FILL_COLOR = "#ec835a";

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

interface SlaBreachGaugeProps {
  value: number;
}

// A breach rate at or above this is already alarming, so it anchors the
// gauge's full scale. Rounding the ceiling to just above the value (e.g.
// value 14 -> max 15) made the arc read as "almost full" for any input —
// this keeps real headroom instead, growing past the base only when the
// rate is bad enough to need it, with a 25% margin so it never pins near 100%.
const BASE_MAX = 20;

const SlaBreachGauge = ({ value }: SlaBreachGaugeProps) => {
  const max = value <= BASE_MAX ? BASE_MAX : Math.ceil((value * 1.25) / 5) * 5;
  const ratio = Math.min(value / max, 1);

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
        {value.toFixed(2)}%
      </Typography>

      <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>Last 30 days</Typography>
    </Box>
  );
};

export default SlaBreachGauge;
