const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/config");
require("dotenv").config();
const userRouter = require("./routes/user.routes");
const authentication = require("./middlewares/authentication");
const todoRouter = require("./routes/todos.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To My Database");
});

app.use("/user", userRouter);
app.use(authentication);
app.use("/todo", todoRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected To Database");
  } catch (err) {
    console.log("Error is Connecting Database");
    console.log(err);
  }
  console.log("Server is listening at PORT 8080");
});
