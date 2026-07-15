import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid
} from "@mui/material";

import {
    createDepartment,
    updateDepartment
} from "../../services/departmentService";

import CustomSnackbar from "../common/CustomSnackbar";

const initialDepartment = {

    departmentCode: "",

    departmentName: "",

    description: ""

};

function DepartmentDialog({

    open,

    handleClose,

    loadDepartments,

    selectedDepartment,

    dialogMode

}) {

    const [department, setDepartment] = useState(initialDepartment);

    const [errors, setErrors] = useState({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    useEffect(() => {

    if (selectedDepartment) {

        setDepartment({

            departmentCode: selectedDepartment.departmentCode || "",

            departmentName: selectedDepartment.departmentName || "",

            description: selectedDepartment.description || ""

        });

    } else {

        setDepartment(initialDepartment);

    }

}, [selectedDepartment]);

const handleChange = (e) => {

    setDepartment({

        ...department,

        [e.target.name]: e.target.value

    });

};

const validateForm = () => {

    const newErrors = {};

    if (!department.departmentCode.trim()) {

        newErrors.departmentCode = "Department Code is required";

    }

    if (!department.departmentName.trim()) {

        newErrors.departmentName = "Department Name is required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

};

const handleSnackbarClose = () => {

    setSnackbarOpen(false);

};
const handleSave = async () => {

    if (!validateForm()) return;

    try {

        if (dialogMode === "edit") {

            await updateDepartment(
                selectedDepartment.id,
                department
            );

            setSnackbarMessage("Department Updated Successfully");

        } else {

            await createDepartment(department);

            setSnackbarMessage("Department Added Successfully");

        }

        setSnackbarSeverity("success");

        setSnackbarOpen(true);

        setDepartment(initialDepartment);

        loadDepartments();

        handleClose();

    } catch (error) {

        console.error(error);

        setSnackbarMessage("Operation Failed");

        setSnackbarSeverity("error");

        setSnackbarOpen(true);

    }

};

return (

    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
    >

        <DialogTitle>

            {dialogMode === "edit"
                ? "Edit Department"
                : "Add Department"}

        </DialogTitle>

        <DialogContent>

            <Grid container spacing={2} sx={{ mt: 1 }}>

                <Grid size={{ xs: 12 }}>

                    <TextField
                        fullWidth
                        label="Department Code"
                        name="departmentCode"
                        value={department.departmentCode}
                        onChange={handleChange}
                        error={Boolean(errors.departmentCode)}
                        helperText={errors.departmentCode}
                    />

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <TextField
                        fullWidth
                        label="Department Name"
                        name="departmentName"
                        value={department.departmentName}
                        onChange={handleChange}
                        error={Boolean(errors.departmentName)}
                        helperText={errors.departmentName}
                    />

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        name="description"
                        value={department.description}
                        onChange={handleChange}
                    />

                </Grid>

            </Grid>

        </DialogContent>

        <DialogActions>

            <Button
                onClick={handleClose}
            >
                Cancel
            </Button>

            <Button
                variant="contained"
                onClick={handleSave}
            >
                {dialogMode === "edit"
                    ? "Update"
                    : "Save"}
            </Button>

        </DialogActions>

        <CustomSnackbar
            open={snackbarOpen}
            handleClose={handleSnackbarClose}
            message={snackbarMessage}
            severity={snackbarSeverity}
        />

    </Dialog>

);

}

export default DepartmentDialog;