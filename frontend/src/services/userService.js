import api from "../api/axios";

const getAllUsers = async () => {
    const response = await api.get("/api/v1/users");
    return response.data;
};

const getAvailableUsers = async () => {
    const response = await api.get("/api/v1/users/available");
    return response.data;
};

const registerUser = async (user) => {
    const response = await api.post("/api/auth/register", user);
    return response.data;
};

const deleteUser = async (id) => {
    const response = await api.delete(`/api/v1/users/${id}`);
    return response.data;
};

export default {
    getAllUsers,
    getAvailableUsers,
    registerUser,
    deleteUser
};