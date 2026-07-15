import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    CircularProgress
} from "@mui/material";

import {
    getAllDepartments,
    deleteDepartment,
    getDepartmentById
} from "../../services/departmentService";

import DepartmentTable from "../../components/department/DepartmentTable";
import DepartmentToolbar from "../../components/department/DepartmentToolbar";
import DepartmentDialog from "../../components/department/DepartmentDialog";

import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";

function Department() {

    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [dialogMode, setDialogMode] = useState("add");

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [departmentToDelete, setDepartmentToDelete] = useState(null);

    const loadDepartments = async () => {

        try {

            const data = await getAllDepartments();

            setDepartments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDepartments();

    }, []);

    const filteredDepartments = departments.filter((department) => {

        const keyword = search.toLowerCase();

        return (

            department.departmentName.toLowerCase().includes(keyword) ||

            department.departmentCode.toLowerCase().includes(keyword)

        );

    });

    const handleEdit = async (department) => {

        try {

            const data = await getDepartmentById(department.id);

            setSelectedDepartment(data);

            setDialogMode("edit");

            setOpen(true);

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = (department) => {

        setDepartmentToDelete(department);

        setDeleteDialogOpen(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteDepartment(departmentToDelete.id);

            setDeleteDialogOpen(false);

            setDepartmentToDelete(null);

            loadDepartments();

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

                Department Management

            </Typography>

            <DepartmentToolbar
                search={search}
                setSearch={setSearch}
                onAdd={() => {

                    setSelectedDepartment(null);

                    setDialogMode("add");

                    setOpen(true);

                }}
            />

            <DepartmentTable
                departments={filteredDepartments}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DepartmentDialog
                open={open}
                handleClose={() => {

                    setOpen(false);

                    setSelectedDepartment(null);

                }}
                loadDepartments={loadDepartments}
                selectedDepartment={selectedDepartment}
                dialogMode={dialogMode}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                title="Delete Department"
                message={`Are you sure you want to delete ${departmentToDelete?.departmentName}?`}
                onCancel={() => {

                    setDeleteDialogOpen(false);

                    setDepartmentToDelete(null);

                }}
                onConfirm={confirmDelete}
            />

        </Box>

    );

}

export default Department;