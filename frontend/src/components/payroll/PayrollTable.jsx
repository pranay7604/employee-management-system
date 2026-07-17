import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import { deletePayroll } from "../../services/payrollService";

function PayrollTable({
  payrolls,

  loadPayrolls,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this payroll record?");

    if (!confirmDelete) return;

    try {
      await deletePayroll(id);

      alert("Payroll deleted successfully");

      loadPayrolls();
    } catch (error) {
      console.error(error);

      alert("Unable to delete payroll");
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
              <b>Month</b>
            </TableCell>

            <TableCell>
              <b>Year</b>
            </TableCell>

            <TableCell>
              <b>Gross Salary</b>
            </TableCell>

            <TableCell>
              <b>Net Salary</b>
            </TableCell>

            <TableCell>
              <b>Generated Date</b>
            </TableCell>

            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {payrolls.length > 0 ? (
            payrolls.map((payroll) => (
              <TableRow key={payroll.id} hover>
                <TableCell>{payroll.employeeName}</TableCell>

                <TableCell>{payroll.month}</TableCell>

                <TableCell>{payroll.year}</TableCell>

                <TableCell>₹ {payroll.grossSalary}</TableCell>

                <TableCell>₹ {payroll.netSalary}</TableCell>

                <TableCell>{payroll.generatedDate}</TableCell>

                <TableCell align="center">
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(payroll.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No Payroll Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PayrollTable;
