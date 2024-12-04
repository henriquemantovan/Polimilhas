import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
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
      <ConnectButton
      />
    </header>
  );
};

export default Header;
