import React, { useState } from "react";
import Header from "../Header";
import arquivoIcon from "../../images/aviao.png";
import { useTokenFunctions } from "../utils/token20Functions";

//ADMINISTRAR TOKENS
//APPROVE
const TransferirTokens: React.FC = () => {
  const { senToAnotherUser } = useTokenFunctions();
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);;
  const [mensagem, setMensagem] = useState("");



  const handleTransferencia = async () => {
    if (!endereco || quantidade <= 0) {
      setMensagem("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setMensagem("Transferindo tokens...");
    try {
      const resultado = await senToAnotherUser(quantidade, endereco);
      if (resultado) {
        setMensagem("Tokens transferidos com sucesso!");
      } else {
        setMensagem("Erro na transferência. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro na transferência de tokens:", error);
      setMensagem("Erro inesperado ao transferir tokens.");
    }

    setEndereco("");
    setQuantidade(0);
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
        position: "relative",
        fontFamily: "'Asap', sans-serif",
        padding: "1rem",
        
      }}
    >
      <Header />
      <h1
        style={{
          fontSize: "clamp(2rem, 3vw, 3rem)",
          color: "#2a738c",
          marginBottom: "0rem",
        }}
      >
        Transferir Tokens
      </h1>

      <p
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1rem)",
          color: "#ccc",
          textAlign: "center",
          maxWidth: "400px",
          marginBottom: "3rem",
        }}
      >
        Preencha os campos abaixo para transferir seus tokens para o endereço desejado.
      </p>

      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
            color: "#ddd",
            marginBottom: "0.3rem",
          }}
        >
          Endereço do Destinatário
        </label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          style={{
            width: "clamp(200px, 20vw, 250px)", // Input ajustado para tamanho menor
            height: "35px",
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #333",
            fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
            outline: "none",
            zIndex: 3,
            position: "relative",
          }}
        />
      </div>

      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 3,
          position: "relative",
        }}
      >
        <label
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
            color: "#ddd",
            marginBottom: "0.3rem",
            zIndex: 3,
            position: "relative",
          }}
        >
          Quantidade de Tokens
        </label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          style={{
            width: "clamp(200px, 20vw, 250px)", // Input ajustado para tamanho menor
            height: "35px",
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #333",
            fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
            outline: "none",
            zIndex: 3,
            position: "relative",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "clamp(250px, 35vw, 500px)", 
          height: "clamp(70px, 15vh, 100px)", 
          backgroundColor: "#2a738c",
          color: "#fff",
          fontSize: "clamp(1.2rem, 2vw, 2rem)",
          fontWeight: "bold",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          zIndex: 3,
          position: "relative",

        }}
        onClick={handleTransferencia}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Transferir
      </div>
      {mensagem && (
        <p
          style={{
            marginTop: "1rem",
            fontSize: "clamp(0.8rem, 1.2vw, 1.1rem)",
            color: mensagem.includes("sucesso") ? "#2a738c" : "#f00",
          }}
        >
          {mensagem}
        </p>
      )}

      <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${arquivoIcon})`,
      backgroundRepeat: "repeat", // Repete a imagem em todo o fundo
      backgroundSize: "15%", 
      opacity: 0.03,
      zIndex: 2,
    }}
  />
    </div>
  );
};

export default TransferirTokens;
