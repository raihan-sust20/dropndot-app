"use client";

import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface Client {
  name: string;
  address: string;
  date: string;
  email: string;
  cell: string;
  comments: string;
}

// Sample data
const clients: Client[] = [
  {
    name: "John Doe",
    address: "123 Main St",
    date: "2025-10-01",
    email: "john@example.com",
    cell: "123-456-7890",
    comments: "Important client",
  },
  {
    name: "Jane Smith",
    address: "456 Elm St",
    date: "2025-09-15",
    email: "jane@example.com",
    cell: "987-654-3210",
    comments: "",
  },
  // Add more sample rows as needed
];

// Utility to sort rows
type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function ClientsPage() {
  const theme = useTheme();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Client>("name");

  const handleSort = (property: keyof Client) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedClients = [...clients].sort(getComparator(order, orderBy));

  return (
    <Box
      sx={{
        p: 3, // padding: 24px
        backgroundColor: "white",
        minHeight: "100vh",
      }}
    >
      {/* Download CSV Button */}
      <Button
        variant="outlined"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: "black",
          mb: 2,
          textTransform: "none",
        }}
        endIcon={<UploadIcon />}
      >
        Download CSV
      </Button>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(114, 158, 90, 0.2)",
              }}
            >
              {[
                { id: "name", label: "Client Name" },
                { id: "address", label: "Address" },
                { id: "date", label: "Date" },
                { id: "email", label: "Email" },
                { id: "cell", label: "Cell" },
                { id: "comments", label: "Comments" },
              ].map((col) => (
                <TableCell
                  key={col.id}
                  sortDirection={orderBy === col.id ? order : false}
                  sx={{
                    fontWeight: 600,
                    borderBottom: "none",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : "asc"}
                    onClick={() => handleSort(col.id as keyof Client)}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "black !important",
                      },
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {sortedClients.map((client, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#F9F9F9" : "#FFFFFF",
                  borderRadius: "12px",
                  "& td": {
                    borderBottom: "none",
                    borderRight: "1px solid #ccc",
                  },
                  "& td:last-of-type": {
                    borderRight: "none",
                  },
                }}
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.date}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.cell}</TableCell>
                <TableCell>{client.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
