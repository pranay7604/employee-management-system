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
import { checkIn } from "../../services/attendanceService";
import CustomSnackbar from "../common/CustomSnackbar";

const initialAttendance = {
  employeeId: "",

  remarks: "",
};

function AttendanceDialog({
  open,

  handleClose,

  loadAttendance,
}) {
  const [attendance, setAttendance] = useState(initialAttendance);

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
    setAttendance({
      ...attendance,

      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!attendance.employeeId) {
      newErrors.employeeId = "Employee is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await checkIn(attendance);

      setSnackbarMessage("Employee Checked In Successfully");

      setSnackbarSeverity("success");

      setSnackbarOpen(true);

      setAttendance(initialAttendance);

      loadAttendance();

      handleClose();
    } catch (error) {
      console.error(error);

      setSnackbarMessage(error.response?.data?.message || "Check In Failed");

      setSnackbarSeverity("error");

      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Employee Check In</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.employeeId)}>
              <InputLabel>Employee</InputLabel>

              <Select
                label="Employee"
                name="employeeId"
                value={attendance.employeeId}
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Remarks"
              name="remarks"
              value={attendance.remarks}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setAttendance(initialAttendance);

            handleClose();
          }}
        >
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSave}>
          Check In
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

export default AttendanceDialog;
