import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from "@mui/material";

import { getAllEmployees } from "../../services/employeeService";
import { applyLeave } from "../../services/leaveService";
import CustomSnackbar from "../common/CustomSnackbar";

const initialLeave = {

    employeeId: "",

    leaveType: "",

    startDate: "",

    endDate: "",

    reason: ""

};

function LeaveDialog({

    open,

    handleClose,

    loadLeaves

}) {

    const [leave, setLeave] = useState(initialLeave);

    const [employees, setEmployees] = useState([]);

    const [errors, setErrors] = useState({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {

        if (open) {

            loadEmployees();

        }

    }, [open]);

    const loadEmployees = async () => {

        try {

            const data = await getAllEmployees();

            setEmployees(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setLeave({

            ...leave,

            [e.target.name]: e.target.value

        });

    };

    const validateForm = () => {

        const newErrors = {};

        if (!leave.employeeId) {

            newErrors.employeeId = "Employee is required";

        }

        if (!leave.leaveType) {

            newErrors.leaveType = "Leave Type is required";

        }

        if (!leave.startDate) {

            newErrors.startDate = "Start Date is required";

        }

        if (!leave.endDate) {

            newErrors.endDate = "End Date is required";

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

        await applyLeave(leave);

        setSnackbarMessage("Leave Applied Successfully");

        setSnackbarSeverity("success");

        setSnackbarOpen(true);

        setLeave(initialLeave);

        loadLeaves();

        handleClose();

    } catch (error) {

        console.error(error);

        setSnackbarMessage(
            error.response?.data?.message || "Failed to Apply Leave"
        );

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

            Apply Leave

        </DialogTitle>

        <DialogContent>

            <Grid container spacing={2} sx={{ mt: 1 }}>

                <Grid item xs={12}>

                    <FormControl
                        fullWidth
                        error={Boolean(errors.employeeId)}
                    >

                        <InputLabel>Employee</InputLabel>

                        <Select
                            label="Employee"
                            name="employeeId"
                            value={leave.employeeId}
                            onChange={handleChange}
                        >

                            {employees.map((employee) => (

                                <MenuItem
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.employeeCode} - {employee.fullName}
                                </MenuItem>

                            ))}

                        </Select>

                    </FormControl>

                </Grid>

                <Grid item xs={12}>

                    <FormControl
                        fullWidth
                        error={Boolean(errors.leaveType)}
                    >

                        <InputLabel>Leave Type</InputLabel>

                        <Select
                            label="Leave Type"
                            name="leaveType"
                            value={leave.leaveType}
                            onChange={handleChange}
                        >

                            <MenuItem value="CASUAL">Casual</MenuItem>

                            <MenuItem value="SICK">Sick</MenuItem>

                            <MenuItem value="EARNED">Earned</MenuItem>

                            <MenuItem value="MATERNITY">Maternity</MenuItem>

                            <MenuItem value="PATERNITY">Paternity</MenuItem>

                            <MenuItem value="UNPAID">Unpaid</MenuItem>

                        </Select>

                    </FormControl>

                </Grid>

                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        type="date"
                        label="Start Date"
                        name="startDate"
                        value={leave.startDate}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                        error={Boolean(errors.startDate)}
                        helperText={errors.startDate}
                    />

                </Grid>

                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        type="date"
                        label="End Date"
                        name="endDate"
                        value={leave.endDate}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                        error={Boolean(errors.endDate)}
                        helperText={errors.endDate}
                    />

                </Grid>

                <Grid item xs={12}>

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Reason"
                        name="reason"
                        value={leave.reason}
                        onChange={handleChange}
                    />

                </Grid>

            </Grid>

        </DialogContent>

        <DialogActions>

            <Button
                onClick={() => {

                    setLeave(initialLeave);

                    handleClose();

                }}
            >
                Cancel
            </Button>

            <Button
                variant="contained"
                onClick={handleSave}
            >
                Apply Leave
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

export default LeaveDialog;