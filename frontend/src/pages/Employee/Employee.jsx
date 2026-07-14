import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    CircularProgress
} from "@mui/material";

import {
    getAllEmployees,
    getEmployeeById,
    deleteEmployee
} from "../../services/employeeService";

import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeToolbar from "../../components/employee/EmployeeToolbar";
import EmployeeDialog from "../../components/employee/EmployeeDialog";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

         const [dialogMode, setDialogMode] = useState("add");

    const loadEmployees = async () => {

        try {

            const data = await getAllEmployees();

            setEmployees(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadEmployees();

    }, []);

    const filteredEmployees = employees.filter((employee) => {

        const keyword = search.toLowerCase();

        return (

            employee.fullName.toLowerCase().includes(keyword) ||

            employee.employeeCode.toLowerCase().includes(keyword) ||

            employee.email.toLowerCase().includes(keyword) ||

            employee.designation.toLowerCase().includes(keyword)

        );

    });

    const handleDelete = async (employee) => {

    const confirmDelete = window.confirm(
        `Delete ${employee.fullName}?`
    );

    if (!confirmDelete) return;

    try {

        await deleteEmployee(employee.id);

        alert("Employee Deleted Successfully");

        loadEmployees();

    } catch (error) {

        console.error(error);

        alert("Unable to Delete Employee");

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
    const handleEdit = async (employee) => {

    try {

        const data = await getEmployeeById(employee.id);

        setSelectedEmployee(data);

        setDialogMode("edit");

        setOpen(true);

    } catch (error) {

        console.error(error);

        alert("Unable to load employee details.");

    }

};

    return (

        <Box>

            <Typography
                variant="h4"
                mb={3}
            >
                Employee Management
            </Typography>

            <EmployeeToolbar
    search={search}
    setSearch={setSearch}
    onAdd={() => {

        setSelectedEmployee(null);

        setDialogMode("add");

        setOpen(true);

    }}
/>

           <EmployeeTable
    employees={filteredEmployees}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>

            <EmployeeDialog
    open={open}
    handleClose={() => {

        setOpen(false);

        setSelectedEmployee(null);

    }}
    loadEmployees={loadEmployees}
    selectedEmployee={selectedEmployee}
    dialogMode={dialogMode}
/>

        </Box>

    );

}

export default Employee;