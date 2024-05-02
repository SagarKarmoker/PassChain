
import EncryptCard from "@/components/EncryptCard";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner"
import Dashboard from "@/components/Dashboard";
import {
    useConnectionStatus,
    useAddress,
    useContract,
    useContractRead
} from "@thirdweb-dev/react";

import { useEffect } from "react";
import Lottie from "lottie-react";
import welcome from "@/components/welcome.json";
import Footer from "./Footer";

export default function Home() {
    const connectionStatus = useConnectionStatus();
    const address = useAddress();

    const { contract } = useContract("0x12f931DAE6780C9f88f986A497871FF600178e31");
    const { data, isLoading, error } = useContractRead(contract, "getVaultAddr", [address]);

    useEffect(() => {
        if (contract && data) {
            console.log(contract);
            console.log(data);
        }
    }, [address, contract, data]);

    return (
        <main className="pl-12 pr-12">
            <Navbar />
            {connectionStatus === "disconnected" ? (
                <Lottie
                    animationData={welcome}
                    loop={true}
                    style={{
                        width: '95vw', height: '80vh', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />
            ) : connectionStatus === "connected" && data === "0x0000000000000000000000000000000000000000" ? (
                <EncryptCard />
            ) : (
                <Dashboard />
            )}
            <Footer />
            <Toaster />
        </main>
    );
}
