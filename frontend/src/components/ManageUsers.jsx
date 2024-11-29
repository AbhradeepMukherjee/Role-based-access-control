import { Box, Divider, IconButton, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { useGetUserDetails } from "../context/userContext";
import UserCards from "./UserCards";

export default function ManageUsers() {
  const [flag, setFlag] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetails } = useGetUserDetails();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/api/v1/users", {
        withCredentials: true,
      });
      if (resp.status === 200) {
        console.log(resp?.data);
        setUsers(resp?.data);
        setLoading(false);
      }
    } catch (error) {
      setError(err.response?.data?.error || err.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [flag]);

  return (
    <Box sx={{ paddingY: 3, paddingX: 10, minWidth: "60%", position: "relative" }}>
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
      <Typography sx={{ fontSize: "2rem", color: "black" }}>
        Users:
      </Typography>
      <Divider />
      {loading && (
         <Box
         sx={{
           bgcolor: 'inherit',
           p: 6,
           width: '60%',
           display: 'flex',
           justifyContent: 'start',
         }}
       >
         <Skeleton
           sx={{ bgcolor: 'grey.300' }}
           variant="rectangular"
           width={350}
           height={118}
         />
         <Skeleton
           sx={{ bgcolor: 'grey.300' }}
           variant="rectangular"
           width={350}
           height={118}
         />
         <Skeleton
           sx={{ bgcolor: 'grey.300' }}
           variant="rectangular"
           width={350}
           height={118}
         />
         <Skeleton
           sx={{ bgcolor: 'grey.300' }}
           variant="rectangular"
           width={350}
           height={118}
         />
       </Box>
      )}
      <Box
        sx={{
          bgcolor: "inherit",
          p: 6,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "2rem",
        }}
      >
        {users?.map((user, _) => {
          return <UserCards key={user._id} email={user?.email} username={user?.username} userId={user?._id} role={user?.role} setFlag={setFlag}/>;
        })}
      </Box>
    </Box>
  );
}
