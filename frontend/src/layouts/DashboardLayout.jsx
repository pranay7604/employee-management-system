import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Navbar />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default DashboardLayout;