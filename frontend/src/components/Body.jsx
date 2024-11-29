import { 
  Box, 
  Divider, 
  IconButton, 
  Skeleton, 
  Typography, 
  TextField, 
  Button, 
  Modal 
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserDetails } from "../context/userContext";
import EditIcon from '@mui/icons-material/Edit';
import BlogCard from "./BlogCard";

export default function Body() {
  const [flag, setFlag] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
      setError(error.response?.data?.error || error.message);
    }
  };

  const handleCreateBlogs = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/v1/posts",
        { title, content },
        { withCredentials: true }
      );
      if (resp.status === 201) {
        setFlag(!flag); 
        setOpenModal(false); 
        setTitle(""); 
        setContent("");
      }
    } catch (err) {
      console.log(err.response?.data?.error || err.message);
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
          return (
            <BlogCard
              key={blog._id}
              blogId={blog._id}
              title={blog?.title}
              content={blog?.content}
              authorId={blog?.author?._id}
              authorUsername={blog?.author?.username}
              setFlag={setFlag}
            />
          );
        })}
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          border: "1px solid black",
          borderRadius: "100%",
          bottom: 10,
          right: 5,
        }}
        onClick={() => setOpenModal(true)}
      >
        <EditIcon />
      </IconButton>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 400,
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Write Blog
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            onClick={handleCreateBlogs}
            sx={{ alignSelf: "center", width: "50%" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
