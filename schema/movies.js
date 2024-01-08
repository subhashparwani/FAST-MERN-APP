const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  name: { type: String, required: true },
  director: { type: String, required: true },
  overview: { type: String, required: true },
  image: { type: String, required: true },
});

const Movie = model("movie", movieSchema);

module.exports = Movie;
