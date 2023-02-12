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
app.put('/todos/:task', async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { task: req.params.task },
    {
      task: req.body.task,
      completed: req.body.completed,
    },
    {
      new: true,
    }
  );
  res.json(todo);
});

// Delete a to-do item
app.delete('/todos/:task', async (req, res) => {
  const todo = await Todo.findOneAndDelete({ task: req.params.task });
  if (!todo) return res.status(404).send({ error: 'Todo not found' });
  res.send(todo);
});

module.exports = app;
