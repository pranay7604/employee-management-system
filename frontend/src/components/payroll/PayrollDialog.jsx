import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import { getAllEmployees } from "../../services/employeeService";
import { generatePayroll } from "../../services/payrollService";
import CustomSnackbar from "../common/CustomSnackbar";

const initialPayroll = {
  employeeId: "",

  month: "",

  year: new Date().getFullYear(),

  basicSalary: "",

  hra: "",

  da: "",

  medicalAllowance: "",

  bonus: "",

  pf: "",

  tax: "",

  otherDeductions: "",
};

function PayrollDialog({
  open,

  handleClose,

  loadPayrolls,
}) {
  const [payroll, setPayroll] = useState(initialPayroll);

  const [employees, setEmployees] = useState([]);

  const [errors, setErrors] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (open) {
      loadEmployees();
    }
  }, [open]);

  const loadEmployees = async () => {
    try {
      const data = await getAllEmployees();

      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setPayroll({
      ...payroll,

      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!payroll.employeeId) newErrors.employeeId = "Employee is required";

    if (!payroll.month) newErrors.month = "Month is required";

    if (!payroll.year) newErrors.year = "Year is required";

    if (!payroll.basicSalary)
      newErrors.basicSalary = "Basic Salary is required";

    if (!payroll.hra) newErrors.hra = "HRA is required";

    if (!payroll.da) newErrors.da = "DA is required";

    if (!payroll.medicalAllowance)
      newErrors.medicalAllowance = "Medical Allowance is required";

    if (!payroll.bonus) newErrors.bonus = "Bonus is required";

    if (!payroll.pf) newErrors.pf = "PF is required";

    if (!payroll.tax) newErrors.tax = "Tax is required";

    if (!payroll.otherDeductions)
      newErrors.otherDeductions = "Other Deductions are required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await generatePayroll(payroll);

      setSnackbarMessage("Payroll Generated Successfully");

      setSnackbarSeverity("success");

      setSnackbarOpen(true);

      setPayroll(initialPayroll);

      loadPayrolls();

      handleClose();
    } catch (error) {
      console.error(error);

      setSnackbarMessage(
        error.response?.data?.message || "Failed to Generate Payroll",
      );

      setSnackbarSeverity("error");

      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Generate Payroll</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Employee</InputLabel>

              <Select
                label="Employee"
                name="employeeId"
                value={payroll.employeeId}
                onChange={handleChange}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.employeeCode} - {employee.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Month"
              name="month"
              type="number"
              value={payroll.month}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Year"
              name="year"
              type="number"
              value={payroll.year}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Basic Salary"
              name="basicSalary"
              type="number"
              value={payroll.basicSalary}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="HRA"
              name="hra"
              type="number"
              value={payroll.hra}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="DA"
              name="da"
              type="number"
              value={payroll.da}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Medical Allowance"
              name="medicalAllowance"
              type="number"
              value={payroll.medicalAllowance}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Bonus"
              name="bonus"
              type="number"
              value={payroll.bonus}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="PF"
              name="pf"
              type="number"
              value={payroll.pf}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tax"
              name="tax"
              type="number"
              value={payroll.tax}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Other Deductions"
              name="otherDeductions"
              type="number"
              value={payroll.otherDeductions}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setPayroll(initialPayroll);

            handleClose();
          }}
        >
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSave}>
          Generate Payroll
        </Button>
      </DialogActions>

      <CustomSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Dialog>
  );
}

export default PayrollDialog;
