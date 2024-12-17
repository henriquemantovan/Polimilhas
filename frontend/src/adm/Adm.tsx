import React, { useState } from "react";
import Header from "../Header";
import { useTokenFunctions } from "../utils/token20Functions";


const Admin: React.FC = () => {
  const {CreateNewToken, Withdraw } = useTokenFunctions();
  const [tokens, setTokens] = useState<number>(0);
  const [products, setProducts] = useState<{ name: string; price: string, file?: File }[]>([]);
  const [newProduct, setNewProduct] = useState<{ name: string; price: string, file?: File }>({
    name: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  
  
  const handleAddTokens = async () => {
    if (tokens > 0) {
      try {
        const tx = await CreateNewToken(tokens); // Chamando a função CreateNewToken
        if (tx) {
          alert(`Tokens aumentados em ${tokens}!`);
          setTokens(0);
        } else {
          alert("Erro ao criar novos tokens.");
        }
      } catch (error) {
        console.error("Erro ao criar novos tokens:", error);
        alert("Ocorreu um erro ao tentar criar os tokens.");
      }
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

  const handleWithdraw = async () => {
    try {
      const tx = await Withdraw();
      if (tx) {
        alert("Dinheiro resgatado com sucesso!");
      } else {
        alert("Falha ao resgatar dinheiro.");
      }
    } catch (error) {
      console.error("Erro ao resgatar dinheiro:", error);
      alert("Ocorreu um erro ao tentar resgatar dinheiro.");
    }
  };

  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
          marginTop: "9rem", 
          fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
          marginBottom: "3rem",
          color: "#2a738c",
        }}
      >
        Painel do Administrador
      </h1>

      {/* containers */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* auemntar Tokens */}
        <div
          style={{
            flex: "1",
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
            height: "fit-content",
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
              width: "80%",
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
              backgroundColor: "#2a738c",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
              
            }}
          >
            Aumentar Tokens
          </button>
        </div>

        {/* inserir Produto */}
        <div
          style={{
            flex: "1",
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
            height: "fit-content",
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
              width: "80%",
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
              width: "80%",
              marginBottom: "1rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #2a738c",
              outline: "none",
            }}
          />
          <div 
            style={{
              display: "flex", 
              justifyContent: "center", 
              width: "100%", 
              marginBottom: "1rem"
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
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
                width: "80%", // Match the width of other inputs
              }}
            >
              <svg
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "1.5rem", height: "1.5rem" }}
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
          </div>
          <button  className="button-hover"
            onClick={handleAddProduct}
            style={{
              padding: "0.7rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#2a738c",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
            }}
          >
            Adicionar Produto
          </button>
        </div>

        {/* WITHDRAWN */}
        <div
          style={{
            flex: "1",
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
            height: "fit-content",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#fff" }}>Resgatar Dinheiro</h2>

          <button  className="button-hover"
            onClick={handleWithdraw}
            style={{
              padding: "0.7rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#2a738c",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
            }}
          >
            Resgatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
