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

// Get a to-do item
app.get('/todos/:task', async (req, res) => {
  const todo = await Todo.findOne({ task: req.params.task });
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

// Add a new to-do item
app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({
      task: req.body.task,
      completed: req.body.completed,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ error: 'Todo already exists' });
    } else {
      res.status(400).send({ error: error.message });
    }
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
