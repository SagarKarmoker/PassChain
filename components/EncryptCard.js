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


function EncryptCard() {
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
        <div className="flex justify-center items-center mt-20">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create Vault</CardTitle>
                    <CardDescription>
                        Deploy your blockchain enabled vault in one-click.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Encryption key (Please Remember it)</Label>
                            <Input id="name" name="name" placeholder="Encryption key" onChange={keyChange} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" onClick={handleDeploy}>Deploy</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default EncryptCard;
