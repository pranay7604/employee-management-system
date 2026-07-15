import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    CircularProgress
} from "@mui/material";

import {
    getAllAttendance,
    checkOut
} from "../../services/attendanceService";

import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceToolbar from "../../components/attendance/AttendanceToolbar";
import AttendanceDialog from "../../components/attendance/AttendanceDialog";

function Attendance() {

    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const loadAttendance = async () => {

        try {

            const data = await getAllAttendance();

            setAttendance(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadAttendance();

    }, []);

    const filteredAttendance = attendance.filter((record) => {

        const keyword = search.toLowerCase();

        return (

            record.employeeName.toLowerCase().includes(keyword) ||

            record.employeeCode.toLowerCase().includes(keyword) ||

            record.departmentName.toLowerCase().includes(keyword)

        );

    });

    const handleCheckOut = async (attendanceId) => {

        try {

            await checkOut(attendanceId);

            loadAttendance();

        } catch (error) {

            console.error(error);

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

    return (

        <Box>

            <Typography
                variant="h4"
                mb={3}
            >
                Attendance Management
            </Typography>

            <AttendanceToolbar
                search={search}
                setSearch={setSearch}
                onAdd={() => setOpen(true)}
            />

            <AttendanceTable
                attendance={filteredAttendance}
                onCheckOut={handleCheckOut}
            />

            <AttendanceDialog
                open={open}
                handleClose={() => setOpen(false)}
                loadAttendance={loadAttendance}
            />

        </Box>

    );

}

export default Attendance;