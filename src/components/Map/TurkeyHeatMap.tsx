import { Box, Paper, Typography } from "@mui/material";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import turkeyGeo from "../../assets/maps/tr-cities.json";
import { cityData } from "./dummyData";

const cityMap = Object.fromEntries(
  cityData.map((city) => [city.city, city])
);

const getColor = (value: number) => {
  if (value >= 100) return "#2463FF";
  if (value >= 70) return "#5B8CFF";
  if (value >= 40) return "#9FC2FF";
  return "#DCEBFF";
};

const TurkeyHeatMap = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        p: 3,
        height: 650,
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Ticket Density by Province
      </Typography>

      <Box
        sx={{
          height: "calc(100% - 52px)",
          bgcolor: "#F9FAFB",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[39, 35]}
          zoom={5.5}
          zoomSnap={0}
          zoomDelta={0.1}
          attributionControl={false}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          style={{
            width: "100%",
            height: "100%",
            background: "#F9FAFB",
          }}
        >
          <GeoJSON
            data={turkeyGeo as any}
            style={(feature) => {
              const city =
                feature?.properties?.name ||
                feature?.properties?.NAME_1 ||
                "";

              return {
                fillColor: getColor(cityMap[city]?.tickets ?? 0),
                fillOpacity: 1,
                color: "#FFFFFF",
                weight: 1,
              };
            }}
            onEachFeature={(feature, layer) => {
              const city =
                feature.properties?.name ||
                feature.properties?.NAME_1;

              const info = cityMap[city];

              const tickets = info?.tickets ?? 0;
              const resolution = info?.avgResolution ?? "N/A";

              layer.bindTooltip(
                `
                  <div style="padding:4px">
                    <strong style="font-size:14px">${city}</strong>
                    <br/>
                    🎫 Tickets: ${tickets}
                    <br/>
                    ⏱ Avg Resolution: ${resolution}
                  </div>
                `,
                {
                  direction: "top",
                  offset: L.point(0, -10),
                  opacity: 1,
                }
              );

              layer.on({
                mouseover: (e) => {
                  e.target.setStyle({
                    weight: 2,
                    color: "#1E40AF",
                  });
                },

                mouseout: (e) => {
                  e.target.setStyle({
                    weight: 1,
                    color: "#FFFFFF",
                  });
                },
              });
            }}
          />
        </MapContainer>
      </Box>
    </Paper>
  );
};

export default TurkeyHeatMap;