import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/style/main.scss";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { WagmiConfig, createConfig, createStorage } from "wagmi";
import { configureChains } from "@wagmi/core";
import { sepolia, mainnet } from "@wagmi/core/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// var currentChain = sepolia;

if (Number(process.env.REACT_APP_L1_CHAIN_ID) === 1) {
  // currentChain = mainnet;
}

export const RACE = {
  id: Number(process.env.REACT_APP_L2_CHAIN_ID),
  name: "Hypr",
  network: "Hypr",
  iconUrl: "https://i.imgur.com/90fZHJQ.png",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "ETHEREUM",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [process.env.REACT_APP_L2_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Hypr Explorer",
      url: process.env.REACT_APP_L2_EXPLORER_URL,
    },
  },
  testnet: true,
};
export const TCH = {
  id: Number(process.env.REACT_APP_L1_CHAIN_ID),
  name: "TCH",
  network: "TCH",
  iconUrl: "https://i.imgur.com/90fZHJQ.png",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "ETHEREUM",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [process.env.REACT_APP_L1_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Hypr Explorer",
      url: process.env.REACT_APP_L1_EXPLORER_URL,
    },
  },
  testnet: true,
};
const { chains, publicClient } = configureChains(
  [TCH, RACE],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
);

export const connectors = [
  new MetaMaskConnector({
    chains,
    options: {
      shimDisconnect: false,
    },
  }),
];

const config = createConfig({
  autoConnect: true,
  connectors,
  storage: createStorage({ storage: window.localStorage }),
  publicClient,
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <WagmiConfig config={config}>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </WagmiConfig>,
);
reportWebVitals();
