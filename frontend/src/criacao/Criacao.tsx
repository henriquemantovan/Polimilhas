import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';


export default function App() {
  const navigate = useNavigate();
  const { address } = useAccount(); // Obtém o endereço da MetaMask

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <h1
        style={{
          marginBottom: "40px",
          fontSize: "3.5rem",
          textAlign: "center",
        }}
      >
        Painel do Criador
      </h1>
      <button
        className="botao"
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          padding: "20px", 
          fontSize: "25px", 
          margin: "15px 0", 
          width: "280px",
          textAlign: "center"
        }}
        onClick={() => navigate("/vendor/newtasks")}  
      >

        <span style={{ flex: 1, textAlign: "left" }}>Novas Tarefas</span>
      </button>
      <button
        className="botao"
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          padding: "20px", 
          fontSize: "30px", 
          margin: "15px 0", 
          width: "280px",
        }}
        onClick={() => navigate("/vendor/withdraw")} 
>
        <span style={{ flex: 1, textAlign: "left" }}>Saque</span>
      </button>

      <button
        className="botao"
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          padding: "20px", 
          fontSize: "30px", 
          margin: "15px 0", 
          width: "280px",
        }}
  onClick={() => {
    if (address) {
      navigate(`/vendor/mytasks/${address}`);
    } else {
      console.error('Conecte-se ao MetaMask');
    }
  }}
  disabled={!address} 
      >
    <span style={{ flex: 1, textAlign: "center", fontSize: "20px" }}>Minhas Tarefas</span>
    </button>


    </main>
  );
}
