const express = require("express");
const mongoose = require("mongoose");
const os = require("os");
const cors = require("cors");

/* FROM MERN BOILERPLATE
const fs = require("fs");
const historyApiFallback = require("connect-history-api-fallback");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("../webpack.config");
*/

const config = require("../mongo.config");
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

// Set up Mongoose
mongoose.connect(
  isDev ? config.db_dev : config.db,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

// API routes
require("./routes")(app);

app.listen(port, () => console.log("Listening on port " + port + "!"));

module.exports = app;
