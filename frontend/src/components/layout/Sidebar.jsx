import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  Person,
  People,
  Business,
  AccessTime,
  EventNote,
  Payments,
  Assessment,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    text: "Users",
    icon: <Person />,
    path: "/users",
  },
  {
    text: "Employees",
    icon: <People />,
    path: "/employees",
  },
  {
    text: "Departments",
    icon: <Business />,
    path: "/departments",
  },
  {
    text: "Attendance",
    icon: <AccessTime />,
    path: "/attendance",
  },
  {
    text: "Leave",
    icon: <EventNote />,
    path: "/leave",
  },
  {
    text: "Payroll",
    icon: <Payments />,
    path: "/payroll",
  },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          EMS
        </Typography>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              "&.active": {
                backgroundColor: "#1976d2",
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
