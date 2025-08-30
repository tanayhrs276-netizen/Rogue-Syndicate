const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Build a To-Do App" }
];

// Fetch all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = { id: Date.now(), title: req.body.title };
  todos.push(newTodo);
  res.json(newTodo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(5000, () => console.log('Server running on port 5000'));