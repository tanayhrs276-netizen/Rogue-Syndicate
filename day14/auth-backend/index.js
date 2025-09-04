const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const cors = require('cors');
app.use(cors());


const app = express();
app.use(express.json());

const USERS_DB = './users.json';

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
}

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ email, password: passwordHash });
  writeUsers(users);
  res.json({ message: "User registered successfully" });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[4];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Access granted!", user });
  } catch {
    res.sendStatus(401);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
