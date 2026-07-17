import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";

import { approveLeave, rejectLeave } from "../../services/leaveService";

function LeaveTable({
  leaves,

  loadLeaves,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";

      case "REJECTED":
        return "error";

      case "PENDING":
        return "warning";

      case "CANCELLED":
        return "default";

      default:
        return "default";
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id, "Admin");

      loadLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id, "Admin");

      loadLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Employee</b>
            </TableCell>

            <TableCell>
              <b>Department</b>
            </TableCell>

            <TableCell>
              <b>Leave Type</b>
            </TableCell>

            <TableCell>
              <b>From</b>
            </TableCell>

            <TableCell>
              <b>To</b>
            </TableCell>

            <TableCell>
              <b>Status</b>
            </TableCell>

            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <TableRow key={leave.id} hover>
                <TableCell>
                  <b>{leave.employeeName}</b>

                  <br />

                  {leave.employeeCode}
                </TableCell>

                <TableCell>{leave.departmentName}</TableCell>

                <TableCell>{leave.leaveType}</TableCell>

                <TableCell>{leave.startDate}</TableCell>

                <TableCell>{leave.endDate}</TableCell>

                <TableCell>
                  <Chip
                    label={leave.status}
                    color={getStatusColor(leave.status)}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  {leave.status === "PENDING" ? (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(leave.id)}
                      >
                        Approve
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => handleReject(leave.id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Button disabled size="small">
                      Completed
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No Leave Requests Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LeaveTable;
