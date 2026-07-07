import {
  Paper,
  Typography,
  List,
  ListItem,
  Box,
  Chip,
} from "@mui/material";

import { cityData } from "./dummyData";

const TopCitiesCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Top 5 Cities
      </Typography>

      <List disablePadding>
        {cityData.map((city, index) => (
          <ListItem
            key={city.city}
            disablePadding
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                #{index + 1} {city.city}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6B7280",
                  mt: .3,
                }}
              >
                {city.tickets} Tickets
              </Typography>
            </Box>

            <Chip
              label={city.avgResolution}
              size="small"
              sx={{
                bgcolor: "#EEF4FF",
                color: "#2463FF",
                fontWeight: 600,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopCitiesCard;