import { Box, Divider, Paper, Typography } from "@mui/material";

import type { Customer } from "../customer.types";

type CustomerInfoCardProps = {
  customer: Customer;
};

const CustomerInfoCard = ({ customer }: CustomerInfoCardProps) => {
  const info = [
    {
      label: "Name",
      value: `${customer.firstName} ${customer.lastName}`,
    },
    {
      label: "Email",
      value: customer.email,
    },
    {
      label: "Phone",
      value: customer.phone,
    },
    {
      label: "Segment",
      value: customer.segment,
    },
    {
      label: "Address",
      value: customer.address,
    },
    {
      label: "Birthdate",
      value: customer.birthdate ?? "-",
    },
    {
      label: "Registration Date",
      value: customer.createdAt,
    },
    {
      label: "Customer ID",
      value: customer.id,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        minHeight: 330,
        border: "1px solid #E5E7EB",
        borderRadius: "20px",
        p: 3.5,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1F2937",
          mb: 3,
        }}
      >
        Customer Information
      </Typography>

      {info.map((item, index) => (
        <Box key={item.label}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              alignItems: "center",
              py: 1.3,
              columnGap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: "#6B7280",
              }}
            >
              {item.label}
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: "#1F2937",
                textAlign: "right",
                wordBreak: "break-word",
              }}
            >
              {item.value}
            </Typography>
          </Box>

          {index !== info.length - 1 && (
            <Divider
              sx={{
                borderColor: "#F3F4F6",
              }}
            />
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default CustomerInfoCard;
