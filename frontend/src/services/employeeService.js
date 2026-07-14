import api from "../api/axios";

/* ==============================
   Get All Employees
================================ */

export const getAllEmployees = async () => {

    const response = await api.get("/api/v1/employees");

    return response.data;

};

/* ==============================
   Get Employee By Id
================================ */

export const getEmployeeById = async (id) => {

    const response = await api.get(`/api/v1/employees/${id}`);

    return response.data;

};

/* ==============================
   Create Employee
================================ */

export const createEmployee = async (employee) => {

    const response = await api.post(
        "/api/v1/employees",
        employee
    );

    return response.data;

};

/* ==============================
   Update Employee
================================ */

export const updateEmployee = async (id, employee) => {

    const response = await api.put(
        `/api/v1/employees/${id}`,
        employee
    );

    return response.data;

};

/* ==============================
   Delete Employee
================================ */

export const deleteEmployee = async (id) => {

    const response = await api.delete(
        `/api/v1/employees/${id}`
    );

    return response.data;

};

/* ==============================
   Search Employees
================================ */

export const searchEmployees = async (keyword) => {

    const response = await api.get(
        `/api/v1/employees/search?keyword=${keyword}`
    );

    return response.data;

};