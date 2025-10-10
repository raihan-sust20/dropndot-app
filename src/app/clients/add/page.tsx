"use client";

import { Box, Typography, LinearProgress } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import AddClientForm from "../../ui/components/AddClientForm";

export default function AddClientPage() {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.common.white,
        borderRadius: 3,
        mt: 3,
        p: 3,
      }}
    >
      {/* Subtitle */}
      <Typography
        variant="h6"
        sx={{ color: "black", fontWeight: theme.typography.fontWeightBold}}
      >
        Add New Client
      </Typography>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={7}
        sx={{
          mt: 3,
          height: 3,
          borderRadius: 2,
          bgcolor: "grey.300",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "primary.main",
          },
        }}
      />

    <AddClientForm />
    </Box>
  );
}
