import React, { useState } from "react";
import Header from "../Header";
import { useTokenFunctions } from "../utils/token20Functions";
import arquivoIcon from "../../images/aviao.png";



const Admin: React.FC = () => {
  const {CreateNewToken, Withdraw, sendTokens, setTokenPrice } = useTokenFunctions();
  const [tokensAdd, setTokensAdd] = useState<string>(""); // Muda para string
  const [tokensSend, setTokensSend] = useState<string>(""); // Muda para string
  const [tokensCost, setTokensCost] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [products, setProducts] = useState<{ name: string; price: string, file?: File }[]>([]);
  const [newProduct, setNewProduct] = useState<{ name: string; price: string, file?: File }>({
    name: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  
  
  const handleAddTokens = async () => {
    const tokensToAdd = Number(tokensAdd); // Converte para número
    if (tokensToAdd > 0) {
      try {
        const tx = await CreateNewToken(tokensToAdd); // Chamando a função CreateNewToken
        if (tx) {
          alert(`Tokens aumentados em ${tokensAdd}!`);
          setTokensAdd(0);
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

  const handleSendTokens = async () => {
    const tokensToSend = Number(tokensSend); // Converte para número
    if (tokensToSend > 0) {
      try {
        const tx = await sendTokens(address, tokensToSend);
        if (tx) {
          alert("Tokens enviados com sucesso!");
        } else {
          alert("Falha ao enviar tokens.");
        }
      } catch (error) {
        console.error("Erro ao enviar tokens:", error);
        alert("Ocorreu um erro ao tentar enviar tokens.");
      }
    } else {
      alert("Insira um valor válido de tokens.");
    }

  };

  const handleSetTokenPrice = async () => {
    const tokensToCost = Number(tokensCost); // Converte para número
    try {
      const tx = await setTokenPrice(tokensToCost);
      if (tx) {
        alert("Tokens enviados com sucesso!");
      } else {
        alert("Falha ao enviar tokens.");
      }
    } catch (error) {
      console.error("Erro ao enviar tokens:", error);
      alert("Ocorreu um erro ao tentar enviar tokens.");
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
        padding: "2rem",
      }}
    >
      <Header />
  
      <h1
        style={{
          marginTop: "2.5rem",
          fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
          marginBottom: "2rem",
          color: "#2a738c",
        }}
      >
        Painel do Administrador
      </h1>
  
      {/* containers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px",
          zIndex: 1,
        }}
      >
        {/* Amentar Tokens */}
        <div
          style={{
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#fff" }}>Aumentar Tokens</h2>
          <input
            type="number"
            value={tokensAdd}
            onChange={(e) => setTokensAdd(e.target.value)}
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
          <button
            className="button-hover"
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
  
        {/* Isererir Produto */}
        <div
          style={{
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
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
              marginBottom: "1rem",
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
                width: "80%",
              }}
            >
              <span>Adicionar Arquivo</span>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button
            className="button-hover"
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
  
        {/* Resgatar Dinheiro */}
        <div
          style={{
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#fff" }}>Resgatar Dinheiro</h2>
          <button
            className="button-hover"
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
  
        {/* Enviar Tokens */}
        <div
          style={{
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#fff" }}>Enviar Tokens</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Endereço do Destinatário"
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
          <input
            type="number"
            value={tokensSend}
            onChange={(e) => setTokensSend(e.target.value)}
            placeholder="Quantidade de Tokens"
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
          <button
            className="button-hover"
            onClick={handleSendTokens}
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
            Enviar
          </button>
        </div>
  
        {/* Definir Preço do Token a*/}
        <div
          style={{
            background: "#1c3f5a",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#fff" }}>Definir Preço do Token</h2>
          <input
            type="number"
            value={tokensCost}
            onChange={(e) => setTokensCost(e.target.value)}
            placeholder="Preço do Token"
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
          <button
            className="button-hover"
            onClick={handleSetTokenPrice}
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
            Definir
          </button>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${arquivoIcon})`,
          backgroundRepeat: "repeat",
          backgroundSize: "15%",
          opacity: 0.03,
          zIndex: 0,
        }}
      />
    </div>
  );
  
};

export default Admin;
