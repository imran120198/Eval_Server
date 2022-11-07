const express = require("express");
const TodoModel = require("../models/Todo.model");

const todoRouter = express.Router();

todoRouter.post("/create", async (req, res) => {
  const { taskname, status, tag, userId } = req.body;
  const new_todo = new TodoModel({
    taskname,
    status,
    tag,
    userId,
  });
  await new_todo.save();
  res.send({ message: "Todo Created", new_todo });
});

todoRouter.get("/", async (req, res) => {
  const { userId } = req.body;
  const todos = await TodoModel.find({ userId });
  res.send(todos);
});

todoRouter.patch("/:todosId/edit", async (req, res) => {
  const { todosId } = req.params;
  const { userId } = req.body;
  const todo = await TodoModel.findOne({ _id: todosId });

  if (todo.userId === userId) {
    const new_todo = await TodoModel.findOneAndUpdate(
      { _id: todosId },
      req.body,
      { new: true }
    );
    return res.send({ message: "Todo get Updated", new_todo });
  } else {
    return res.send("Not Authorized");
  }
});

todoRouter.delete("/:todoId/delete", async (req, res) => {
  const { todosId } = req.params;
  const { userId } = req.body;

  const todo = await TodoModel.findOne({ _id: todosId });
  if (todo.userId === userId) {
    await TodoModel.findOneAndDelete({ _id: todosId });
    return res.send({ message: "Todo Successfully Deleted" });
  } else {
    return res.send("Not Authorized");
  }
});

module.exports = todoRouter;
