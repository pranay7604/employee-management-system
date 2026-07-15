import { useEffect, useState } from "react";

import {
    Grid,
    Typography,
    Box,
    CircularProgress
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmployeeChart from "../../components/dashboard/EmployeeChart";
import AttendanceChart from "../../components/dashboard/AttendanceChart";

import Paper from "@mui/material/Paper";

import StatsCard from "../../components/dashboard/StatsCard";

import { getDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboard();

            setDashboard(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={10}
            >
                <CircularProgress />
            </Box>

        );

    }

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} md={3}>

                    <StatsCard
                        title="Employees"
                        value={dashboard.totalEmployees}
                        icon={<PeopleIcon />}
                        color="#1976d2"
                    />

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <StatsCard
                        title="Departments"
                        value={dashboard.totalDepartments}
                        icon={<BusinessIcon />}
                        color="#2e7d32"
                    />

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <StatsCard
                        title="Present Today"
                        value={dashboard.presentEmployees}
                        icon={<PersonIcon />}
                        color="#ed6c02"
                    />

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <StatsCard
                        title="Attendance Today"
                        value={dashboard.todayAttendance}
                        icon={<AccessTimeIcon />}
                        color="#9c27b0"
                    />

                </Grid>
                
            </Grid>
<Grid item xs={12} md={6}>

    <Paper
        elevation={3}
        sx={{ p: 3, borderRadius: 3 }}
    >

        <Typography
            variant="h6"
            mb={2}
        >
            Employee Statistics
        </Typography>

        <EmployeeChart
            dashboard={dashboard}
        />

    </Paper>

</Grid>

<Grid item xs={12} md={6}>

    <Paper
        elevation={3}
        sx={{ p: 3, borderRadius: 3 }}
    >

        <Typography
            variant="h6"
            mb={2}
        >
            Attendance Statistics
        </Typography>

        <AttendanceChart
            dashboard={dashboard}
        />

    </Paper>

</Grid>
        </Box>

    );

}

export default Dashboard;