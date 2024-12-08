import React from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";


const Resgate: React.FC = () => {
  const handleResgate = () => {
    alert("Funciona");
  };
  const navigate = useNavigate();

  const handleVoltarHome = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#161c2d",
        color: "#fff",
        fontFamily: "'Asap', sans-serif",
        padding: "0.5rem",
      }}
    >
      <Header/>
      <h1
        style={{
          fontSize: "clamp(3.6rem, 4vw, 5rem)",
          color: "#2a738c",
          marginBottom: "0.2rem",
        }}
      >
        Resgatar Token
      </h1>

      <p
        style={{
          fontSize: "clamp(1.35rem, 1.5vw, 1.8rem)",
          color: "#ccc",
          textAlign: "center",
          maxWidth: "400px",
          marginBottom: "2rem",
        }}
      >
        Resgate os tokens disponiveis na conta do seu endereço
      </p>

      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "#2a738c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "clamp(2.5rem, 4vw, 2.5rem)",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onClick={handleResgate}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Resgate
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#2a738c",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "0.8rem",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onClick={handleVoltarHome}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ←
      </div>
    </div>
  );
};

export default Resgate;
