import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ececec',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#333' }}>
        PoliMilhas
      </h1>
      
      <img
        src="/path/to/your/image.png" // Substitua pelo caminho da sua imagem
        alt="PoliMilhas"
        style={{
          width: '80%',
          maxWidth: '400px',
          margin: '20px 0',
        }}
      />

      <button
        onClick={() => navigate('/menu')} // Redireciona para a página do menu
        style={{
          padding: '15px 30px',
          fontSize: '1.5rem',
          backgroundColor: '#2a738c',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
        }}
      >
        Ir para o Menu
      </button>
    </div>
  );
}

export default App;
