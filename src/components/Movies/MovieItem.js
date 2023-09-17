import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const navigate = useNavigate();
  const handleBookClick = (e, val) => {
    if (!isUserLoggedIn) {
      toast.error("Please login to Book movie");
      navigate("/auth");
    }
    // if (isUserLoggedIn) {
    //   navigate(`booking/${id}`);
    // }
  };

  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        border: "2px solid orangered",
      }}
    >
      <img height={"50%"} width="100%" src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        {isAdminLoggedIn ? (
          ""
        ) : (
          <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            to={isUserLoggedIn ? `booking/${id}` : "/auth"}
            sx={{
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
            onClick={handleBookClick}
          >
            Book
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieItem;
