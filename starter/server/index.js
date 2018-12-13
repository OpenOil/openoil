const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const config = require("../mongo");
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
      console.log("Cannot connect to the database" + err);
    }
  );

const app = express();

app.use(cors());

app.use(passport.initialize());
require("./passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);
app.use(express.static(path.join(__dirname, "/../build")));

/* HANDLE cannot GET /URL error on refresh in production */
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
