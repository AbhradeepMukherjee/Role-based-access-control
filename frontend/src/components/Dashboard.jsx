import { useGetUserDetails } from "../context/userContext/index";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Alert, Box, Snackbar } from "@mui/material";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";
import axios from "axios";
import Body from "./Body";

export default function Dashboard() {
  const { userDetails, userLoggedIn, setUserLoggedIn, setUserDetails } =
    useGetUserDetails();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [error, setError] = useState("");
  const [roleType, setRoleType] = useState("Viewer");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("user details", userDetails);
    if (userLoggedIn) setRoleType(userDetails?.role);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setSnackbar({
          open: true,
          message: "Logout Successful",
          severity: "success",
        });
        setUserDetails(null);
        setUserLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      setSnackbar({ open: true, message: error, severity: "error" });
      console.error("Error during logout:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Navbar pageType={"dashboard"} role={roleType} />
      <Box sx={{ display: "flex" }}>
        <Sidebar roleType={roleType} handleLogout={handleLogout} />
        <Body/>
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
    </div>
  );
}
