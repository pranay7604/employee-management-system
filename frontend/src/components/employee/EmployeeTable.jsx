import {
    Avatar,
    Chip,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeTable({
    employees,
    onEdit,
    onDelete
}) {

    const getStatusColor = (status) => {

        switch (status) {

            case "ACTIVE":
                return "success";

            case "INACTIVE":
                return "error";

            default:
                return "default";

        }

    };

    const getInitials = (name = "") => {

        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();

    };

    return (

        <TableContainer
            component={Paper}
            elevation={3}
        >

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell><b>Employee</b></TableCell>

                        <TableCell><b>Code</b></TableCell>

                        <TableCell><b>Email</b></TableCell>

                        <TableCell><b>Designation</b></TableCell>

                        <TableCell><b>Department</b></TableCell>

                        <TableCell align="center"><b>Status</b></TableCell>

                        <TableCell align="center"><b>Actions</b></TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {employees.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={7}
                                align="center"
                            >

                                No Employees Found

                            </TableCell>

                        </TableRow>

                    ) : (

                        employees.map(employee => (

                            <TableRow
                                key={employee.id}
                                hover
                            >

                                <TableCell>

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >

                                        <Avatar>

                                            {getInitials(employee.fullName)}

                                        </Avatar>

                                        <Typography>

                                            {employee.fullName}

                                        </Typography>

                                    </Stack>

                                </TableCell>

                                <TableCell>

                                    {employee.employeeCode}

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

                                <TableCell align="center">

                                    <Chip
                                        label={employee.status}
                                        color={getStatusColor(employee.status)}
                                        size="small"
                                    />

                                </TableCell>

                                <TableCell align="center">

                                    <IconButton
                                        color="primary"
                                        onClick={() => onEdit(employee)}
                                    >

                                        <EditIcon />

                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(employee)}
                                    >

                                        <DeleteIcon />

                                    </IconButton>

                                </TableCell>

                            </TableRow>

                        ))

                    )}

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default EmployeeTable;