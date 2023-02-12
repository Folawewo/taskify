const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo.mongo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/todos', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

module.exports = app;
