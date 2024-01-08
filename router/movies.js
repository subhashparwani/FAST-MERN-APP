const express = require("express");
const router = express.Router();

const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movies");

router.get("/getmovies", getMovies);

router.post("/addmovie", addMovie);

router.put("/updatemovie/:id", updateMovie);

router.delete("/deletemovie/:id", deleteMovie);

module.exports = router;
