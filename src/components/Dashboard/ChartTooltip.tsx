import type { ReactNode } from "react";
import { Box } from "@mui/material";

interface ChartTooltipProps {
  left: number | string;
  top: number | string;
  children: ReactNode;
}

const ChartTooltip = ({ left, top, children }: ChartTooltipProps) => (
  <Box
    sx={{
      position: "absolute",
      left,
      top,
      transform: "translate(-50%, -100%)",
      backgroundColor: "#111827",
      color: "#fff",
      borderRadius: "8px",
      px: 1.5,
      py: 1,
      fontSize: 12,
      lineHeight: 1.5,
      pointerEvents: "none",
      whiteSpace: "nowrap",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 10,
    }}
  >
    {children}
  </Box>
);

export default ChartTooltip;
