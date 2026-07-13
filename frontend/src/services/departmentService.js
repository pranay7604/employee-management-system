import api from "../api/axios";

export const getAllDepartments = async () => {

    const response = await api.get("/api/v1/departments");

    return response.data;

};