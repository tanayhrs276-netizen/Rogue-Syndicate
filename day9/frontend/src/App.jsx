
import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);
  
  return (
    <div>
      <h1>Student Directory</h1>
      <ul>
        {students.map(s => (
          <li key={s.id}>
            <strong>{s.name}</strong> | {s.email} | GPA: {s.gpa}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

