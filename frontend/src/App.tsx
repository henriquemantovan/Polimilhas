import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import arquivoIcon from "../images/aviao.png";
import fundo from "../images/fundo.png"
import Carousel from "./componentes/Carousel";


import Header from "./Header";
import Compra from "./compra/Compra";
import Resgate from "./resgate/Resgate";
import Transferir from "./transferir/Transferir";
import Admin from "./adm/Adm";


function NavigationBar() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'funcionalidades', 'gastar', 'produtos'];
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
      padding: "2rem", 
      zIndex: 2, 
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
        text="Administrar tokens" 
        path="/funcionalidades"
        sectionId="funcionalidades" 
      />
      <Button 
        text="Resgate cupons" 
        path='/gastar'
        sectionId="gastar" 
      />
      <Button 
        text="Sobre nós" 
        path="/produtos"
        sectionId="produtos" 
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
          justifyContent: "center", 
          gap: "2rem", 
          flexWrap: "wrap", 
          
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
            Comprar Tokens
          </p>
          <p 
            style={{ 
              fontSize: "1rem", 
              color: "#42455a", 
              marginBottom: "1rem",
            }}
          >
            Compre tokens para completar o que falta para resgatar produtos. Simples e rápido!
          </p>
          <Button 
            text="Comprar Tokens" 
            path="/compra" 
          />
        </div> 
        {/*
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
        */}
        
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

<section
  id="gastar"
  className="reveal"
  style={{padding: "4rem 2rem", 
  }}
>
  <h2 style={{ 
      fontSize: "2rem", 
      marginBottom: "1.5rem", 
      textAlign: "center", 
      color: "#e0ffff",
      fontWeight: "bold",
      letterSpacing: "1px" 
    }}> Use suas milhas para conseguir descontos em passagens!
  </h2>
  <Carousel />
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${arquivoIcon})`,
      backgroundRepeat: "repeat", // Repete a imagem em todo o fundo
      backgroundSize: "21%", 
      opacity: 0.05,
      zIndex: -1,
    }}
  />
</section>

<section id="produtos" className="reveal" style={{ 
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
  <div style={{ 
    maxWidth: "900px", 
    margin: "0 auto", 
    backgroundColor: "#fff", // Fundo branco
    padding: "2rem 1.5rem", 
    borderRadius: "16px", 
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // Sombra mais pronunciada
    fontFamily: "'Roboto', sans-serif" 
}}>
    <h2 style={{ 
        fontSize: "3rem", 
        marginBottom: "1.5rem", 
        textAlign: "center", 
        color: "#2c3e50", 
        fontWeight: "bold",
        letterSpacing: "1px" 
    }}>
        Objetivo 
    </h2>
    <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "1.5rem", 
        justifyContent: "center", 
    }}>
        <div style={{ 
            flex: "1 1 calc(33.33% - 1rem)", 
            background: "linear-gradient(135deg, #ecf0f1, #dfe6e9)", 
            padding: "1.5rem", 
            borderRadius: "16px", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
            transition: "transform 0.3s, box-shadow 0.3s", 
            cursor: "pointer",
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        }}>
            <h3 style={{ 
                fontSize: "1.8rem", 
                marginBottom: "1rem", 
                color: "#34495e", 
                fontWeight: "600",
            }}>
                O que são Tokens?
            </h3>
            <p style={{ 
                fontSize: "1rem", 
                color: "#636e72", 
                lineHeight: "1.6"
            }}>
                Tokens são unidades digitais que representam valores de créditos. Esses tokens podem ser usados para realizar transações, como resgatar milhas ou transferir créditos entre usuários, de forma segura e ágil.
            </p>
        </div>

        <div style={{ 
            flex: "1 1 calc(33.33% - 1rem)", 
            background: "linear-gradient(135deg, #ecf0f1, #dfe6e9)", 
            padding: "1.5rem", 
            borderRadius: "16px", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
            transition: "transform 0.3s, box-shadow 0.3s", 
            cursor: "pointer",
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        }}>
            <h3 style={{ 
                fontSize: "1.8rem", 
                marginBottom: "1rem", 
                color: "#34495e", 
                fontWeight: "600",
            }}>
                Propósito
            </h3>
            <p style={{ 
                fontSize: "1rem", 
                color: "#636e72", 
                lineHeight: "1.6"
            }}>
                O objetivo principal deste site é fornecer uma solução simples e segura para a conversão de milhas em tokens digitais, possibilitando que os usuários realizem operações como resgatar ou transferir esses tokens com rapidez e eficiência.
            </p>
        </div>

        <div style={{ 
            flex: "1 1 calc(33.33% - 1rem)", 
            background: "linear-gradient(135deg, #ecf0f1, #dfe6e9)", 
            padding: "1.5rem", 
            borderRadius: "16px", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
            transition: "transform 0.3s, box-shadow 0.3s", 
            cursor: "pointer",
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        }}>
            <h3 style={{ 
                fontSize: "1.8rem", 
                marginBottom: "1rem", 
                color: "#34495e", 
                fontWeight: "600",
            }}>
                Benefícios
            </h3>
            <p style={{ 
                fontSize: "1rem", 
                color: "#636e72", 
                lineHeight: "1.6"
            }}>
                Com o sistema de tokens, os usuários poderão resgatar suas milhas de maneira mais prática e segura. Além disso, será possível transferir tokens para outras pessoas instantaneamente, proporcionando maior flexibilidade na gestão dos créditos.
            </p>
        </div>
    </div>
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
      opacity: 0.8, 
      backdropFilter: "blur(8px)", 
      zIndex: -1, 
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "'Fontes Serif', sans-serif",
        backgroundColor: "#F0F8FF",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Botão de navegação para Admin */}
      <div className="custom-connect-button"
        onClick={() => navigate("/admin")}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#4180ab",
          color: "white",
          border: "none",
          borderRadius: "80px",
          cursor: "pointer",
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",

        }}
      >
        Admin
      </div>

      <div
        style={{
          width: "600px",
          height: "600px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${arquivoIcon})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 0.4,
          }}
        />
        <h1
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(3rem, 8vw, 8rem)",
            fontWeight: "bold",
            color: "black",
            textShadow: "2px 2px 10px rgba(255, 255, 255, 0.8)",
            textAlign: "center",
          }}
        >
          POLIMILHAS
        </h1>
      </div>

      <div className="custom-connect-button" style={{ marginTop: "-4rem" }}>
        <ConnectButton />
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
        <Route path="/compra" element={<Compra/>} />
        {/* <Route path="/resgate" element={<Resgate />} /> */}
        <Route path="/transferir" element={<Transferir />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;