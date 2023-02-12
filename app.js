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
  let completed = false;
  if (req.body.completed === 'True') {
    completed = true;
  }

  const todo = new Todo({
    task: req.body.task,
    completed: completed,
  });

  try {
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Todo validation failed', error });
  }
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

// Delete a to-do item
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id);
  res.json({ message: 'Todo item deleted' });
});

module.exports = app;
