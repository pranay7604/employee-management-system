import { Box, Button, TextField } from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function LeaveToolbar({
  search,

  setSearch,

  onAdd,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <TextField
        label="Search Leave"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 320 }}
      />

      <Button
        variant="contained"
        startIcon={<EventAvailableIcon />}
        onClick={onAdd}
      >
        Apply Leave
      </Button>
    </Box>
  );
}

export default LeaveToolbar;
