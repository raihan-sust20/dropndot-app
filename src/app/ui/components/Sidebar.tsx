"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Theme, useTheme } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../ui.constant";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const theme: Theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  console.log('path segments:', pathSegments);

  const icons = [
    <PieChartOutlineOutlinedIcon
      key={1}
      sx={{ fontSize: theme.typography.body1.fontSize }}
    />,
    <AccountCircleOutlinedIcon
      key={2}
      sx={{ fontSize: theme.typography.body1.fontSize }}
    />,
    <AccountCircleOutlinedIcon
      key={3}
      sx={{ fontSize: theme.typography.body1.fontSize }}
    />,
    <BusinessCenterOutlinedIcon
      key={4}
      sx={{ fontSize: theme.typography.body1.fontSize }}
    />,
    <AccountCircleOutlinedIcon
      key={5}
      sx={{ fontSize: theme.typography.body1.fontSize }}
    />,
    <PersonAddAltOutlinedIcon
      key={6}
      sx={{ fontSize: theme.typography.body1.fontSize }}
    />,
    <SettingsOutlinedIcon
      key={7}
      sx={{ fontSize: theme.typography.body1.fontSize }}
    />,
  ];

  const menuItemList = [
    { label: "Dashboard", path: "/" },
    { label: "Account Managers", path: "/account-managers" },
    { label: "Tasks", path: "/tasks" },
    { label: "Sales Teams", path: "/sales-teams" },
    { label: "Vendors", path: "/vendors" },
    { label: "Clients", path: "/clients/list" },
    { label: "Settings", path: "/settings" },
  ];

  const isItemSelected = (itemPath: string) => {
    if (itemPath === "/") {
      return pathSegments.length === 2;
    }

    const target = itemPath.split("/")[1];
    return pathSegments.includes(target);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        backgroundColor: theme.palette.common.white,
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: "auto",
          px: theme.spacing(2),
          paddingTop: theme.spacing(7),
        }}
      >
        <List>
          {menuItemList.map((menuItem, index) => (
            <ListItem key={menuItem.label} disablePadding>
              <ListItemButton
                selected={isItemSelected(menuItem.path)}
                onClick={() => router.push(menuItem.path)}
                sx={{
                  color: theme.palette.primary.light,
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.fontWeightMedium,
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.primary.light,
                    minWidth: theme.spacing(3.5),
                  }}
                >
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
