import { useGetUserDetails } from "../context/userContext/index";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Turnstile } from "@marsidev/react-turnstile";
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const { setUserDetails, setUserLoggedIn } = useGetUserDetails();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!loading) {
      setloading(true);
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/auth/generate-otp`,
          { email },
          { withCredentials: true }
        );
        if (res?.status === 201) {
          setSnackbar({
            open: true,
            message: res.data.message,
            severity: "success",
          });
          console.log(res);
          setShowOtpField(true);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setSnackbar({ open: true, message: error, severity: "error" });
      } finally {
        setloading(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleVerifyOtp = async (e) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/reset-password`,
        { email, otp, newPassword: password, token },
        { withCredentials: true }
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
            Forgot Password
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={loading || showOtpField}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
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
                autoComplete="off"
              />
              <Typography
                variant="body2"
                sx={{ color: "#ffffff", marginLeft: "10px" }}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Box>
            <Turnstile onSuccess={(token)=>setToken(token)} siteKey="0x4AAAAAAA1FQ67RY3iWOyZn" />
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Typography variant="body2" style={{ color: "#ffffff" }}>
              Go back to{" "}
              <Link
                to="/login"
                style={{ color: "#90caf9", textDecoration: "none" }}
              >
                Login
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
