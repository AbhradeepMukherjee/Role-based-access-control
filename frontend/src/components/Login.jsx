import { useGetUserDetails } from "../context/userContext/index";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userLoggedIn, setUserDetails, setUserLoggedIn } = useGetUserDetails();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/auth/login`,
          { email, password },
          { withCredentials: true }
        );
        if (res?.status === 200) {
          setSnackbar({
            open: true,
            message: res.data.message,
            severity: "success",
          });
          navigate("/dashboard");
          setUserLoggedIn(true);
          console.log(res);
          setUserDetails(res?.data?.user);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setSnackbar({ open: true, message: error, severity: "error" });
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#2c2c2c",
            padding: { xs: "20px", sm: "30px" },
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
            maxWidth: { xs: "100%", sm: "400px" },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            InputProps={{ style: { color: "#ffffff" } }}
            sx={{ input: { backgroundColor: "#333" }, mb: 2 }}
            autoComplete="off"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            InputProps={{
              style: { color: "#ffffff" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    style={{ color: "#ffffff" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ input: { backgroundColor: "#333" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Login"}
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
              <Link
                to="/forgot-password"
                style={{ color: "#90caf9", textDecoration: "none" }}
              >
                Forgot Password
              </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Typography variant="body2" style={{ color: "#ffffff" }}>
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#90caf9", textDecoration: "none" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
