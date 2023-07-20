import { Chain, configureChains, createClient } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

export function wagmiClient(acceptedChains: Chain[]) {
  const { chains, provider, webSocketProvider } = configureChains(
    [...acceptedChains],
    [publicProvider()]
  );

  const metamask = new MetaMaskConnector({ chains });

  const walletconnect = new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  });

  const injected = new InjectedConnector({ chains });

  return createClient({
    autoConnect: true,
    connectors: [injected, metamask, walletconnect],
    provider,
    webSocketProvider,
  });
}
