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
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const { userLoggedIn, setUserDetails, setUserLoggedIn } = useGetUserDetails();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [uid, setUid] = useState("");
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

  useEffect(() => {
    let timer;
    if (showOtpField && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpField, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/auth/register`,
          { email, username, role, password },
          { withCredentials: true }
        );
        if (res?.status === 201) {
            console.log(res.data);
          setSnackbar({
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
          setShowOtpField(true);
          setTimeLeft(600);
          setUid(res?.data?.userId);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setSnackbar({ open: true, message: error, severity: "error" });
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/verify-email`,
        { userId: uid, otp }
      );
      if (res?.status === 200) {
        setSnackbar({
          open: true,
          message: "Email verified successfully!",
          severity: "success",
        });
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setSnackbar({ open: true, message: error, severity: "error" });
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
            Register
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
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            InputProps={{ style: { color: "#ffffff" } }}
            sx={{ input: { backgroundColor: "#333" }, mb: 2 }}
            autoComplete="off"
          />
          <InputLabel id="role-select-label" sx={{ color: "#ffffff" }}>
            Role
          </InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            onChange={handleChange}
            sx={{
              color: "#ffffff",
              backgroundColor: "#333",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "& .MuiSvgIcon-root": {
                color: "#ffffff",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#333",
                  color: "#ffffff",
                },
              },
            }}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </Select>
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
            disabled={showOtpField}
          >
            {isSigningIn ? "Registering..." : "Register"}
          </Button>
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                InputLabelProps={{ style: { color: "#ffffff" } }}
                InputProps={{ style: { color: "#ffffff" } }}
                sx={{ input: { backgroundColor: "#333" } }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#ffffff", marginLeft: "10px" }}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px" }}
              onClick={handleVerifyOtp}
              disabled={!showOtpField}
            >
              Verify OTP
            </Button>
          </>
          <Typography
            variant="body2"
            sx={{
              color: "#ffffff",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#90caf9", textDecoration: "none" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
