"use client";
import { useState } from "react";
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


function Dashboard() {
    const [key, setKey] = useState("");

    const keyChange = (event) => {
        setKey(event.target.value);
    };

    const handleDeploy = () => {
        console.log(key);
        const result = true;
        if(result){
            toast("🎉Blockchain vault created successfully")
        }else{
            toast("⚠ Failed to create vault")
        }
    };
    
    return (
        <div className="flex mt-4">
            <div className="w-3/10">
                {/* Content for the left 30% width */}
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add Password to vault</CardTitle>
                        <CardDescription>
                            Vault: 0x000...000
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username" placeholder="Username" onChange={keyChange} />

                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" placeholder="Email Address" onChange={keyChange} />

                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password"  placeholder="Password" onChange={keyChange} />

                                <Label htmlFor="URL">URL</Label>
                                <Input id="URL" name="URL" placeholder="URL" onChange={keyChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" onClick={handleDeploy}>Save Password</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="w-1/10 pl-3 pr-3">
                {/* Content for the right 10% width */}
                <Separator orientation="vertical"/>
            </div>
            <div className="w-6/10">
                {/* Content for the right 60% width */}
                <div className="grid grid-cols-3 gap-4">
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                    <PassCard />
                </div>
            </div>
        </div>
    )
}

export default Dashboard