import { Box, Divider, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserDetails } from "../context/userContext";
import BlogCard from "./BlogCard";

export default function Body() {
  const [flag, setFlag] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetails } = useGetUserDetails();
  const [error, setError] = useState("");
  const fetchBlogs = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/api/v1/posts", {
        withCredentials: true,
      });
      if (resp.status === 200) {
        console.log(resp.data);
        setBlogs(resp?.data);
        setLoading(false);
      }
    } catch (error) {
      setError(err.response?.data?.error || err.message);
      setSnackbar({ open: true, message: error, severity: "error" });
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, [flag]);

  return (
    <Box sx={{ paddingY: 3, paddingX: 10, minWidth: "60%" }}>
      <Typography sx={{ fontSize: "2rem", color: "black" }}>
        Blogs for {userDetails?.username}
      </Typography>
      <Divider />
      {loading && (
        <Box
          sx={{
            bgcolor: "inherit",
            p: 8,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "2rem",
          }}
        >
          <Skeleton
            sx={{ bgcolor: "grey.300" }}
            variant="rectangular"
            width={410}
            height={218}
          />
          <Skeleton
            sx={{ bgcolor: "grey.300" }}
            variant="rectangular"
            width={410}
            height={218}
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
        {blogs?.map((blog, _) => {
          return <BlogCard key={blog._id} title={blog?.title} content={blog?.content} authorId={blog?.author?._id} authorUsername={blog?.author?.username}/>;
        })}
      </Box>
    </Box>
  );
}
