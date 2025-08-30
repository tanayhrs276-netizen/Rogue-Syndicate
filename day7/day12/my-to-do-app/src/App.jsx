import React, { useState } from 'react';
import TaskList from './TaskList';
import CreateTask from './CreateTask';
import axios from 'axios';

function App() {
  // State changes to trigger reload of the task list
  const [reload, setReload] = useState(false);

  // Function to refresh tasks after add/delete
  const refreshTasks = () => setReload(!reload);

  // Delete function passed to TaskList
  const handleDelete = (id) => {
    axios.delete( `http://localhost:5000/api/todos/${id}`)
      .then(() => refreshTasks())
      .catch(error => console.error("Delete failed:", error));
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h1>To-Do App</h1>
      <CreateTask refreshTasks={refreshTasks} />
      <TaskList reload={reload} handleDelete={handleDelete} />
    </div>
  );
}

export default App;