const express = require('express');
const app = express();
const port = 3000;

const students = [
  { id: 1, name: "Tanay", age: 20 },
  { id: 2, name: "Harsh", age: 22 },
  { id: 3, name: "Gaurav", age: 21 }
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.use(express.static('public')); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
