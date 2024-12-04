import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import arquivoIcon from "../images/aviao.png";
import fundo from "../images/fundo.png"

import Header from "./Header";
import Criacao from "./criacao/Criacao";
import Resgate from "./resgate/Resgate";
import Transferir from "./transferir/Transferir";

function NavigationBar() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'funcionalidades', 'objetivo', 'sobre-nos'];
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 150;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      });
    };

    if (location.pathname === '/Home') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location]);

  return <Header />;
}

function Home() {
  const navigate = useNavigate();

  const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      } else {
        reveal.classList.remove('active');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll(); // Initial check
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  const handleNavigation = (path: string, sectionId?: string) => {
    // If on the Home page and a section ID is provided, scroll to that section
    if (window.location.pathname === '/Home' && sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise, navigate to the specified route
      navigate(path);
    }
  };

  const Button = ({ 
    text, 
    path, 
    sectionId 
  }: { 
    text: string; 
    path: string; 
    sectionId?: string 
  }) => (
    <a
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "clamp(150px, 25vw, 300px)",
        height: "clamp(50px, 10vh, 80px)",
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
      onClick={() => handleNavigation(path, sectionId)}
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
        background: '#161c2d', 
        minHeight: '100vh', 
        fontFamily: "'Asap', sans-serif" 
      }}
    >
      <NavigationBar />
      <section id="home" className="reveal" style={{ position: "relative" }}>
  <div 
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70vh",
      fontFamily: "'Asap', sans-serif",
      padding: "2rem", // Increased padding
      zIndex: 2, // Ensure the content is above the background
    }}
  >
    <h1
      style={{
        fontSize: "clamp(2.5rem, 6vw, 8rem)",
        fontWeight: "bold",
        color: "#fff",
        marginBottom: "-1rem",
        textAlign: "center",
      }}
    >
      POLIMILHAS
    </h1>
    <h2
      style={{
        fontSize: "clamp(1rem, 4vw, 1.5rem)",
        color: "#fff",
        marginBottom: "4rem",
        textAlign: "center",
        fontWeight: "normal",
      }}
    >
      O site foi feito para transformar a forma como você vê e usa milhas
    </h2>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <Button 
        text="Funcionalidades" 
        path="/funcionalidades"
        sectionId="funcionalidades" 
      />
      <Button 
        text="Objetivo" 
        path='/objetivo'
        sectionId="objetivo" 
      />
      <Button 
        text="Sobre nós" 
        path="/sobre-nos"
        sectionId="sobre-nos" 
      />
    </div>
  </div>

  <div 
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `url(${arquivoIcon}) no-repeat center center`, 
      backgroundSize: "53%", 
      opacity: 0.08, 
      zIndex: 1, 
    }}
  />
</section>


<section id="funcionalidades" 
  className="reveal" 
  style={{ 
    background: 'linear-gradient(to bottom right, #e0f7ff, #d0efff)', 
    color: '#42455a', 
    padding: "4rem 2rem",
  }}
>
<div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `url(${fundo}) no-repeat center center`,
      backgroundSize: "cover", 
      opacity: 0.7, 
      zIndex: -1, 
    }}
  />
  <div 
    className="container" 
    style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", 
      borderRadius: "12px", 
      background: "rgba(255, 255, 255, 0.8)",
      padding: "2rem",
    }}
  >
    <h2 
      style={{ 
        fontSize: "2.8rem", 
        marginBottom: "2rem", 
        textAlign: "center", 
        color: "#006c91",
        textShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      Funcionalidades
    </h2>
    
    <div 
      className="text-container" 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "2rem",
        alignItems: "center", 

        
      }}
    >
      
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "center", // Para garantir que os containers fiquem centralizados
          gap: "2rem",  // Espaço entre os containers
          flexWrap: "wrap", 
          
           // Para garantir que os botões se ajustem bem em telas menores
        }}
      >
        <div 
          style={{ 
            textAlign: "center", 
            flex: "1 1 200px",  
            padding: "1rem",
            border: "2px solid #006c91",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
            opacity: 1, 
            backgroundColor: "#e0f7ff",// Propriedade específica para cor de fundo.
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", // Centraliza o conteúdo verticalmente
            height: "250px", 
          }}
        >
          <p 
            style={{ 
              fontSize: "1.5rem", 
              marginBottom: "1rem", 
              fontWeight: "bold", 
              color: "#006c91", 
            }}
          >
            Criar Tokens
          </p>
          <p 
            style={{ 
              fontSize: "1rem", 
              color: "#42455a", 
              marginBottom: "1rem",
            }}
          >
            Crie novos tokens para utilizar em nossa plataforma. Simples e rápido!
          </p>
          <Button 
            text="Criar Tokens" 
            path="/criacao" 
          />
        </div>
        
        <div 
          style={{ 
            textAlign: "center", 
            flex: "1 1 200px", 
            padding: "1rem",
            border: "2px solid #006c91", 
            borderRadius: "8px", 
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
            background: "#e0f7ff", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "250px", 
          }}
        >
          <p 
            style={{ 
              fontSize: "1.5rem", 
              marginBottom: "1rem", 
              fontWeight: "bold", 
              color: "#006c91", 
            }}
          >
            Resgatar Tokens
          </p>
          <p 
            style={{ 
              fontSize: "1rem", 
              color: "#42455a", 
              marginBottom: "1rem",
            }}
          >
            Transforme seus créditos em tokens de forma rápida e fácil!
          </p>
          <Button 
            text="Resgatar Tokens" 
            path="/resgate" 
          />
        </div>
        
        <div 
          style={{ 
            textAlign: "center", 
            flex: "1 1 200px", 
            padding: "1rem",
            border: "2px solid #006c91", 
            borderRadius: "8px", 
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
            background: "#e0f7ff", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "250px", 
          }}
        >
          <p 
            style={{ 
              fontSize: "1.5rem", 
              marginBottom: "1rem", 
              fontWeight: "bold", 
              color: "#006c91", 
            }}
          >
            Transferir Tokens
          </p>
          <p 
            style={{ 
              fontSize: "1rem", 
              color: "#42455a", 
              marginBottom: "1rem",
            }}
          >
            Envie tokens para outros usuários ou para sua carteira pessoal de forma segura.
          </p>
          <Button 
            text="Transferir Tokens" 
            path="/transferir" 
          />
        </div>
      </div>
      
    </div>
  </div>
</section>

<section id="objetivo" className="reveal" style={{ 
  padding: "4rem 2rem", // Padding vertical
}}>
  <div className="container" style={{ 
    maxWidth: "900px", // Ajustado para largura menor
    margin: "0 auto", // Centralizar o container
    
  }}>
    <h2 style={{ 
      fontSize: "3rem", // Título maior
      marginBottom: "0.8rem", 
      textAlign: "center",
      color: '#fff'
    }}>
      Objetivo 
    </h2>
    <div className="text-container" style={{ 
      display: "flex", 
      flexWrap: "wrap", 
      justifyContent: "center", 
    }}>
      <div className="text-box" style={{ 
        flex: "1 1 250px", 
        background: "rgba(255,255,255,0.1)", 
        padding: "1.5rem", 
        borderRadius: "12px",
        minHeight: "200px" // Altura menor do container
      }}>
        <h3 style={{ 
          fontSize: "1.5rem", 
          marginBottom: "1rem",
          color: "white" 
        }}>
          O que são Tokens?
        </h3>
        <p>
          Tokens são unidades digitais que representam valores de créditos. Esses tokens podem ser usados para realizar transações, como resgatar milhas ou transferir créditos entre usuários, de forma segura e ágil.
        </p>
      </div>

      <div className="text-box" style={{ 
        flex: "1 1 250px", 
        background: "rgba(255,255,255,0.1)", 
        padding: "1.5rem", 
        borderRadius: "12px",
        minHeight: "200px" // Altura menor do container
      }}>
        <h3 style={{ 
          fontSize: "1.5rem", 
          marginBottom: "1rem",
          color: "white" 
        }}>
          Objetivo
        </h3>
        <p>
          O objetivo principal deste site é fornecer uma solução simples e segura para a conversão de milhas em tokens digitais, possibilitando que os usuários realizem operações como resgatar ou transferir esses tokens com rapidez e eficiência.
        </p>
      </div>

      <div className="text-box" style={{ 
        flex: "1 1 250px", 
        background: "rgba(255,255,255,0.1)", 
        padding: "1.5rem", 
        borderRadius: "12px",
        minHeight: "200px" // Altura menor do container
      }}>
        <h3 style={{ 
          fontSize: "1.5rem", 
          marginBottom: "1rem",
          color: "white" 
        }}>
          Benefícios
        </h3>
        <p>
          Com o sistema de tokens, os usuários poderão resgatar suas milhas de maneira mais prática e segura. Além disso, será possível transferir tokens para outras pessoas instantaneamente, proporcionando maior flexibilidade na gestão dos créditos.
        </p>
      </div>
    </div>
  </div>
</section>



<section id="sobre-nos" className="reveal" style={{ 
   background: 'linear-gradient(to bottom right, #e0f7ff, #e0f7ff)', 
  color: '#42455a',
  display: "flex",
  justifyContent: "center",
  alignItems: "center", 
  height: "100vh", 
  padding: "6rem 2rem", 
  textAlign: "center", 
  position: "relative",
}}>
  <div 
    className="container" 
    style={{ 
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
      position: "relative", 
      zIndex: 2, 
      marginTop: "-8rem", // Move o conteúdo um pouco para cima
    }}
  >
    <h2 style={{ 
      fontSize: "4rem", 
      marginBottom: "1rem", // Ajusta o espaçamento do título
      color: "black", // Cor do título para preto
    }}>
      Sobre nós
    </h2>
    
    <p style={{ 
      fontSize: "1.5rem", 
      lineHeight: "1.5", 
      maxWidth: "900px", 
      margin: "0 auto",
      color: "black", // Cor do texto para preto
    }}>
      O POLIMILHAS é um projeto feito por Dan Kiyochi, Gustavo Amaral e Henrique Mantovan, membros do Grupo de Estudos de Blockchain da Escola Politécnica da USP, o Polichain. 
    </p>
  </div>

  <div 
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `url(${fundo}) no-repeat center center`, 
      backgroundSize: "cover", 
      opacity: 0.2, 
      backdropFilter: "blur(8px)", 
      zIndex: 1, 
    }}
  />
</section>


    </div>
  );
}


function LandingPage() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isConnected) {
      navigate("/Home");
    }
  }, [isConnected, navigate]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Fontes Serif', sans-serif",
        backgroundColor: "#F0F8FF",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "50%",
          padding: "2rem",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 6rem)",
            fontWeight: "bold",
            color: "black",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          POLIMILHAS
        </h1>

        <div className="custom-connect-button" style={{ textAlign: "center" }}>
          <ConnectButton />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          backgroundImage: `url(${arquivoIcon})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "80%",
          width: "50%",
          height: "100%",
        }}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/criacao" element={<Criacao/>} />
        <Route path="/resgate" element={<Resgate />} />
        <Route path="/transferir" element={<Transferir />} />
      </Routes>
    </div>
  );
}

export default App;