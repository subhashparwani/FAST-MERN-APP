require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../schema/movies");

// Establish MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMovie = async (req, res) => {
  const { name, director, overview, image } = req.body;

  if (name && director && overview && image) {
    try {
      const checkMovie = await Movie.exists({ name });

      if (!checkMovie) {
        const newMovie = await Movie.create({
          name,
          director,
          overview,
          image,
        });
        res
          .status(201)
          .json({ message: "Movie Created Successfully", movie: newMovie });
      } else {
        res.json({
          message: "Movie already exists",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  } else {
    res.status(403).json({
      message: "Required field(s) missing",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMovies, addMovie, updateMovie, deleteMovie };
