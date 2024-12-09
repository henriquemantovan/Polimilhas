import React, { useState } from "react";
import Header from "../Header";

const Admin: React.FC = () => {
  const [tokens, setTokens] = useState<number>(0);
  const [products, setProducts] = useState<{ name: string; price: string; file?: File }[]>([]);
  const [newProduct, setNewProduct] = useState<{ name: string; price: string; file?: File }>({
    name: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddTokens = () => {
    if (tokens > 0) {
      alert(`Tokens aumentados em ${tokens}!`);
      setTokens(0);
    } else {
      alert("Insira um valor válido de tokens.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNewProduct({ ...newProduct, file });
      alert(`Arquivo "${file.name}" selecionado.`);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, newProduct]);
      alert(`Produto "${newProduct.name}" adicionado com sucesso!`);
      setNewProduct({ name: "", price: "", file: undefined });
      setSelectedFile(null);
    } else {
      alert("Preencha todos os campos do produto.");
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
        padding: "1rem",
      }}
    >
      <Header />

      <h1
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          marginBottom: "1rem",
          color: "#2a738c",
        }}
      >
        Painel do Administrador
      </h1>

      {/* Seção de Tokens */}
      <div
        style={{
          marginBottom: "2rem",
          textAlign: "center",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#fff" }}>Aumentar Tokens</h2>
        <input
          type="number"
          value={tokens}
          onChange={(e) => setTokens(Number(e.target.value))}
          placeholder="Quantidade de tokens"
          style={{
            padding: "0.5rem",
            width: "100%",
            maxWidth: "300px",
            marginBottom: "1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #2a738c",
            outline: "none",
          }}
        />
        <button  className="button-hover"
          onClick={handleAddTokens}
          style={{
            padding: "0.7rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#1c3f5a",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          Aumentar Tokens
        </button>
      </div>

      <div
        style={{
          marginBottom: "2rem",
          textAlign: "center",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#fff" }}>Inserir Produto</h2>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          placeholder="Nome do produto"
          style={{
            padding: "0.5rem",
            width: "100%",
            maxWidth: "300px",
            marginBottom: "0.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #2a738c",
            outline: "none",
          }}
        />
        <input
          type="text"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          placeholder="Preço do produto"
          style={{
            padding: "0.5rem",
            width: "100%",
            maxWidth: "300px",
            marginBottom: "1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #2a738c",
            outline: "none",
          }}
        />

        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#488aec",
            color: "#ffffff",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            borderRadius: "0.5rem",
            gap: "0.75rem",
            border: "none",
            cursor: "pointer",
            boxShadow:
              "0 4px 6px -1px #488aec31, 0 2px 4px -1px #488aec17",
            transition: "all 0.6s ease",
            marginBottom: "1rem",
            width: "20%",
          }}
        >
          <svg
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <path
              strokeWidth="2"
              stroke="#ffffff"
              d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="3"
              stroke="#ffffff"
              d="M17 15V18M17 21V18M17 18H14M17 18H20"
            ></path>
          </svg>
          <span>Adicionar Arquivo</span>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>

        <button  className="button-hover"
          onClick={handleAddProduct}
          style={{
            padding: "0.7rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#1c3f5a",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          Adicionar Produto
        </button>
      </div>
    </div>
  );
};

export default Admin;
