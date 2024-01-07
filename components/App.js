
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

export default function Home() {
    const connectionStatus = useConnectionStatus();
    const address = useAddress();

    const { contract } = useContract("0xA82B3F6eeF8F4ff120ec425053B6014BB7a954B9");
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
            {connectionStatus == "connected" && data == "0x0000000000000000000000000000000000000000" ? (
                <EncryptCard />
            ) : (
                <Dashboard />
            )}
            <Toaster />
        </main>
    );
}
