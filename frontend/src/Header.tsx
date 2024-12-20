import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useReadPoliMilhasBalanceOf } from "./generated"; 

const Header = () => {
  const { address } = useAccount(); 
  const [balance, setBalance] = useState<number | string>(0); 

  const { data, isLoading, isError } = useReadPoliMilhasBalanceOf({
    address: "0xe8789EaD2eB5f29d7ce9CA0A298C048CA5aeE774", //contrato TOKEN
    args: address ? [address] : undefined, 
  });

  useEffect(() => {
    if (isLoading) {
      setBalance("(Conecte-se)"); 
    } else if (isError) {
      setBalance("Erro ao carregar saldo"); 
    } else {
      setBalance(Number(data));
    }
  }, [data, isLoading, isError]);

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
