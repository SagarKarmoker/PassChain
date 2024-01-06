"use client";
import { useState, useEffect} from "react";
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

import { useContract, useContractWrite, useContractRead, useAddress } from "@thirdweb-dev/react";


function Dashboard() {
    const address = useAddress();
    const { contract } = useContract("0xC23F6c8950294dA69Ece9c2f457B05d5E11498f0");
    const { data } = useContractRead(contract, "getVaultAddr", [address]);
    const { mutateAsync: addPass, isLoading } = useContractWrite(contract, "addPass")

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [url, setURL] = useState('');


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

    const { mutateAsync: getVault } = useContractWrite(contract, "getVault");

    const getMyVault = async () => {
        try {
            const vaultdata = await getVault({});
            console.info("contract call successs", vaultdata);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMyVault();
    }, [getMyVault])

    return (
        <div className="flex mt-4">
            <div className="w-3/10">
                {/* Content for the left 30% width */}
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add Password to vault</CardTitle>
                        <CardDescription>
                            Vault: {data?.slice(0,10) + "..." + data?.slice(25, 32)}
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
                    {/* <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard /> */}

                    {}
                </div>
            </div>
        </div>
    )
}

export default Dashboard