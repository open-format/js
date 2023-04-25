import { OpenFormatProvider } from "@openformat/react";
import { Chains } from "@openformat/sdk";

import { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OpenFormatProvider
      config={{
        networks: [Chains.polygonMumbai, Chains.polygon],
        appId: process.env.NEXT_PUBLIC_APP_ID || "",
      }}
    >
      <Header />
      <Component {...pageProps} />
    </OpenFormatProvider>
  );
}

export default MyApp;
