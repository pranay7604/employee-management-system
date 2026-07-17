import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { createEmployee, updateEmployee } from "../../services/employeeService";

import { getAllDepartments } from "../../services/departmentService";

import userService from "../../services/userService";
import CustomSnackbar from "../common/CustomSnackbar";

function EmployeeDialog({
  open,

  handleClose,

  loadEmployees,

  selectedEmployee,

  dialogMode,
}) {
  const initialEmployee = {
    employeeCode: "",

    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    gender: "",

    dateOfBirth: "",

    joiningDate: "",

    designation: "",

    salary: "",

    address: "",

    status: "ACTIVE",

    departmentId: "",

    userId: "",
  };

  const [employee, setEmployee] = useState(initialEmployee);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee({
        employeeCode: selectedEmployee.employeeCode || "",

        firstName: selectedEmployee.firstName || "",

        lastName: selectedEmployee.lastName || "",

        email: selectedEmployee.email || "",

        phone: selectedEmployee.phone || "",

        gender: selectedEmployee.gender || "",

        dateOfBirth: selectedEmployee.dateOfBirth || "",

        joiningDate: selectedEmployee.joiningDate || "",

        designation: selectedEmployee.designation || "",

        salary: selectedEmployee.salary || "",

        address: selectedEmployee.address || "",

        status: selectedEmployee.status || "ACTIVE",

        departmentId: selectedEmployee.departmentId || "",

        userId: selectedEmployee.userId || "",
      });
    } else {
      setEmployee(initialEmployee);
    }
  }, [selectedEmployee]);

  const [departments, setDepartments] = useState([]);

  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setEmployee({
      ...employee,

      [event.target.name]: event.target.value,
    });
  };
  const validateForm = () => {
    const newErrors = {};

    if (!employee.employeeCode.trim()) {
      newErrors.employeeCode = "Employee Code is required";
    }

    if (!employee.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!employee.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!employee.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)
    ) {
      newErrors.email = "Invalid Email";
    }

    if (!employee.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(employee.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    if (!employee.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!employee.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    if (!employee.joiningDate) {
      newErrors.joiningDate = "Joining Date is required";
    }

    if (!employee.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!employee.salary || Number(employee.salary) <= 0) {
      newErrors.salary = "Salary must be greater than zero";
    }

    if (!employee.departmentId) {
      newErrors.departmentId = "Department is required";
    }

    if (!employee.userId) {
      newErrors.userId = "User is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const loadDepartments = async () => {
    try {
      const data = await getAllDepartments();

      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();

      const availableUsers = data.filter((user) => user.role === "EMPLOYEE");

      setUsers(availableUsers);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (open) {
      loadDepartments();

      loadUsers();
    }
  }, [open]);
  const resetForm = () => {
    setEmployee(initialEmployee);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (dialogMode === "edit") {
        await updateEmployee(selectedEmployee.id, employee);
        setSnackbarMessage("Employee Updated Successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        await createEmployee(employee);
        setSnackbarMessage("Employee Added Successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }

      setEmployee(initialEmployee);
      handleClose();
      loadEmployees();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Operation Failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        {dialogMode === "edit" ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee Code"
              name="employeeCode"
              value={employee.employeeCode}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.gender)}>
              <InputLabel>Gender</InputLabel>

              <Select
                name="gender"
                value={employee.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
              <FormHelperText>{errors.gender}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              name="dateOfBirth"
              value={employee.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Joining Date"
              name="joiningDate"
              value={employee.joiningDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Salary"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              name="address"
              value={employee.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.departmentId)}>
              <InputLabel>Department</InputLabel>

              <Select
                name="departmentId"
                value={employee.departmentId}
                label="Department"
                onChange={handleChange}
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.departmentName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.departmentId}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.userId)}>
              <InputLabel>User</InputLabel>

              <Select
                name="userId"
                value={employee.userId}
                label="User"
                onChange={handleChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.fullName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.userId}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>

              <Select
                name="status"
                value={employee.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>

                <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            resetForm();

            handleClose();
          }}
        >
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSave}>
          Save Employee
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

export default EmployeeDialog;
