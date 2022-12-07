require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddlware = require("./middleware/not-found");

const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");

//middlware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/products", productsRouter);

const port = process.env.PORT || 3000;

app.use(errorMiddleware);
app.use(notFoundMiddlware);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  try {
    app.listen(port, console.log(`Server is listening port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
