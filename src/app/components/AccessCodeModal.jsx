"use client"
import React, { useState } from "react";

export default function AccessCodeModal({ onSubmit, onClose }) {
  const [code, setCode] = useState("");
  return (
    <div className="accessModal" style={modalStyle}>
      <button onClick={onClose} style={{ float: "right", background:"rgba(0,0,0,0.7)", color: "rgb(124, 252, 0)", }}>X</button>
      <p>Please enter the access code to speak with Ada:</p>
      <input
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit(code)}
        style={inputStyle}
      />
      <button onClick={() => onSubmit(code)} style={buttonStyle}>+</button>
    </div>
  );
}

// Example inline styles; you can also reference an external CSS file.
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  zIndex: 10000,
  textAlign: "center",
  width: "320px",
  background: "rgba(0,0,0,0.7)",
  color: "rgb(124, 252, 0)"
};

const inputStyle = {
  padding: "8px 16px",
  fontSize: "1rem",
  margin: "10px",
  width: "80%",
  background: "rgba(0,0,0,0.7)",
  color: "#fff"
};

const buttonStyle = {
  padding: "8px 10px",
  fontSize: "1rem",
  cursor: "pointer",
  color: "rgb(124, 252, 0)",
  background: "rgba(0,0,0,0.7)"
};
