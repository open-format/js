import { Chain, configureChains, createClient } from 'wagmi';
import { foundry, polygon, polygonMumbai } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

//@TODO we need to create a custom chain because we're using an older version of wagmi
//which doesn't export aurora. Updating wagmi is a bigger piece of work,
// so this is a temporary work around.

export const aurora = {
  id: 1313161554,
  name: 'Aurora',
  network: 'aurora',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://mainnet.aurora.dev',
    default: 'https://mainnet.aurora.dev',
  },
} as const satisfies Chain;

const { chains, provider, webSocketProvider } = configureChains(
  [foundry, polygon, polygonMumbai, aurora],
  [publicProvider()]
);

const metamask = new MetaMaskConnector({ chains });

const walletconnect = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});

const coinbase = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'Open Format',
  },
});

const injected = new InjectedConnector({ chains });

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: [injected, coinbase, metamask, walletconnect],
  provider,
  webSocketProvider,
});
