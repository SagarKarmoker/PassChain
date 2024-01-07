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
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import PassCard from "./PassCard";

import { useContract, useContractWrite, useContractRead, useAddress, useSigner, Web3Button } from "@thirdweb-dev/react";

const ethers = require('ethers');


function Dashboard() {
    const address = useAddress();
    const { contract } = useContract("0xA82B3F6eeF8F4ff120ec425053B6014BB7a954B9");
    const { data } = useContractRead(contract, "getVaultAddr", [address]);
    const { mutateAsync: addPass, isLoading } = useContractWrite(contract, "addPass")

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [url, setURL] = useState('');
    const [key, setKey] = useState('');
    const [vaultData, setVaultData] = useState([]);

    const handleSavePass = async () => {
        try {
            const addPassData = await addPass({ args: [username, email, password, url] });
            console.info("contract call successs", addPassData);
            toast("🎉Saved successfully")
        } catch (err) {
            toast("⚠ Failed to save password")
            // console.error("contract call failure", err);
        }
    }

    // getvault 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Assuming you have the contract ABI and address
    const contractAddress = "0xA82B3F6eeF8F4ff120ec425053B6014BB7a954B9";

    async function getVault() {
        const contractABI = contract.abi;
        // Create a contract instance
        const mycontract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the contract function
        try {
            const data = await mycontract.getVault(key);
            setVaultData(data); // Update the state with the fetched data
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex mt-4">
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
                                <Input id="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />

                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                                <Label htmlFor="URL">URL</Label>
                                <Input id="URL" name="URL" placeholder="URL" onChange={(e) => setURL(e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" onClick={handleSavePass}>Save Password</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="w-1/10 pl-3 pr-3">
                {/* Content for the right 10% width */}
                <Separator orientation="vertical" />
            </div>
            <div className="w-6/10">
                {/* Content for the right 60% width */}
                <div className="grid grid-cols-3 gap-4">
                    <Input id="key" name="key" type="key" placeholder="Encrypt Key" onChange={(e) => setKey(e.target.value)} />
                    <Button onClick={getVault}>Get Password</Button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {vaultData.map((item, index) => (
                        <PassCard key={index} dataFromParent={item} vaultAddr={data}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard