import api from "../api/axios";

export const getDashboard = async () => {

    const response = await api.get("/api/v1/dashboard");

    return response.data;

};