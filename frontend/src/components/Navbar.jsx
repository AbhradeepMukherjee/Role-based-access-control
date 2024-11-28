import { GitHub } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Navbar({ pageType, role }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "inherit", color: "black", borderBottom: "2px solid black", }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Role-Based Access Control Blog Website
          </Typography>
          {pageType === "landing" ? (
            <Button color="inherit" onClick={handleLogin}>Login</Button>
          ) : (
            <Typography color="inherit">{role}</Typography>
          )}
          <a
            href="https://github.com/AbhradeepMukherjee/Role-based-access-control"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <IconButton
              className="github-button"
              color="inherit"
              sx={{ marginLeft: 2 }}
            >
              <GitHub sx={{ color: "black" }} />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
