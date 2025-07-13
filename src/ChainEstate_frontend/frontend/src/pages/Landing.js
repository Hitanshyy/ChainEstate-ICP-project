import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome to ChainEstate 🏡</h1>
      <p>A decentralized virtual land registry on the Internet Computer.</p>
      <button
        onClick={() => navigate("/home")}
        style={{
          padding: "10px 20px",
          fontSize: 18,
          cursor: "pointer",
          borderRadius: 5,
          backgroundColor: "#61dafb",
          border: "none",
          marginTop: 20,
        }}
      >
        Enter App
      </button>
    </div>
  );
};

export default Landing;
