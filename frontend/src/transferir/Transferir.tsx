import React, { useState } from "react";
import Header from "../Header";
import arquivoIcon from "../../images/aviao.png";
import { useTokenFunctions } from "../utils/token20Functions";

const AdminTokens: React.FC = () => {
  const { senToAnotherUser, Approve } = useTokenFunctions();
  const [endereco, setEndereco] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);;
  const [mensagem, setMensagem] = useState("");

  const [quantidadePermitir, setQuantidadePermitir] = useState<number>(0);
  const [mensagemPermitir, setMensagemPermitir] = useState("");

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

  const handlePermitir = async () => {
    if (quantidadePermitir <= 0) {
      setMensagemPermitir("Por favor, insira uma quantidade válida.");
      return;
    }

    setMensagemPermitir("Processando...");
    try {
      const resultado = await Approve(quantidadePermitir);
      if (resultado) {
        setMensagemPermitir("Tokens permitidos com sucesso!");
      } else {
        setMensagemPermitir("Erro ao permitir tokens.");
      }
    } catch (error) {
      console.error("Erro ao permitir tokens:", error);
      setMensagemPermitir("Erro inesperado ao permitir tokens.");
    }

    setQuantidadePermitir(0);
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
        position: "relative",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "4rem",
          flexWrap: "wrap",
          width: "95%",
          maxWidth: "1000px",
          
        }}
      >
        {/* Container Transferir Tokens */}
        <div
          style={{
            flex: 1,
            maxWidth: "450px",
            background: "#1c2233",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              color: "#2a738c",
              marginBottom: "-1rem",
              marginTop: "0rem",

            }}
          >
            Transferir Tokens
          </h1>
          <p style={{ color: "#ccc", marginBottom: "2rem" }}>
            Preencha os campos abaixo para transferir seus tokens para o endereço
            desejado.
          </p>
          <div>
            <label style={{ color: "#ddd" }}>Endereço do Destinatário</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              style={{
                width: "95%",
                marginBottom: "1rem",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #333",
              }}
            />
          </div>
          <div>
            <label style={{ color: "#ddd" }}>Quantidade de Tokens</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              style={{
                width: "95%",
                marginBottom: "1rem",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #333",
              }}
            />
          </div>
          <button  className="button-hover"
            onClick={handleTransferencia}
            style={{
              padding: "0.7rem 1.5rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#2a738c",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
              fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
              marginTop: "0.5rem",
            }}
          >
            Transferir
          </button>
          {mensagem && (
            <p
              style={{
                marginTop: "1rem",
                color: mensagem.includes("sucesso") ? "#2a738c" : "#f00",
              }}
            >
              {mensagem}
            </p>
          )}
        </div>

        {/* Container Permitir Tokens */}
        <div
          style={{
            flex: 1,
            maxWidth: "450px",
            background: "#1c2233",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              color: "#2a738c",
              marginBottom: "-1rem",
              marginTop: "0rem",
            }}
          >
            Permitir Tokens
          </h1>
          <p style={{ color: "#ccc", marginBottom: "2rem" }}>
            Insira a quantidade de tokens que deseja permitir para a compra de NFTs.
          </p>
          <div>
            <label style={{ color: "#ddd" }}>Quantidade de Tokens</label>
            <input
              type="number"
              value={quantidadePermitir}
              onChange={(e) => setQuantidadePermitir(Number(e.target.value))}
              style={{
                width: "95%",
                marginBottom: "1rem",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #333",
              }}
            />
          </div>
          <button  className="button-hover"
            onClick={handlePermitir}
            style={{
              padding: "0.7rem 1.5rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#2a738c",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
              fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
              marginTop: "0.5rem",

            }}
          >
            Permitir
          </button>
          {mensagemPermitir && (
            <p
              style={{
                marginTop: "1rem",
                color: mensagemPermitir.includes("sucesso") ? "#2a738c" : "#f00",
              }}
            >
              {mensagemPermitir}
            </p>
          )}
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

export default AdminTokens;
