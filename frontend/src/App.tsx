import React from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import arquivoIcon from "../images/aviao.png";


import Header from "./Header";
import Criacao from "./criacao/Criacao";
import Resgate from "./resgate/Resgate";
import Tranferir from "./transferir/Transferir";

const CHAIN_ID = process.env.NODE_ENV === "development" ? hardhat.id : sepolia.id;


function LandingPage() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isConnected) {
      navigate("/Home"); // Redireciona para a página principal
    }
  }, [isConnected, navigate]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Fontes Serif', sans-serif",
        backgroundColor: "#F0F8FF",
        flexDirection: "row", // Mantém a organização em linha
      }}
    >
      {/* Contêiner esquerdo: Título e botão */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "50%", // Ocupa metade da tela
          padding: "2rem", // Adiciona espaçamento interno
          boxSizing: "border-box", // Inclui padding no cálculo de largura/altura
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 6rem)", // Ajusta o tamanho do texto dinamicamente
            fontWeight: "bold",
            color: "black",
            marginBottom: "2rem",
            textAlign: "center", // Centraliza o texto
          }}
        >
          POLIMILHAS
        </h1>

        <div className="custom-connect-button" style={{ textAlign: "center" }}>
          <ConnectButton />
        </div>
      </div>

      {/* Contêiner direito: Imagem */}
      <div
        style={{
          flex: 1, // Permite que a imagem ocupe o restante do espaço
          backgroundImage: `url(${arquivoIcon})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          width: "50%", // Ocupa metade da tela
          height: "100%", // Ajusta à altura do contêiner
        }}
      />
    </div>
  );
}


function Home() {
  const navigate = useNavigate();

  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();

  const isCorrectChain = CHAIN_ID === account.chainId;

  const Button = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <a
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "clamp(150px, 25vw, 300px)", // Largura ajustada dinamicamente
        height: "clamp(50px, 10vh, 80px)", // Altura ajustada dinamicamente
        fontSize: "clamp(1rem, 2vw, 1.5rem)", // Tamanho da fonte ajustado
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
      onClick={onClick}
    >
      <span
        style={{
          zIndex: "2",
          position: "relative",
        }}
      >
        {text}
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
        className="hoverEffect"
      ></div>
      <style>
        {`
          a:hover {
            transform: scale(1.05);
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh", //Garante que ocupe toda a altura da tela
        backgroundColor: "#F0F8FF",
        fontFamily: "'Fontes Serif', sans-serif",
        padding: "1rem", // Adiciona espaçamento interno
      }}
    >
      <Header />
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 8rem)", // Tamanho responsivo para o título
          fontWeight: "bold",
          color: "#2a738c",
          marginBottom: "-2rem",
          textAlign: "center",
        }}
      >
        POLIMILHAS
      </h1>
      <h2
        style={{
          fontSize: "clamp(1rem, 4vw, 1.5rem)", // Tamanho responsivo para o subtítulo
          color: "#333",
          marginBottom: "3rem",
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        O site foi feito para transformar a forma como você vê e usa milhas
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Permite que os botões quebrem em várias linhas
          justifyContent: "center",
          gap: "1rem", // Espaçamento entre os botões
        }}
      >
        <Button text="Criar Tokens" onClick={() => navigate("/criacao")} />
        <Button text="Resgatar Tokens" onClick={() => navigate("/resgate")} />
        <Button text="Transferir Tokens" onClick={() => navigate("/transferir")} />
      </div>
    </div>
  );
}


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/criacao" element={<Criacao />} />
        <Route path="/resgate" element={<Resgate />} />
        <Route path="/transferir" element={<Tranferir />} />
      </Routes>
    </div>
  );
}

export default App;
