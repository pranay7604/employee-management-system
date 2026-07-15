import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Button,
    Chip
} from "@mui/material";

function AttendanceTable({

    attendance,

    onCheckOut

}) {

    const getStatusColor = (status) => {

        switch (status) {

            case "PRESENT":
                return "success";

            case "ABSENT":
                return "error";

            case "HALF_DAY":
                return "warning";

            case "LEAVE":
                return "info";

            default:
                return "default";

        }

    };

    const formatDateTime = (value) => {

        if (!value) return "-";

        return new Date(value).toLocaleString();

    };

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell><b>Employee</b></TableCell>

                        <TableCell><b>Department</b></TableCell>

                        <TableCell><b>Date</b></TableCell>

                        <TableCell><b>Check In</b></TableCell>

                        <TableCell><b>Check Out</b></TableCell>

                        <TableCell><b>Hours</b></TableCell>

                        <TableCell><b>Status</b></TableCell>

                        <TableCell align="center"><b>Action</b></TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {attendance.length > 0 ? (

                        attendance.map((record) => (

                            <TableRow
                                key={record.id}
                                hover
                            >

                                <TableCell>

                                    <b>{record.employeeName}</b>

                                    <br />

                                    {record.employeeCode}

                                </TableCell>

                                <TableCell>

                                    {record.departmentName}

                                </TableCell>

                                <TableCell>

                                    {record.attendanceDate}

                                </TableCell>

                                <TableCell>

                                    {formatDateTime(record.checkIn)}

                                </TableCell>

                                <TableCell>

                                    {formatDateTime(record.checkOut)}

                                </TableCell>

                                <TableCell>

                                    {record.workingHours ?? 0}

                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={record.attendanceStatus}
                                        color={getStatusColor(record.attendanceStatus)}
                                        size="small"
                                    />

                                </TableCell>

                                <TableCell align="center">

                                    {record.checkOut ? (

                                        <Button
                                            disabled
                                            size="small"
                                        >
                                            Completed
                                        </Button>

                                    ) : (

                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => onCheckOut(record.id)}
                                        >
                                            Check Out
                                        </Button>

                                    )}

                                </TableCell>

                            </TableRow>

                        ))

                    ) : (

                        <TableRow>

                            <TableCell
                                colSpan={8}
                                align="center"
                            >

                                No Attendance Found

                            </TableCell>

                        </TableRow>

                    )}

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default AttendanceTable;