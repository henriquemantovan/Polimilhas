
import React, { useState } from "react";
import Header from "../Header";

const Criacao: React.FC = () => {
  const [formData, setFormData] = useState({
    tokenName: "",
    symbol: "",
    supply: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Token criado com os dados:", formData);
    alert("Token criado com sucesso!");
    setFormData({
      tokenName: "",
      symbol: "",
      supply: "",
    });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #e0f7ff, #ffffff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'Asap', sans-serif",
      }}
    >    <Header />

      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#006c91" }}>
        Criar Token
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "2rem", color: "#42455a" }}>
        Preencha os detalhes abaixo para criar um novo token.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="tokenName"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#006c91",
            }}
          >
            Nome do Token
          </label>
          <input
            type="text"
            id="tokenName"
            name="tokenName"
            value={formData.tokenName}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="symbol"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#006c91",
            }}
          >
            Símbolo
          </label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label
            htmlFor="supply"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#006c91",
            }}
          >
            Suprimento Inicial
          </label>
          <input
            type="number"
            id="supply"
            name="supply"
            value={formData.supply}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#ffffff",
            backgroundColor: "#006c91",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#004f6e")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#006c91")
          }
        >
          Criar Token
        </button>
      </form>
    </div>
  );
};

export default Criacao;
