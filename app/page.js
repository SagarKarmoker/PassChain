"use client";
import EncryptCard from "@/components/EncryptCard";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner"
import Dashboard from "@/components/Dashboard";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <ThirdwebProvider activeChain="ethereum" clientId="09231887360f89b7395c795d725494e6">
      <main className="p-12">
        <Navbar />
        <EncryptCard />
        {/* <Dashboard /> */}
        <Toaster />
      </main>
    </ThirdwebProvider>
  );
}
