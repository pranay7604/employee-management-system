import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";

import {
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

import { login as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const response = await loginApi(formData);

      login(response);

      navigate("/dashboard");

    } catch (err) {

      setError("Invalid Email or Password");

    }

  };

  return (

    <Container
      maxWidth="sm"
      sx={{
        mt: 8
      }}
    >

      <Card elevation={8}>

        <CardContent>

          <Typography
            variant="h4"
            align="center"
            gutterBottom>

            Employee Management System

          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            mb={3}>

            Login

          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}>

            <TextField

              fullWidth
              margin="normal"

              label="Email"

              name="email"

              value={formData.email}

              onChange={handleChange}

            />

            <TextField

              fullWidth

              margin="normal"

              label="Password"

              type={showPassword ? "text" : "password"}

              name="password"

              value={formData.password}

              onChange={handleChange}

              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }>

                      {
                        showPassword
                          ? <VisibilityOff />
                          : <Visibility />
                      }

                    </IconButton>

                  </InputAdornment>
                )
              }}

            />

            {

              error &&

              <Typography
                color="error"
                mt={2}>

                {error}

              </Typography>

            }

            <Button

              type="submit"

              variant="contained"

              fullWidth

              sx={{
                mt: 3
              }}

            >

              Login

            </Button>

          </Box>

        </CardContent>

      </Card>

    </Container>

  );

}

export default Login;