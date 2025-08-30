// CreateTask.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ refreshTasks }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    axios.post('http://localhost:5000/api/todos', { title })
      .then(() => {
        setTitle('');
        refreshTasks();
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter Task"
        style={{ marginRight: 10 }}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateTask;