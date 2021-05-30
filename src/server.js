const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes"); // includes the routes.js file
const cors = require("cors"); // includes cors module
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
require("dotenv").config();

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

// app.get("/test", (req, res) => {
//   console.log(connection.db.sample_airbnb);
// });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database connected"));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./users/users.controller"));

// global error handler
app.use(errorHandler);

app.listen(3001, () => {
  console.log("The api is running...");
});
