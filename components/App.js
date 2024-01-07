
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

    const { contract } = useContract("0x35649F537164f13935a1A80Da9eCd922C6dC4Cf8");
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
