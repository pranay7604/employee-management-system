import api from "../api/axios";

export const getAllEmployees = async () => {

    const response = await api.get("/api/v1/employees");

    return response.data;

};
export const createEmployee = async (employee) => {

    const response = await api.post(
        "/api/v1/employees",
        employee
    );

    return response.data;

};