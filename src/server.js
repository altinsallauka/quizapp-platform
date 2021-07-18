const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes"); // includes the routes.js file
const cors = require("cors"); // includes cors module
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // We're telling express to use CORS
app.use(express.json()); // we need to tell server to use json as well
app.use(routes); // tells the server to use the routes in routes.js
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(
  process.env.DATABASE_URL || config.connectionString,
  connectionOptions
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database connected"));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./users/users.controller"));

// global error handler
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(process.env.port || 3001, () => {
  console.log("The api is running...");
});
mongoose.Promise = global.Promise;

module.exports = {
  User: require("./users/user.model"),
};
