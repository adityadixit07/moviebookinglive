import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err), setLoading(false));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h5"
        padding={2}
        width="20%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
        borderRadius={"30px"}
      >
        All Movies
      </Typography>
      {loading ? (
        <CircularProgress size={34} />
      ) : (
        <Box
          width={"100%"}
          margin="auto"
          marginTop={5}
          display={"flex"}
          justifyContent="flex-start"
          flexWrap={"wrap"}
        >
          {movies &&
            movies.map((movie, index) => (
              <MovieItem
                key={index}
                id={movie._id}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
              />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default Movies;
