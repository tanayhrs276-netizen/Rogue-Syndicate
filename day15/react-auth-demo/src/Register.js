import { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = localStorage.getItem(email);
    if (existing) {
      setMsg('Email is already registered!');
      return;
    }
    localStorage.setItem(email, JSON.stringify({ name, email, password }));
    setMsg('Successfully registered! You can login now.');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} /><br />
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Register</button>
      </form>
      <div>{msg}</div>
    </div>
  );
}

export default Register;
