"use client";
import EncryptCard from "@/components/EncryptCard";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner"
import Dashboard from "@/components/Dashboard";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  useConnectionStatus
} from "@thirdweb-dev/react";

import App from "@/components/App";

const customChain = {
  // Required information for connecting to the network
  chainId: 80002, // Chain ID of the network
  rpc: ["80002.rpc.thirdweb.com"], // Array of RPC URLs to use
 
  // Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "Polygon Amoy",
    symbol: "MATIC",
  },
  shortName: "Amoy", // Display value shown in the wallet UI
  slug: "Amoy", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Amoy Testnet", // Name of the network
  name: "Amoy Testnet", // Name of the network
};

export default function Home() {

  return (
    <ThirdwebProvider activeChain={customChain} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        embeddedWallet({
          auth: {
            options: [
              "email",
              "apple",
              "facebook",
              "google",
            ],
          },
        }),
      ]}>

      <App />
    </ThirdwebProvider>
  );
}
