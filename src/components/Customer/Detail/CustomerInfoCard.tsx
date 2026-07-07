import { Box, Divider, Paper, Typography } from "@mui/material";

const customer = {
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "532 123 45 67",
  segment: "Bireysel",
  city: "İstanbul",
  address: "Kadıköy, İstanbul, Türkiye",
  registrationDate: "12.06.2024",
  customerId: "CUST-000123",
};

const info = [
  { label: "Name", value: customer.name },
  { label: "Email", value: customer.email },
  { label: "Phone", value: customer.phone },
  { label: "Segment", value: customer.segment },
  { label: "City", value: customer.city },
  { label: "Address", value: customer.address },
  { label: "Registration Date", value: customer.registrationDate },
  { label: "Customer ID", value: customer.customerId },
];

const CustomerInfoCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 320,
        border: "1px solid #E5E7EB",
        borderRadius: "24px",
        p: 4,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 700,
          color: "#1F2937",
          mb: 4,
        }}
      >
        Customer Information
      </Typography>

      {info.map((item, index) => (
        <Box key={item.label}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "170px 1fr",
              alignItems: "center",
              py: 1.5,
              columnGap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                color: "#6B7280",
              }}
            >
              {item.label}
            </Typography>

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: "#1F2937",
                textAlign: "right",
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