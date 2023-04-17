require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const fs = require("fs/promises");

const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api/tasks");
const usersApiRouter = require("./routes/api/users");
const devicesApiRouter = require("./routes/api/devices");
const app = express();

console.log("process.env.SECRET_KEY: ", process.env.SECRET_KEY);
let cnt = 0;
let cnt404 = 0;
let cnt500 = 0;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(async (req, res, next) => {
  const {method, url} = req;
  const date = moment().format("LLLL"); //.format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile(
    "./public/server.log",
    `\n${date} - ${method} ${url} ${++cnt}`
  );
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/tasks", apiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/devices", devicesApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // console.log("cnt404: ", cnt404++);
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
  // console.log("cnt500: ", cnt500++);
});

module.exports = app;
