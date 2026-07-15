import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TableContainer
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function DepartmentTable({

    departments,

    onEdit,

    onDelete

}) {

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>
                            <b>Code</b>
                        </TableCell>

                        <TableCell>
                            <b>Department Name</b>
                        </TableCell>

                        <TableCell>
                            <b>Description</b>
                        </TableCell>

                        <TableCell align="center">
                            <b>Actions</b>
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {departments.length > 0 ? (

                        departments.map((department) => (

                            <TableRow
                                key={department.id}
                                hover
                            >

                                <TableCell>
                                    {department.departmentCode}
                                </TableCell>

                                <TableCell>
                                    {department.departmentName}
                                </TableCell>

                                <TableCell>
                                    {department.description}
                                </TableCell>

                                <TableCell align="center">

                                    <IconButton
                                        color="primary"
                                        onClick={() => onEdit(department)}
                                    >

                                        <EditIcon />

                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(department)}
                                    >

                                        <DeleteIcon />

                                    </IconButton>

                                </TableCell>

                            </TableRow>

                        ))

                    ) : (

                        <TableRow>

                            <TableCell
                                colSpan={4}
                                align="center"
                            >

                                No Departments Found

                            </TableCell>

                        </TableRow>

                    )}

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default DepartmentTable;