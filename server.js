// Import modules
const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/mongoose");

// Loading enviroment variables
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;

// Connecting database
db();

const app = express();
app.use(express.json());

// Handling routes
app.use("/", require("./routes/index"));

// Starting the server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server");
  } else console.log(`Server started on port ${PORT}`);
});

module.exports = app;
