import api from "../api/axios";

/* ==============================
   Apply Leave
================================ */

export const applyLeave = async (leave) => {

    const response = await api.post(
        "/api/v1/leaves",
        leave
    );

    return response.data;

};

/* ==============================
   Get All Leaves
================================ */

export const getAllLeaves = async () => {

    const response = await api.get(
        "/api/v1/leaves"
    );

    return response.data;

};

/* ==============================
   Get Leave By Employee
================================ */

export const getLeavesByEmployee = async (employeeId) => {

    const response = await api.get(
        `/api/v1/leaves/employee/${employeeId}`
    );

    return response.data;

};

/* ==============================
   Approve Leave
================================ */

export const approveLeave = async (
    leaveId,
    approvedBy
) => {

    const response = await api.put(
        `/api/v1/leaves/${leaveId}/approve?approvedBy=${approvedBy}`
    );

    return response.data;

};

/* ==============================
   Reject Leave
================================ */

export const rejectLeave = async (
    leaveId,
    approvedBy
) => {

    const response = await api.put(
        `/api/v1/leaves/${leaveId}/reject?approvedBy=${approvedBy}`
    );

    return response.data;

};

/* ==============================
   Get Leave By Status
================================ */

export const getLeavesByStatus = async (status) => {

    const response = await api.get(
        `/api/v1/leaves/status/${status}`
    );

    return response.data;

};