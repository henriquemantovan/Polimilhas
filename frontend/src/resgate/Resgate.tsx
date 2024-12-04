
import React, { useState } from "react";

const Resgatar: React.FC = () => {
  const [formData, setFormData] = useState({
    tokenAmount: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return; 
    
    setIsProcessing(true);
    try {
      // aq faz a interação com o  contrato)
      console.log("Resgatando tokens:", formData.tokenAmount);
      alert(`Tokens resgatados: ${formData.tokenAmount}`);
      setFormData({ tokenAmount: "" });
    } catch (error) {
      console.error("Erro ao resgatar token:", error);
      alert("Houve um erro ao resgatar os tokens. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
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
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#006c91" }}>
        Resgatar Token
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "2rem", color: "#42455a" }}>
        Informe a quantidade de tokens que deseja resgatar.
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
            htmlFor="tokenAmount"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#006c91",
            }}
          >
            Quantidade de Tokens
          </label>
          <input
            type="number"
            id="tokenAmount"
            name="tokenAmount"
            value={formData.tokenAmount}
            onChange={handleInputChange}
            required
            min="1"
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
          disabled={isProcessing}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#004f6e")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#006c91")
          }
        >
          {isProcessing ? "Processando..." : "Resgatar Tokens"}
        </button>
      </form>
    </div>
  );
};

export default Resgatar;
