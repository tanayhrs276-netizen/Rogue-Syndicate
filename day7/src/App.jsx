import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#cd393961",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "32px 24px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Counter App</h2>
        <div style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          margin: "20px 0"
        }}>
          {count}
        </div>
        <div>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: "10px 18px",
              margin: "0 6px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              background: "#4caf50",
              color: "white",
              cursor: "pointer"
            }}>
            Increment
          </button>
          <button
            onClick={() => setCount(count > 0 ? count - 1 : 0)}
            style={{
              padding: "10px 18px",
              margin: "0 6px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              background: "#f44336",
              color: "white",
              cursor: "pointer"
            }}>
            Decrement
          </button>
          <button
            onClick={() => setCount(0)}
            style={{
              padding: "10px 18px",
              margin: "0 6px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              background: "#2196f3",
              color: "white",
              cursor: "pointer"
            }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
