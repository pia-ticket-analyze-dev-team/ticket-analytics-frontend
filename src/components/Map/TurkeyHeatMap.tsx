import { Box, Paper, Typography } from "@mui/material";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import turkeyGeo from "../../assets/maps/tr-cities.json";
import type { TopCity } from "../../types/regionalInsights";

type TurkeyHeatMapProps = {
  topCities: TopCity[];
};

// GeoJSON province names use proper Turkish "İ" (U+0130), but the backend
// returns ASCII "I" (e.g. "Istanbul", "Izmir") — normalize both sides so the
// lookup isn't broken by that mismatch.
const normalizeCityName = (name: string) => name.replace(/İ/g, "I").replace(/ı/g, "i");

const getColor = (value: number, maxValue: number) => {
  if (maxValue <= 0) return "#DCEBFF";
  const ratio = value / maxValue;
  if (ratio >= 0.66) return "#2463FF";
  if (ratio >= 0.33) return "#5B8CFF";
  if (ratio > 0) return "#9FC2FF";
  return "#DCEBFF";
};

const TurkeyHeatMap = ({ topCities }: TurkeyHeatMapProps) => {
  const cityMap = Object.fromEntries(
    topCities.map((city) => [normalizeCityName(city.cityName), city])
  );
  const maxTicketCount = Math.max(0, ...topCities.map((city) => city.ticketCount));

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
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          zoomControl={true}
          style={{
            width: "100%",
            height: "100%",
            background: "#F9FAFB",
          }}
        >
          <GeoJSON
            data={turkeyGeo as any}
            style={(feature) => {
              const city = normalizeCityName(
                feature?.properties?.name ||
                feature?.properties?.NAME_1 ||
                ""
              );

              return {
                fillColor: getColor(cityMap[city]?.ticketCount ?? 0, maxTicketCount),
                fillOpacity: 1,
                color: "#FFFFFF",
                weight: 1,
              };
            }}
            onEachFeature={(feature, layer) => {
              const displayName =
                feature.properties?.name ||
                feature.properties?.NAME_1 ||
                "";

              const info = cityMap[normalizeCityName(displayName)];

              layer.bindTooltip(
                `
                  <div style="padding:4px">
                    <strong style="font-size:14px">${displayName}</strong>
                    <br/>
                    🎫 Tickets: ${info?.ticketCount ?? 0}
                    <br/>
                    ⏱ Avg Resolution: ${info ? `${info.avgResolutionTimeHours.toFixed(1)} h` : "N/A"}
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
