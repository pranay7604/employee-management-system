import {
    Box,
    Button,
    TextField
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

function DepartmentToolbar({

    search,

    setSearch,

    onAdd

}) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3
            }}
        >

            <TextField
                label="Search Department"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{ width: 300 }}
            />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                Add Department
            </Button>

        </Box>

    );

}

export default DepartmentToolbar;