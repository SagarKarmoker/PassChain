"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import PassCard from "./PassCard";

import {
    useContract,
    useContractWrite,
    useContractRead,
    useAddress,
    useConnectionStatus
} from "@thirdweb-dev/react";

const ethers = require("ethers");
import CryptoJS from "crypto-js";

function Dashboard() {
    const address = useAddress();
    const { contract } = useContract(
        "0x35649F537164f13935a1A80Da9eCd922C6dC4Cf8"
    );
    const { data } = useContractRead(contract, "getVaultAddr", [address]);
    const { mutateAsync: addPass, isLoading } = useContractWrite(
        contract,
        "addPass"
    );

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [url, setURL] = useState("");
    const [key, setKey] = useState("");
    const [vaultData, setVaultData] = useState([]);

    const handleSavePass = async () => {
        try {
            const _username = CryptoJS.AES.encrypt(username, key).toString();
            const _email = CryptoJS.AES.encrypt(email, key).toString();
            const _password = CryptoJS.AES.encrypt(password, key).toString();
            const _url = CryptoJS.AES.encrypt(url, key).toString();

            const addPassData = await addPass({
                args: [_username, _email, _password, _url],
            });
            console.info("contract call successs", addPassData);
            toast("🎉Saved successfully");
        } catch (err) {
            toast("⚠ Failed to save password");
            console.error("contract call failure", err);
        }
    };

    // getvault
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Assuming you have the contract ABI and address
    const contractAddress = "0x35649F537164f13935a1A80Da9eCd922C6dC4Cf8";

    async function getVault() {
        // Check if the contract object is defined
        if (!contract || !contract.abi) {
            console.error("Contract is not defined.");
            return;
        }

        const contractABI = contract.abi;
        // Create a contract instance
        const mycontract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        // Call the contract function
        try {
            const data = await mycontract.getVault(key);
            setVaultData(data); // Update the state with the fetched data
        } catch (error) {
            console.error(error);
        }
    }

    const { mutateAsync: destoryVault } = useContractWrite(
        contract,
        "destoryVault"
    );
    const handleDestory = async () => {
        try {
            const data = await destoryVault({ args: [] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const getMyKey = async () => {
        // Check if the contract object is defined
        if (!contract || !contract.abi) {
            console.error("Contract is not defined.");
            return;
        }

        const contractABI = contract.abi;
        // Create a contract instance
        const mycontract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        // Call the contract function
        try {
            const myKey = await mycontract.getMyKey();
            setKey(myKey);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMyKey();
        getVault();
    }, [getMyKey]);

    const connectionStatus = useConnectionStatus();

    return (
        <div className="flex mt-4">
            {connectionStatus == "connected" ? (
                <div className="w-3/10">
                {/* Content for the left 30% width */}
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add Password to vault</CardTitle>
                        <CardDescription>
                            Vault: {data?.slice(0, 10) + "..." + data?.slice(25, 32)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Label htmlFor="URL">URL</Label>
                                <Input
                                    id="URL"
                                    name="URL"
                                    placeholder="URL"
                                    onChange={(e) => setURL(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" onClick={handleSavePass}>
                            Save Password
                        </Button>
                    </CardFooter>
                </Card>
                {/* destory */}
                <Button
                    className="w-full mt-5"
                    variant="destructive"
                    onClick={handleDestory}
                >
                    Destroy Vault
                </Button>
            </div>
            ) : (
                <div>Please connect wallet</div> 
            )}
            
            <div className="w-1/10 pl-3 pr-3">
                {/* Content for the right 10% width */}
                <Separator orientation="vertical" />
            </div>
            <div className="w-6/10">
                {/* Content for the right 60% width */}
                <div className="grid grid-cols-3 gap-4">
                    {vaultData.map(
                        (item, index) =>
                            item[0] != "" && (
                                <PassCard
                                    cardIndex={index}
                                    dataFromParent={item}
                                    vaultAddr={data}
                                    myKey={key}
                                />
                            )
                    )}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
