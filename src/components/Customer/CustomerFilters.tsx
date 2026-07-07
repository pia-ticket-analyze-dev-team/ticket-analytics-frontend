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

import { useRegions } from "../../hooks/useRegions";

type Props = {
  segment: string;
  setSegment: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
};

const CustomerFilters = ({
  segment,
  setSegment,
  city,
  setCity,
}: Props) => {
  const { data: regions } = useRegions();

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
      <FormControl sx={{ minWidth: 170 }}>
        <InputLabel>Segment</InputLabel>

        <Select
          value={segment}
          label="Segment"
          onChange={(e) => setSegment(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Individual">Individual</MenuItem>
          <MenuItem value="SME">SME</MenuItem>
          <MenuItem value="Corporate">Corporate</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 170 }}>
        <InputLabel>City</InputLabel>

        <Select
          value={city}
          label="City"
          onChange={(e) => setCity(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {(regions ?? []).map((region) => (
            <MenuItem
              key={region.id}
              value={region.name}
            >
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        startIcon={<RefreshOutlinedIcon />}
        onClick={() => {
          setSegment("All");
          setCity("All");
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

export default CustomerFilters;