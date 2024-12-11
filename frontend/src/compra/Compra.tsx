import React, { useState } from "react";
import Header from "../Header";
import { useTokenFunctions } from "../utils/token20Functions";

const { readPoliMilhasTokenCost, buyTokens } = useTokenFunctions();

if (readPoliMilhasTokenCost !== undefined) {
  const price = readPoliMilhasTokenCost.toString();
  console.log("Token price:", readPoliMilhasTokenCost.toString());
} else {
  console.error("Failed to fetch token price: value is undefined.");
}

const handleCompra2 = async () => {
  try {
    const tx = await buyTokens(value);
    console.log("Buy tokens:", tx);
  } catch (error) {
    console.error("Error buying tokens:", error);
  }
};

const OpcaoButton = ({
  text,
  onClick,
  selected,
  price,
}: {
  text: string;
  onClick: () => void;
  selected: boolean;
  price: string;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "clamp(100px, 15vw, 140px)",
      height: "clamp(50px, 10vh, 70px)",
      fontSize: "clamp(0.9rem, 1vw, 1.2rem)",
      fontWeight: "bold",
      color: selected ? "#fff" : "#333",
      backgroundColor: selected ? "#2a738c" : "#e0e0e0",
      borderRadius: "8px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      margin: "0.5rem",
      transition: "transform 0.2s ease, background-color 0.2s ease",
      textAlign: "center",
      padding: "0.5rem",
    }}
    onClick={onClick}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.1)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}>
    <div
      style={{
        fontSize: "clamp(1rem, 2vw, 1.3rem)",
        marginBottom: "0.3rem",
      }}>
      {text}
    </div>
    <div
      style={{
        fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
      }}>
      {price}
    </div>
  </div>
);

const CompraBotao = ({ onClick }: { onClick: () => void }) => (
  <a
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "clamp(200px, 30vw, 400px)",
      height: "clamp(70px, 12vh, 100px)",
      fontSize: "clamp(1rem, 2vw, 1.5rem)",
      fontWeight: "bold",
      textDecoration: "none",
      color: "#2a738c",
      backgroundColor: "#fff",
      borderColor: "#2a738c",
      borderRadius: "12px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      position: "relative",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      marginBottom: "1rem",
    }}
    onClick={onClick}>
    <span
      style={{
        zIndex: "2",
        position: "relative",
      }}>
      Comprar
    </span>
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "#2a738c",
        transform: "translateY(100%)",
        transition: "transform 0.3s ease",
        zIndex: "1",
      }}
      className="hoverEffect"></div>
    <style>
      {`
        a:hover {
          transform: scale(1.1);
          box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
        }
        a:hover .hoverEffect {
          transform: translateY(0);
        }
        a:hover span {
          color: #333;
        }
      `}
    </style>
  </a>
);

const Compra: React.FC = () => {
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);

  const opcoes = [
    { quantidade: 50, preco: "5 XRP" },
    { quantidade: 100, preco: "9 XRP" },
    { quantidade: 200, preco: "17 XRP" },
    { quantidade: 400, preco: "33 XRP" },
    { quantidade: 800, preco: "65 XRP" },
    { quantidade: 1500, preco: "120 XRP" },
    { quantidade: 3000, preco: "230 XRP" },
    { quantidade: 5000, preco: "370 XRP" },
  ];

  const handleSelectQuantity = (quantidade: number) => {
    setSelectedQuantity(quantidade);
  };

  const handleCompra = () => {
    if (selectedQuantity) {
      alert(`Compra realizada: ${selectedQuantity} tokens!`);
      setSelectedQuantity(null);
    } else {
      alert("Compra não realizada.");
    }
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
      }}>
      <Header />

      <h1
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          marginBottom: "1rem",
          color: "#2a738c",
        }}>
        Compra de Tokens
      </h1>

      <p
        style={{
          marginBottom: "1.7rem",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "#ccc",
          textAlign: "center",
        }}>
        Selecione a quantidade desejada e clique no botão para concluir a compra.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          justifyItems: "center",
          marginBottom: "2rem",
          width: "100%",
          maxWidth: "700px",
        }}>
        {opcoes.map((opcao) => (
          <OpcaoButton
            key={opcao.quantidade}
            text={`${opcao.quantidade} Tokens`}
            price={opcao.preco}
            selected={selectedQuantity === opcao.quantidade}
            onClick={() => handleSelectQuantity(opcao.quantidade)}
          />
        ))}
      </div>

      <CompraBotao onClick={handleCompra} />
    </div>
  );
};

export default Compra;
