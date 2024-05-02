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
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import CryptoJS from "crypto-js";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

export default function PassCard(props) {
    const { contract } = useContract("0x12f931DAE6780C9f88f986A497871FF600178e31");
    const { mutateAsync: deletePass, isLoading } = useContractWrite(contract, "deletePass")

    const handleDelete = async () => {
        try {
            const deleteCon = await deletePass({ args: [props.cardIndex] });
            toast("❌ Deleted successfully")
        } catch (err) {
            toast("❌ Failed to delete")
        }
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { mutateAsync: updatePass } = useContractWrite(contract, "updatePass")
    const handleEdit = async () => {
        try {
            const _username = CryptoJS.AES.encrypt(username, props.myKey).toString();
            const _email = CryptoJS.AES.encrypt(email, props.myKey).toString();
            const _password = CryptoJS.AES.encrypt(password, props.myKey).toString();
            const _url = CryptoJS.AES.encrypt(decryptPass(props.dataFromParent[3]), props.myKey).toString();

            await updatePass({ args: [props.cardIndex, _username, _email, _password, _url] });
            toast("🎉Updated successfully")
        } catch (err) {
            toast("⚠ Failed to update")
            console.error("contract call failure", err);
        }
    }

    const decryptPass = (enText) => {
        // Check if the encryption text and key are defined
        if (!enText || !props.myKey) {
            console.error("Encryption text or key is missing.");
            return ""; // Return empty string or handle the error as needed
        }

        try {
            const decrypted = CryptoJS.AES.decrypt(enText, props.myKey);
            const originalText = decrypted.toString(CryptoJS.enc.Utf8);

            // Check if decryption was successful
            if (!originalText) {
                console.error("Decryption failed.");
                return ""; // Return empty string or handle the error as needed
            }

            return originalText;
        } catch (error) {
            console.error("Error in decryption:", error);
            return ""; // Return empty string or handle the error as needed
        }
    };

    return (
        <>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>URL: {decryptPass(props.dataFromParent[3])}</CardTitle>
                    <CardDescription>
                        Vault:{" "}
                        {props.vaultAddr.slice(0, 10) +
                            "..." +
                            props.vaultAddr.slice(25, 32)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username: {decryptPass(props.dataFromParent[0])}</Label>
                            <Label htmlFor="email">Email: {decryptPass(props.dataFromParent[1])}</Label>
                            <Label htmlFor="password">
                                Password: {decryptPass(props.dataFromParent[2])}
                            </Label>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {/*  */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit information</DialogTitle>
                                <DialogDescription>
                                    Make changes to your information here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username" placeholder={decryptPass(props.dataFromParent[0])} className="col-span-3" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" placeholder={decryptPass(props.dataFromParent[1])} className="col-span-3" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Password
                                    </Label>
                                    <Input id="password" placeholder={decryptPass(props.dataFromParent[2])} className="col-span-3" onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleEdit}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {/*  */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete
                                    your password from blockchain vault.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </>
    );
}
