import {
    Box,
    Button,
    TextField
} from "@mui/material";

import PaymentsIcon from "@mui/icons-material/Payments";

function PayrollToolbar({

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
                label="Search Payroll"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: 320 }}
            />

            <Button
                variant="contained"
                startIcon={<PaymentsIcon />}
                onClick={onAdd}
            >

                Generate Payroll

            </Button>

        </Box>

    );

}

export default PayrollToolbar;