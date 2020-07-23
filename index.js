// Import modules
const express = require("express");
const db = require("./config/mongoose");


const port = 8000;

const app = express();
app.use(express.json());

// Handling routes
app.use("/", require("./routes/index"));

// Starting the server
app.listen(port, function(err) {
  if (err) console.log(`Error in starting server`);
  else console.log(`Server started on port`);
});

module.exports = app;
