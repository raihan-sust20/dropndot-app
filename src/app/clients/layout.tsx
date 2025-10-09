"use client";

import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NextLink from "next/link";
import { Theme, useTheme } from "@mui/material/styles";

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: Theme = useTheme();

  return (
    <>
      {/* Breadcrumbs Section */}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2, mt: 3, mx: 3 }}
      >
        <Link
          component={NextLink}
          href="/dashboard"
          underline="none"
          color="textPrimary"
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
          }}
        >
          Dashboard
        </Link>

        <Typography
          color="primary"
          sx={{ fontWeight: theme.typography.fontWeightRegular }}
        >
          Clients
        </Typography>
      </Breadcrumbs>

      {/* Directly render page content */}
      {children}
    </>
  );
}
