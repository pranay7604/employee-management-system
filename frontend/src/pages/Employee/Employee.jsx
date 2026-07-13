import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";
import EmployeeDialog from "../../components/employee/EmployeeDialog";

import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from "@mui/material";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {

            const data = await getAllEmployees();

            console.log(data);

            setEmployees(data);

        } catch (error) {

            console.error("Error loading employees:", error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <Box
    sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10
    }}
>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Typography variant="h4">
                    Employee Management
                </Typography>

               <Button
    variant="contained"
    onClick={() => setOpen(true)}
>
    Add Employee
</Button>

            </Box>

            <Paper elevation={3}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                <b>Code</b>
                            </TableCell>

                            <TableCell>
                                <b>Name</b>
                            </TableCell>

                            <TableCell>
                                <b>Email</b>
                            </TableCell>

                            <TableCell>
                                <b>Designation</b>
                            </TableCell>

                            <TableCell>
                                <b>Department</b>
                            </TableCell>

                            <TableCell>
                                <b>Status</b>
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {employees.length > 0 ? (

                            employees.map((employee) => (

                                <TableRow key={employee.id}>

                                    <TableCell>
                                        {employee.employeeCode}
                                    </TableCell>

                                    <TableCell>
                                        {employee.fullName}
                                    </TableCell>

                                    <TableCell>
                                        {employee.email}
                                    </TableCell>

                                    <TableCell>
                                        {employee.designation}
                                    </TableCell>

                                    <TableCell>
                                        {employee.departmentName}
                                    </TableCell>

                                    <TableCell>
                                        {employee.status}
                                    </TableCell>

                                </TableRow>

                            ))

                        ) : (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                >

                                    No Employees Found

                                </TableCell>

                            </TableRow>

                        )}

                    </TableBody>

                </Table>

            </Paper>
            <EmployeeDialog
    open={open}
    handleClose={() => setOpen(false)}
    loadEmployees={loadEmployees}
/>
        </Box>
    );
}

export default Employee;