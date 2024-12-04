import React, { useState } from "react";

const Transferir: React.FC = () => {
  const [formData, setFormData] = useState({
    recipientAddress: "",
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
      console.log("Transferindo tokens:", formData.tokenAmount, "para", formData.recipientAddress);
      alert(`Tokens transferidos: ${formData.tokenAmount} para ${formData.recipientAddress}`);
      setFormData({ recipientAddress: "", tokenAmount: "" });
    } catch (error) {
      console.error("Erro ao transferir tokens:", error);
      alert("Houve um erro ao transferir os tokens. Tente novamente.");
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
        Transferir Tokens
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "2rem", color: "#42455a" }}>
        Informe o endereço do destinatário e a quantidade de tokens a serem transferidos.
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
            htmlFor="recipientAddress"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "1rem",
              color: "#006c91",
            }}
          >
            Endereço do Destinatário
          </label>
          <input
            type="text"
            id="recipientAddress"
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleInputChange}
            required
            placeholder="Digite o endereço do destinatário"
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
            placeholder="Digite a quantidade de tokens"
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
          {isProcessing ? "Processando..." : "Transferir Tokens"}
        </button>
      </form>
    </div>
  );
};

export default Transferir;
