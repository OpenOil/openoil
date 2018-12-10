const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const config = require("../mongo.config");
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 8080;

const users = require("./routes/user");

// Set up Mongoose
mongoose
  .connect(
    isDev ? config.db_dev : config.db,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

const app = express();

app.use(passport.initialize());
require("./passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);
app.use(express.static("build"));

app.get("/", function(req, res) {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
