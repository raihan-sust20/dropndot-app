"use client";

import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { saveAs } from "file-saver";

interface Client {
  name: string;
  address: string;
  date: string;
  email: string;
  cell: string;
  comments: string;
}

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

const clientList: Client[] = [
  {
    name: "John Doe",
    address: "123 Main Street, New York, NY",
    date: "2025-10-01",
    email: "john.doe@example.com",
    cell: "+1 212-555-0147",
    comments: "Long-term client, prefers monthly reports.",
  },
  {
    name: "Emily Carter",
    address: "456 Oak Avenue, Los Angeles, CA",
    date: "2025-09-25",
    email: "emily.carter@example.com",
    cell: "+1 310-555-0923",
    comments: "Requested a product demo next week.",
  },
  {
    name: "Michael Brown",
    address: "789 Pine Road, Chicago, IL",
    date: "2025-09-10",
    email: "michael.brown@example.com",
    cell: "+1 773-555-6752",
    comments: "Interested in enterprise plan upgrade.",
  },
  {
    name: "Sophia Lee",
    address: "321 Maple Lane, Houston, TX",
    date: "2025-08-30",
    email: "sophia.lee@example.com",
    cell: "+1 832-555-4290",
    comments: "Follow-up required regarding invoice issue.",
  },
  {
    name: "David Wilson",
    address: "654 Cedar Court, Seattle, WA",
    date: "2025-08-18",
    email: "david.wilson@example.com",
    cell: "+1 206-555-8712",
    comments: "Provided feedback on recent updates.",
  },
];


export default function ClientsPage() {
  const theme = useTheme();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Client>("name");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // const response = await fetch("/api/clients"); // ✅ replace with your backend endpoint
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 5000))
        setClients(clientList);
      } catch (err: any) {
        console.error("Failed to fetch clients:", err);
        setError("Failed to fetch client data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleSort = (property: keyof Client) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedClients = [...clients].sort(getComparator(order, orderBy));

  // ✅ CSV Download Handler
  // const handleDownloadCSV = () => {
  //   const headers = "Client Name,Address,Date,Email,Cell,Comments\n";
  //   const rows = clients
  //     .map(
  //       (c) =>
  //         `${c.name},${c.address},${c.date},${c.email},${c.cell},${c.comments}`
  //     )
  //     .join("\n");
  
  //   const csvContent = headers + rows;
  
  //   // Create CSV blob
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const url = URL.createObjectURL(blob);
  
  //   // Use an invisible link via React instead of raw DOM
  //   const tempLink = document.createElement("a");
  //   tempLink.href = url;
  //   tempLink.download = "clients.csv";
  //   tempLink.click();
  
  //   // Clean up blob URL
  //   URL.revokeObjectURL(url);
  // };

  const handleDownloadCSV = () => {
    const headers = "Client Name,Address,Date,Email,Cell,Comments\n";
    const rows = clients
      .map(
        (c) =>
          `${c.name},${c.address},${c.date},${c.email},${c.cell},${c.comments}`
      )
      .join("\n");
  
    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    saveAs(blob, "clients.csv"); // ✅ automatically triggers download
  };
  

  return (
    <Box
      sx={{
        p: 3, // padding: 24px
        backgroundColor: "white",
        minHeight: "100vh",
        borderRadius: 3,
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
        onClick={handleDownloadCSV}
        disabled={loading || !!error}
      >
        Download CSV
      </Button>

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {!loading && error && (
        <Typography color="error" textAlign="center" mt={4}>
          {error}
        </Typography>
      )}

      {/* Table */}
      {!loading && !error && (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(114, 158, 90, 0.2)"}}>
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
      )}
    </Box>
  );
}
