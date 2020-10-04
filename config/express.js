const express = require("express");
const bodyParser = require("body-parser");
const load = require("express-load");

module.exports = function () {
  const app = express();
  const port = process.env.PORT || 8080;

  app.set("port", port);
  app.use(express.static("./public"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(require("method-override")());

  app.set("view engine", "ejs");
  app.set("views", "./app/views");

  load("models", { cwd: "app" }).then("controllers").then("routes").into(app);

  return app;
};
