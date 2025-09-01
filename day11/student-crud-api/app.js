const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let students = [
  { id: 1, name: 'Alice', age: 21 },
  { id: 2, name: 'Bob', age: 22 }
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const { name, age } = req.body;
  const newStudent = { id: students.length + 1, name, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send('Student not found');
  student.name = req.body.name;
  student.age = req.body.age;
  res.json(student);
});

app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Student not found');
  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
