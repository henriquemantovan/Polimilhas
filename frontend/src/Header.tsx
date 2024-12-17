import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTokenFunctions } from "./utils/token20Functions";
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const Header = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState<number>(0);
  const { getBalance } = useTokenFunctions();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) return;

      try {
        const balance = await getBalance(address);
        if (typeof balance === 'number') {
          setBalance(balance);
        } else {
          console.error("Saldo não é um número válido");
          setBalance(0);
        }
      } catch (error) {
        console.error("Erro ao obter o saldo:", error);
        setBalance(0);
      }
    };

    fetchBalance();
  }, [address, getBalance]);

  return (
    <header
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '20px 20px',
      zIndex: 1000,
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ConnectButton />
      </div>

      <div
        style={{
          marginRight: '40px',
          marginLeft: 'auto',  
          fontSize: '18px',
          fontWeight: 'bold',
          backgroundColor: '#fff',
          color: '#000',
          padding: '8px 15px',
          borderRadius: '8px',
        }}
      >
        Quantidade de Tokens: {balance}
      </div>
    </header>
  );
};

export default Header;
