import { useEffect, useState } from "react";

import { Box, Typography, CircularProgress } from "@mui/material";

import { getAllLeaves } from "../../services/leaveService";

import LeaveTable from "../../components/leave/LeaveTable";
import LeaveToolbar from "../../components/leave/LeaveToolbar";
import LeaveDialog from "../../components/leave/LeaveDialog";

function Leave() {
  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const loadLeaves = async () => {
    try {
      const data = await getAllLeaves();

      setLeaves(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const filteredLeaves = leaves.filter((leave) => {
    const keyword = search.toLowerCase();

    return (
      leave.employeeName.toLowerCase().includes(keyword) ||
      leave.employeeCode.toLowerCase().includes(keyword) ||
      leave.departmentName.toLowerCase().includes(keyword) ||
      leave.leaveType.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Leave Management
      </Typography>

      <LeaveToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setOpen(true)}
      />

      <LeaveTable leaves={filteredLeaves} loadLeaves={loadLeaves} />

      <LeaveDialog
        open={open}
        handleClose={() => setOpen(false)}
        loadLeaves={loadLeaves}
      />
    </Box>
  );
}

export default Leave;
