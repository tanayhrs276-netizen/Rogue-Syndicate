
function Dashboard() {
  return (
    <div>
      <h2>Welcome to the Dashboard (Protected)</h2>
      <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
    </div>
  );
}

export default Dashboard;
