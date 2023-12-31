import './polyfills';
import './global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia, mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SwapTokenContextProvider } from './context/SwapContext';

const { chains, publicClient } = configureChains(
  [sepolia, mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: '778ab3a036060b46ad14bab5c834c5a0',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
    <SwapTokenContextProvider>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </SwapTokenContextProvider>
    </WagmiConfig>
  </React.StrictMode>
);
