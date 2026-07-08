import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import MainLayout from "../../components/Layout/MainLayout";

import RegionalStats from "../../components/Map/RegionalStats";
import TurkeyHeatMap from "../../components/Map/TurkeyHeatMap";
import TopRegionsCard from "../../components/Map/TopRegionsCard";
import HeatLegend from "../../components/Map/HeatLegend";
import { useRegionalInsights } from "../../hooks/useRegionalInsights";

const RegionalInsightsPage = () => {
  const { data, loading, error } = useRegionalInsights();

  return (
    <MainLayout>
      <Typography
        sx={{
          fontSize: 36,
          fontWeight: 700,
          color: "#1F2937",
        }}
      >
        Regional Insights
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          color: "#6B7280",
          fontSize: 16,
        }}
      >
        Monitor ticket density and service performance across Türkiye.
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {!loading && error && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {!loading && !error && data && (
        <>
          <RegionalStats kpis={data.kpis} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <TurkeyHeatMap cityDensity={data.cityDensity} />
            </Grid>

            <Grid size={{ xs: 12, lg: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TopRegionsCard regions={data.regionDensity} />

                <HeatLegend />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </MainLayout>
  );
};

export default RegionalInsightsPage;
