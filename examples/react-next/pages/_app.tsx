import { ConnectButton, OpenFormatProvider } from "@openformat/react";
import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OpenFormatProvider config={{ network: "mumbai" }}>
      <ConnectButton />
      <Component {...pageProps} />
    </OpenFormatProvider>
  );
}

export default MyApp;
