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
    <ThirdwebProvider activeChain="mumbai" clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
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
