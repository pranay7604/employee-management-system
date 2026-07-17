import { useEffect, useState } from "react";

import { Box, Typography, CircularProgress } from "@mui/material";

import { getAllPayrolls } from "../../services/payrollService";

import PayrollTable from "../../components/payroll/PayrollTable";
import PayrollToolbar from "../../components/payroll/PayrollToolbar";
import PayrollDialog from "../../components/payroll/PayrollDialog";

function Payroll() {
  const [payrolls, setPayrolls] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const loadPayrolls = async () => {
    try {
      const data = await getAllPayrolls();

      setPayrolls(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayrolls();
  }, []);

  const filteredPayrolls = payrolls.filter((payroll) => {
    const keyword = search.toLowerCase();

    return (
      payroll.employeeName.toLowerCase().includes(keyword) ||
      payroll.month.toString().includes(keyword) ||
      payroll.year.toString().includes(keyword)
    );
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Payroll Management
      </Typography>

      <PayrollToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setOpen(true)}
      />

      <PayrollTable payrolls={filteredPayrolls} loadPayrolls={loadPayrolls} />

      <PayrollDialog
        open={open}
        handleClose={() => setOpen(false)}
        loadPayrolls={loadPayrolls}
      />
    </Box>
  );
}

export default Payroll;
