import { Chain, configureChains, createClient } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export function wagmiClient(acceptedChains: Chain[]) {
  const { chains, provider, webSocketProvider } = configureChains(
    [...acceptedChains],
    [
      jsonRpcProvider({
        rpc: (chain) => {
          return chain.rpcUrls.default.http;
        },
      }),
    ]
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
    autoConnect: false,
    connectors: [injected, metamask, walletconnect],
    provider,
    webSocketProvider,
  });
}
