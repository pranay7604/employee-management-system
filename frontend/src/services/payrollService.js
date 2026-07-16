import api from "../api/axios";

/* ==============================
   Generate Payroll
================================ */

export const generatePayroll = async (payroll) => {

    const response = await api.post(
        "/api/v1/payroll",
        payroll
    );

    return response.data;

};

/* ==============================
   Get All Payrolls
================================ */

export const getAllPayrolls = async () => {

    const response = await api.get(
        "/api/v1/payroll"
    );

    return response.data;

};

/* ==============================
   Get Payroll By Employee
================================ */

export const getPayrollByEmployee = async (employeeId) => {

    const response = await api.get(
        `/api/v1/payroll/employee/${employeeId}`
    );

    return response.data;

};

/* ==============================
   Get Payroll By Month
================================ */

export const getPayrollByMonth = async (month) => {

    const response = await api.get(
        `/api/v1/payroll/month/${month}`
    );

    return response.data;

};

/* ==============================
   Get Payroll By Year
================================ */

export const getPayrollByYear = async (year) => {

    const response = await api.get(
        `/api/v1/payroll/year/${year}`
    );

    return response.data;

};

/* ==============================
   Delete Payroll
================================ */

export const deletePayroll = async (id) => {

    const response = await api.delete(
        `/api/v1/payroll/${id}`
    );

    return response.data;

};