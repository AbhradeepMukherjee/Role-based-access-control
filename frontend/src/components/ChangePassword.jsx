import {
  Box,
  Divider,
  IconButton,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import Navbar from "./Navbar";
import { useGetUserDetails } from "../context/userContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export default function ChangePassword() {
  const { userDetails } = useGetUserDetails();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };
  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    console.log("submitted");
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/users",
        { email: userDetails?.email, password, newPassword },
        { withCredentials: true }
      );
      if (res?.status === 200) {
        console.log("handled");
        setSnackbar({
          open: true,
          message: "Password changed successfully",
          severity: "success",
        });
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      setSnackbar({
        open: true,
        message: error.response?.data?.error,
        severity: "error",
      });
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        bgcolor: "inherit",
        color: "black",
      }}
    >
      <Navbar pageType={"dashboard"} role={userDetails?.role || ""} />
      <Box
        sx={{
          paddingX: 10,
          paddingY: 5,
          textAlign: "center",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            border: "1px solid black",
            borderRadius: "100%",
            top: 10,
            left: 5,
          }}
          onClick={() => navigate("/dashboard")}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ fontSize: "2rem", fontWeight: "semibold" }}>
          Change Password
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "3rem",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: "semibold" }}>
              Username: {userDetails?.username}
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: "semibold" }}>
              Role: {userDetails?.role}
            </Typography>
            <Divider />
          </Box>
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: "semibold" }}>
            Current Password:
          </Typography>
          <TextField
            label="Current Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{
              style: { color: "black" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    style={{ color: "black" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              marginTop: "1rem",
              input: { backgroundColor: "inherit" },
            }}
          />
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: "semibold" }}>
            New Password:
          </Typography>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{
              style: { color: "black" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleNewPasswordVisibility}
                    edge="end"
                    style={{ color: "black" }}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              marginTop: "1rem",
              input: { backgroundColor: "inherit" },
            }}
          />
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: "semibold" }}>
            Confirm New Password:
          </Typography>
          <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type={showConfirmNewPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{
              style: { color: "black" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmNewPasswordVisibility}
                    edge="end"
                    style={{ color: "black" }}
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              marginTop: "1rem",
              input: { backgroundColor: "inherit" },
            }}
          />
        </Box>

        <Box sx={{ marginTop: "3rem" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", padding: "1rem", fontSize: "1.2rem" }}
            onClick={handleSubmit}
          >
            Change Password
          </Button>
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
          {String(snackbar.message)}
        </Alert>
      </Snackbar>
    </Box>
  );
}
