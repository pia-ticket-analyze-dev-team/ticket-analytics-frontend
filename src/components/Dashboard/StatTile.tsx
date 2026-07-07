import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { StatTileData } from "../../data/mockDashboard";

const GOOD_COLOR = "#0ca30c";
const BAD_COLOR = "#d03b3b";

interface StatTileProps {
  tile: StatTileData;
}

const StatTile = ({ tile }: StatTileProps) => {
  const isUp = tile.delta.trim().startsWith("+");
  const color = tile.deltaGood ? GOOD_COLOR : BAD_COLOR;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          color: "#6B7280",
          fontWeight: 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {tile.label}
      </Typography>

      <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
        {tile.value}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        {isUp ? (
          <ArrowUpwardIcon sx={{ fontSize: 15, color }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15, color }} />
        )}

        <Typography sx={{ fontSize: 13, fontWeight: 600, color }}>{tile.delta}</Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "#9CA3AF",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tile.comparisonLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatTile;
