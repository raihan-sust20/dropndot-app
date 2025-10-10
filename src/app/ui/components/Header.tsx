"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Image from "next/image";
import { useTheme, Theme } from "@mui/material/styles";

// Material UI Icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PestControlIcon from "@mui/icons-material/PestControl";

function Header() {
  const theme: Theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ px: 2, py: 1.5 }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side: Logos */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(5),
            }}
          >
            {/* Real SEO Logo */}
            <Box sx={{ height: "54px", width: "205px", boxShadow: 5 }}>
              <Image
                src="/real-seo-white-bg.jpg"
                alt="Real SEO Logo"
                width={205}
                height={54}
                style={{ overflow: "hidden", borderRadius: "6px" }}
              />
            </Box>
            {/* App Bar Icon (rotated 180 degrees) */}
            <Box
              sx={{
                height: "20px",
                width: "34px",
              }}
            >
              <Image
                src="/app-bar-icon.svg"
                alt="App Icon"
                width={34}
                height={20}
              />
            </Box>
          </Box>

          {/* Right side: Icons + Avatar + Name + Vector */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(2.5),
            }}
          >
            {/* Three MUI Icon boxes */}
            {[
              <PestControlIcon key={1} sx={{ fontSize: "body1" }} />,
              <NotificationsIcon key={2} sx={{ fontSize: "body1" }} />,
              <SettingsIcon key={3} sx={{ fontSize: "body1" }} />,
            ].map((icon, index) => (
              <Box
                key={index}
                sx={{
                  height: theme.spacing(4.5),
                  width: theme.spacing(4.5),
                  bgcolor: theme.palette.primary.dark,
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {icon}
              </Box>
            ))}

            {/* User image box */}
            <Box
              sx={{
                height: 34,
                width: 34,
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/user-avatar.jpg"
                alt="User Avatar"
                width={34}
                height={34}
              />
            </Box>

            {/* User name */}
            <Box
              sx={{
                fontSize: "18px",
                fontWeight: theme.typography.fontWeightRegular,
                color: theme.palette.text.secondary,
              }}
            >
              David K. Croxton
            </Box>

            {/* Vector element */}
            <Box sx={{ height: theme.spacing(4), width: theme.spacing(4) }}>
              <Image
                src="/vector-icon.svg"
                alt="Dropdown"
                width={10}
                height={7}
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
