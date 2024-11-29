import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function UsersCard({ userId, email, username, role, setFlag }) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const roles = ["Admin", "Editor", "Viewer"]; // All available roles
  const availableRoles = roles.filter((r) => r !== role); // Exclude the user's current role

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleModalToggle = () => setOpen(!open);

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.patch(
        `http://localhost:8000/api/v1/users/role/${userId}`,
        { role: selectedRole },
        { withCredentials: true }
      );
      if (resp?.status === 200) {
        console.log(resp?.data);
        setFlag((prev) => !prev);
        setSnackbar({
          open: true,
          message: resp?.data?.message,
          severity: "success",
        });
      }
    } catch (err) {
      const error = err.response?.data?.error || err.message;
      setSnackbar({ open: true, message: error, severity: "error" });
    } finally {
      handleModalToggle();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box
        sx={{
          minWidth: 350,
          minHeight: 118,
          bgcolor: "inherit",
          border: "1px solid black",
          borderRadius: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {email}
          </Typography>
          <Button variant="contained" size="small" onClick={handleModalToggle}>
            {role}
          </Button>
        </Box>
        <Typography
          variant="caption"
          sx={{
            alignSelf: "flex-end",
            fontWeight: "bold",
            color: "grey.700",
          }}
        >
          {username}
        </Typography>
      </Box>

      <Modal open={open} onClose={handleModalToggle}>
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            mx: "auto",
            mt: "10vh",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {email}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Select Role:
            </Typography>
            <RadioGroup value={selectedRole} onChange={handleRoleChange}>
              {availableRoles.map((roleOption) => (
                <FormControlLabel
                  key={roleOption}
                  value={roleOption}
                  control={<Radio />}
                  label={roleOption}
                />
              ))}
            </RadioGroup>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleUpdateRole}
              disabled={!selectedRole} // Disable the button if no role is selected
            >
              Update Role
            </Button>
          </Box>
        </Box>
      </Modal>

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
    </>
  );
}
