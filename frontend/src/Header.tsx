import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      color: 'black',
    }}>
      <ConnectButton />
    </header>
  );
};

export default Header;
