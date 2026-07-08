import { Box, Typography } from "@mui/material";

const UnauthorizedPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">
        403 - Unauthorized
      </Typography>
    </Box>
  );
};

export default UnauthorizedPage;