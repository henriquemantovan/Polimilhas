import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { BrowserRouter as Router } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css'; // Adicione essa linha no topo do arquivo

import App from "./App.tsx";
import { config } from "./wagmi.ts"; // Presumo que você tenha configurado o wagmi aqui

import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement === null) {
  console.error("Failed to find the root element");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Router>
              <App />
            </Router>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </React.StrictMode>,
  );
}
