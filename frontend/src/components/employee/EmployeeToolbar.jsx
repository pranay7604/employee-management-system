import {
    Box,
    Button,
    TextField,
    InputAdornment
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function EmployeeToolbar({
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
                mb: 3,
                gap: 2,
                flexWrap: "wrap"
            }}
        >

            <TextField
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    width: {
                        xs: "100%",
                        md: 350
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                Add Employee
            </Button>

        </Box>

    );

}

export default EmployeeToolbar;