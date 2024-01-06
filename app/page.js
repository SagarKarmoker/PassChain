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

export default function Home() {

  return (
    <ThirdwebProvider activeChain="mumbai" clientId="98a7c778fd35fb7e601259268e78aff8"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
            ],
          },
        }),
      ]}>

      <App />
    </ThirdwebProvider>
  );
}
