const express = require("express");
const tasks = require("./routes/tasks");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");

// midleware
app.use(express.static("./public"));
app.use(notFound);
app.use(express.json());
app.use("/api/v1/tasks", tasks);

const port = 3000;
const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.log(error);
  }
};

start();
