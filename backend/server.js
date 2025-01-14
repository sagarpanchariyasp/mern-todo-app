const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern-todo', { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
