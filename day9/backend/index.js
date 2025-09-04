// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const students = [
  { id: 1, name: 'Riya', email: 'riya@example.com', gpa: 8.6 },
  { id: 2, name: 'Aman', email: 'aman@example.com', gpa: 8.9 }
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(5000, () => console.log('Server running on port 5000'));
