import React, { useState } from "react";
import "./App.css"; 

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1 className="title">📝 To-Do List</h1>

        <div className="input-area">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-btn">
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((item, index) => (
            <li key={index} className="todo-item">
              <span>{item}</span>
              <button onClick={() => deleteTask(index)} className="delete-btn">
                ❌
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p className="empty-msg">No tasks yet!</p>}
      </div>
    </div>
  );
}
