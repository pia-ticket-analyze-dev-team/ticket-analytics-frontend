import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

const RISK_LEVEL_LABELS: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

type Props = {
  search: string;
  setSearch: (value: string) => void;
  segment: string;
  setSegment: (value: string) => void;
  riskLevel: string;
  setRiskLevel: (value: string) => void;
  segmentOptions: string[];
  riskLevelOptions: string[];
};

const ChurnFilters = ({
  search,
  setSearch,
  segment,
  setSegment,
  riskLevel,
  setRiskLevel,
  segmentOptions,
  riskLevelOptions,
}: Props) => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        bgcolor: "#FFFFFF",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <OutlinedInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search customer..."
        startAdornment={<SearchIcon sx={{ mr: 1, color: "#9CA3AF" }} />}
        sx={{
          width: 280,
          borderRadius: "12px",
        }}
      />

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Segment</InputLabel>

        <Select
          value={segment}
          label="Segment"
          onChange={(e) => setSegment(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {segmentOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Risk Level</InputLabel>

        <Select
          value={riskLevel}
          label="Risk Level"
          onChange={(e) => setRiskLevel(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {riskLevelOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {RISK_LEVEL_LABELS[option] ?? option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        startIcon={<RefreshOutlinedIcon />}
        onClick={() => {
          setSearch("");
          setSegment("All");
          setRiskLevel("All");
        }}
        sx={{
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default ChurnFilters;