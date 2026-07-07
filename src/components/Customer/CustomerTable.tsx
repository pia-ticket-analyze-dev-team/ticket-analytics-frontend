import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useNavigate } from "react-router-dom";

const customers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "532 123 45 67",
    segment: "Bireysel",
    city: "İstanbul",
    tickets: 5,
    createdAt: "12.06.2024",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    email: "ayse@example.com",
    phone: "535 987 65 43",
    segment: "Kurumsal",
    city: "Ankara",
    tickets: 3,
    createdAt: "08.06.2024",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "531 456 78 90",
    segment: "Bireysel",
    city: "İzmir",
    tickets: 8,
    createdAt: "05.06.2024",
  },
  {
    id: 4,
    name: "Fatma Şahin",
    email: "fatma@example.com",
    phone: "530 456 22 11",
    segment: "Kurumsal",
    city: "Bursa",
    tickets: 2,
    createdAt: "02.06.2024",
  },
  {
    id: 5,
    name: "Ali Çelik",
    email: "ali@example.com",
    phone: "533 654 98 77",
    segment: "Bireysel",
    city: "Antalya",
    tickets: 7,
    createdAt: "30.05.2024",
  },
];

type CustomerTableProps = {
  search: string;
  segment: string;
  city: string;
};

const CustomerTable = ({
  search,
  segment,
  city,
}: CustomerTableProps) => {
  const navigate = useNavigate();

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesSegment =
      segment === "All" || customer.segment === segment;

    const matchesCity =
      city === "All" || customer.city === city;

    return matchesSearch && matchesSegment && matchesCity;
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: "20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F8FAFC",
            }}
          >
            <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Segment</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Ticket Count</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>

            <TableCell
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.segment}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.tickets}</TableCell>
              <TableCell>{customer.createdAt}</TableCell>

              <TableCell align="center">
                <IconButton
                  size="small"
                  onClick={() => navigate(`/customers/${customer.id}`)}
                >
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() =>
                    navigate(`/customers/${customer.id}/edit`)
                  }
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
