const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Mongo!!")
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//route middleware
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

app.listen(process.env.PORT);
