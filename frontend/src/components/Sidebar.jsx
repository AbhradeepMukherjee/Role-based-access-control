import { Home, Key, Logout, People, Search } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function Sidebar({ roleType, handleLogout }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ width: "15%", minHeight: "100vh", borderRight: "1px solid black" }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>navigate("/dashboard")}>
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Home />
              <ListItemText primary={"Home"} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Search />
              <ListItemText primary={"Explore"} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {roleType === "Admin" && (
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate("/manage-users")}>
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <People />
                <ListItemText primary={"Manage Users"} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={()=>{navigate("/change-password")}}>
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Key />
              <ListItemText primary={"Change Passwords"} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Logout />
              <ListItemText primary={"Logout"} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
