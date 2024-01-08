const express = require("express");
// const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const port = process.env.SERVER_PORT;
var cors = require("cors");
const { connect } = require("mongoose");
const path = require("path");

const clientPath = path.join(__dirname, "./dist");

const user_route = require("./router/users");
// const product_route = require('./router/products')
const movie_route = require("./router/movies");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/", express.static(clientPath));

//API ROUTES
app.use("/api", user_route);
// app.use('/api', product_route)
app.use("/api", movie_route);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// mongoose.connect(process.env.MONGO_URL)
//     .then((data) => console.log("Connected Successfully"))
//     .catch((err) => console.log(err))

connect(process.env.MONGO_URL).then(() => {
  console.log("db connected succesfully by subhash", clientPath);
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
});

//
