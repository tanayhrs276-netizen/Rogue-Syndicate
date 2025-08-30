// TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ reload, refreshTasks }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTasks(response.data));
  }, [reload]);

  // Delete handler
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => refreshTasks());
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.title}
          <button style={{ marginLeft: 10 }} onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;