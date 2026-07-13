import { useState, useEffect } from "react";
import { getAllDepartments } from "../../services/departmentService";
import { createEmployee } from "../../services/employeeService";

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

function EmployeeDialog({
    open,
    handleClose,
    loadEmployees
}) {

    const [employee, setEmployee] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
    departmentId: ""
});

    const [departments, setDepartments] = useState([]);

    const handleChange = (e) => {

        setEmployee({

            ...employee,

            [e.target.name]: e.target.value

        });

    };

    useEffect(() => {
    loadDepartments();
}, []);

const loadDepartments = async () => {

    try {

        const data = await getAllDepartments();

        setDepartments(data);

    } catch (error) {

        console.error(error);

    }

};
const handleSave = async () => {

    try {

        await createEmployee(employee);

        alert("Employee Added Successfully");

        handleClose();

        loadEmployees();

    } catch (error) {

        console.error(error);

        alert("Failed to Add Employee");

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

                Add Employee

            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Employee Code"
                            name="employeeCode"
                            value={employee.employeeCode}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={employee.firstName}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={employee.lastName}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Designation"
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Salary"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

    <FormControl fullWidth>

        <InputLabel>Department</InputLabel>

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

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={handleClose}
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