"use client";

import { Box, Typography, Stack } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme: Theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        marginLeft: "267px",
        px: theme.spacing(6), // 48px horizontal padding
        py: theme.spacing(4), // 32px vertical padding
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: theme.palette.common.white,
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        marginRight: theme.spacing(4),
      }}
    >
      {/* Left side */}
      <Typography
        sx={{
          color: theme.palette.text.primary, // black
          fontSize: theme.typography.pxToRem(16), // ~16px
          fontWeight: theme.typography.fontWeightRegular,
        }}
      >
        Copyright @ Realseo.digital 2023
      </Typography>

      {/* Right side */}
      <Stack direction="row" spacing={8}>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.fontWeightRegular,
            cursor: "pointer",
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.fontWeightRegular,
            cursor: "pointer",
          }}
        >
          Privacy Policy
        </Typography>
      </Stack>
    </Box>
  );
}
