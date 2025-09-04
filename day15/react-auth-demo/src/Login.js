import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
      localStorage.setItem('token', 'fake-jwt-token');
      setMsg('Login successful!');
      navigate('/dashboard');
    } else {
      setMsg('Invalid email or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Login</button>
      </form>
      <div>{msg}</div>
    </div>
  );
}

export default Login;
