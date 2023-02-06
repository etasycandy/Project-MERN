#!/usr/bin/env node
require("dotenv").config();

/**
 * Module dependencies.
 */
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose");

let indexRouter = require("./src/routes/index");
let usersRouter = require("./src/routes/users");
let apiRouterV1 = require("./src/routes/api/v1");

let app = express();

/**
 * Connect to Database.
 */
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log(`Mongodb Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Failed to connect to database: " + err.message);
    process.exit(1);
  }
};

connectDB();

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "src/public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/v1", apiRouterV1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
