require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const routes = require("./routes");
const app = express();
const { HTTP_PORT } = process.env;

app.use(express.json());
app.use(morgan("dev"));
app.use(routes);
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Bimsillah bisa kedeploy",
  });
});
// 404 Handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: "false",
    message: "are you lost?",
  });
});
// 500 Handler
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "false",
    message: err.message,
  });
});

app.listen(HTTP_PORT, () => console.log("listening on port", HTTP_PORT));

module.exports = app;
