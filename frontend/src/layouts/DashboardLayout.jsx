import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#f5f5f5",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <Box sx={{ p: 3 }}>

                    <Outlet />

                </Box>

            </Box>

        </Box>

    );

}

export default DashboardLayout;