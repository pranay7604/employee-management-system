import api from "../api/axios";

/* ==============================
   Get All Departments
================================ */

export const getAllDepartments = async () => {

    const response = await api.get("/api/v1/departments");

    return response.data;

};

/* ==============================
   Get Department By Id
================================ */

export const getDepartmentById = async (id) => {

    const response = await api.get(`/api/v1/departments/${id}`);

    return response.data;

};

/* ==============================
   Create Department
================================ */

export const createDepartment = async (department) => {

    const response = await api.post(
        "/api/v1/departments",
        department
    );

    return response.data;

};

/* ==============================
   Update Department
================================ */

export const updateDepartment = async (id, department) => {

    const response = await api.put(
        `/api/v1/departments/${id}`,
        department
    );

    return response.data;

};

/* ==============================
   Delete Department
================================ */

export const deleteDepartment = async (id) => {

    const response = await api.delete(
        `/api/v1/departments/${id}`
    );

    return response.data;

};

/* ==============================
   Search Departments
================================ */

export const searchDepartments = async (keyword) => {

    const response = await api.get(
        `/api/v1/departments/search?keyword=${keyword}`
    );

    return response.data;

};