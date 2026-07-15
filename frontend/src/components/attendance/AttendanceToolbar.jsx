import {
    Box,
    Button,
    TextField
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";

function AttendanceToolbar({

    search,

    setSearch,

    onAdd

}) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
            }}
        >

            <TextField
                label="Search Employee"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{ width: 320 }}
            />

            <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={onAdd}
            >
                Check In
            </Button>

        </Box>

    );

}

export default AttendanceToolbar;