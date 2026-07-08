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

type Props = {
  search: string;
  setSearch: (value: string) => void;
  segment: string;
  setSegment: (value: string) => void;
};

const CustomerFilters = ({
  search,
  setSearch,
  segment,
  setSegment,
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
        placeholder="Search..."
        startAdornment={
          <SearchIcon sx={{ mr: 1, color: "#9CA3AF" }} />
        }
        sx={{
          width: 280,
          borderRadius: "12px",
        }}
      />

      <FormControl sx={{ minWidth: 170 }}>
        <InputLabel>Segment</InputLabel>

        <Select
          value={segment}
          label="Segment"
          onChange={(e) => setSegment(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Bireysel">Bireysel</MenuItem>
          <MenuItem value="Kurumsal">Kurumsal</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        startIcon={<RefreshOutlinedIcon />}
        onClick={() => {
          setSearch("");
          setSegment("All");
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