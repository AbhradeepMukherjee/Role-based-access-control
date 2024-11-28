import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetUserDetails } from "../context/userContext";

const BlogCard = ({ title, content, authorUsername, authorId, onDelete }) => {
  const { userDetails } = useGetUserDetails();
  return (
    <Card
      sx={{
        width: 410,
        height: 218,
        backgroundColor: "inherit",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          {userDetails?.role === "Admin" && (
            <IconButton
              onClick={() => onDelete(authorId)}
              sx={{
                color: "maroon",
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
        <Divider sx={{ marginBottom: 1, backgroundColor: "black" }} />
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: "gray",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontStyle: "italic", color: "gray" }}
        >
          @{authorUsername}
        </Typography>
      </Box>
    </Card>
  );
};

export default BlogCard;
