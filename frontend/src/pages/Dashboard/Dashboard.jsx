import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";

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
        mb={3}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Employees
              </Typography>

              <Typography variant="h4">
                {dashboard.totalEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Departments
              </Typography>

              <Typography variant="h4">
                {dashboard.totalDepartments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Pending Leaves
              </Typography>

              <Typography variant="h4">
                {dashboard.pendingLeaves}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Payroll
              </Typography>

              <Typography variant="h4">
                ₹{dashboard.monthlySalaryExpense}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Box>

  );

}

export default Dashboard;