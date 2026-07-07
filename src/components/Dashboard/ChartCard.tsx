import type { ReactNode } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface ChartCardProps {
  title: string;
  rangeOptions?: string[];
  children: ReactNode;
}

const ChartCard = ({ title, rangeOptions, children }: ChartCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{title}</Typography>

        {rangeOptions && (
          <Select
            size="small"
            defaultValue={rangeOptions[0]}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: 13,
              borderRadius: "8px",
              "& .MuiSelect-select": { py: 0.5, pl: 1.25 },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
            }}
          >
            {rangeOptions.map((option) => (
              <MenuItem key={option} value={option} sx={{ fontSize: 13 }}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>

      <Box sx={{ position: "relative", minWidth: 0, flexGrow: 1 }}>{children}</Box>
    </Box>
  );
};

export default ChartCard;
