const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo.mongo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all to-do items
app.get('/todos', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

// Add a new to-do item
app.post('/todos', async (req, res) => {
  const todo = new Todo({
    task: req.body.task,
    completed: req.body.completed,
  });
  await todo.save();
  res.json(todo);
});

// Update a to-do item
app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.task,
    {
      task: req.body.task,
      complete: req.body.completed,
    },
    {
      new: true,
    }
  );
  res.json(todo);
});



module.exports = app;
