import api from "../api/axios";

/* ==============================
   Check In
================================ */

export const checkIn = async (attendance) => {

    const response = await api.post(
        "/api/v1/attendance/check-in",
        attendance
    );

    return response.data;

};

/* ==============================
   Check Out
================================ */

export const checkOut = async (attendanceId) => {

    const response = await api.put(
        `/api/v1/attendance/check-out/${attendanceId}`
    );

    return response.data;

};

/* ==============================
   Get All Attendance
================================ */

export const getAllAttendance = async () => {

    const response = await api.get(
        "/api/v1/attendance"
    );

    return response.data;

};

/* ==============================
   Get Attendance By Id
================================ */

export const getAttendanceById = async (id) => {

    const response = await api.get(
        `/api/v1/attendance/${id}`
    );

    return response.data;

};

/* ==============================
   Get Attendance By Employee
================================ */

export const getAttendanceByEmployee = async (employeeId) => {

    const response = await api.get(
        `/api/v1/attendance/employee/${employeeId}`
    );

    return response.data;

};

/* ==============================
   Get Attendance By Date
================================ */

export const getAttendanceByDate = async (date) => {

    const response = await api.get(
        `/api/v1/attendance/date/${date}`
    );

    return response.data;

};