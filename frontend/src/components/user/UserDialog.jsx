import { useState } from "react";
import userService from "../../services/userService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";

const roles = ["ADMIN", "HR", "EMPLOYEE"];

function UserDialog({ open, onClose }) {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await userService.registerUser(user);

      alert("User created successfully.");

      onClose();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to create user.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add User</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          Save User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;
