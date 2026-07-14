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
    MenuItem
} from "@mui/material";

import {
    createEmployee,
    updateEmployee
} from "../../services/employeeService";

import {
    getAllDepartments
} from "../../services/departmentService";

import userService from "../../services/userService";

function EmployeeDialog({

    open,

    handleClose,

    loadEmployees,

    selectedEmployee,

    dialogMode

}) {   const initialEmployee = {

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

        userId: ""

    };

    const [employee, setEmployee] = useState(initialEmployee);
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

            userId: selectedEmployee.userId || ""

        });

    } else {

        setEmployee(initialEmployee);

    }

}, [selectedEmployee]);

    const [departments, setDepartments] = useState([]);

    const [users, setUsers] = useState([]);    const handleChange = (event) => {

        setEmployee({

            ...employee,

            [event.target.name]: event.target.value

        });

    };    const loadDepartments = async () => {

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

            const availableUsers = data.filter(

                user =>

                    user.role === "EMPLOYEE"

            );

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

    try {

        if (dialogMode === "edit") {

            await updateEmployee(
                selectedEmployee.id,
                employee
            );

            alert("Employee Updated Successfully");

        } else {

            await createEmployee(employee);

            alert("Employee Added Successfully");

        }

        setEmployee(initialEmployee);

        handleClose();

        loadEmployees();

    } catch (error) {

        console.error(error);

        alert("Operation Failed");

    }

};

        return (

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

    {dialogMode === "edit"
        ? "Edit Employee"
        : "Add Employee"}

</DialogTitle>

            <DialogContent>

    <Grid
        container
        spacing={2}
        sx={{ mt: 1 }}
    >
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
                        <FormControl fullWidth>
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
                        <FormControl fullWidth>

                            <InputLabel>
                                Department
                            </InputLabel>

                            <Select
                                name="departmentId"
                                value={employee.departmentId}
                                label="Department"
                                onChange={handleChange}
                            >

                                {departments.map((department) => (

                                    <MenuItem
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.departmentName}
                                    </MenuItem>

                                ))}

                            </Select>

                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>

                            <InputLabel>
                                User
                            </InputLabel>

                            <Select
                                name="userId"
                                value={employee.userId}
                                label="User"
                                onChange={handleChange}
                            >

                                {users.map((user) => (

                                    <MenuItem
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.fullName}
                                    </MenuItem>

                                ))}

                            </Select>

                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>

                            <InputLabel>
                                Status
                            </InputLabel>

                            <Select
                                name="status"
                                value={employee.status}
                                label="Status"
                                onChange={handleChange}
                            >
                                <MenuItem value="ACTIVE">
                                    ACTIVE
                                </MenuItem>

                                <MenuItem value="INACTIVE">
                                    INACTIVE
                                </MenuItem>
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

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Save Employee
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default EmployeeDialog;