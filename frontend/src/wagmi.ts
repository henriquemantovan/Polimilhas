import { http, createConfig } from "wagmi";
import { hardhat } from "wagmi/chains";
import { Chain } from "@rainbow-me/rainbowkit";

export const xrp = {
  id: 1440002,
  name: "XRPL EVM Sidechain Devnet",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  iconBackground: "#fff",
  nativeCurrency: {
    name: "XRP",
    symbol: "XRP",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-evm-sidechain.xrpl.org/"],
    },
  },
  blockExplorers: {
    default: {
      name: "ExplorerXRP",
      url: "https://explorer.xrplevm.org",
    },
  },
} as const satisfies Chain;

// Create the Wagmi config
export const config = createConfig({
  chains: [hardhat, xrp], // Include custom XRPL EVM Sidechain
  connectors: [
    // Uncomment and configure connectors as needed
    // injected(),
    // coinbaseWallet({ appName: "Your App Name" }),
    // walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    // Ensure transports are properly mapped
    [hardhat.id]: http(),
    [xrp.id]: http(),
  },
});

// Extend Wagmi module for type safety
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
