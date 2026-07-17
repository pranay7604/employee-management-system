import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

import UserDialog from "../../components/user/UserDialog";
import userService from "../../services/userService";

function User() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredUsers(result);
  }, [search, users]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await userService.deleteUser(id);

      loadUsers();
    } catch (error) {
      console.error(error);

      alert("Unable to delete user.");
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "error";

      case "HR":
        return "warning";

      case "EMPLOYEE":
        return "success";

      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">User Management</Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add User
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search by Name, Email or Role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1 }} />,
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>

              <TableCell>
                <b>Full Name</b>
              </TableCell>

              <TableCell>
                <b>Email</b>
              </TableCell>

              <TableCell>
                <b>Role</b>
              </TableCell>

              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>

                <TableCell>{user.fullName}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <Chip
                    label={user.role}
                    color={getRoleColor(user.role)}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserDialog
        open={open}
        onClose={() => {
          setOpen(false);

          loadUsers();
        }}
      />
    </Box>
  );
}

export default User;
