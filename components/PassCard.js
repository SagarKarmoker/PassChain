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

import CryptoJS from "crypto-js";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

export default function PassCard(props) {
    const { contract } = useContract("0x35649F537164f13935a1A80Da9eCd922C6dC4Cf8");
    const { mutateAsync: deletePass, isLoading } = useContractWrite(contract, "deletePass")

    const handleDelete = async () => {
        try {
            const deleteCon = await deletePass({ args: [props.cardIndex] });
            toast("❌ Deleted successfully")
        } catch (err) {
            toast("❌ Failed to delete")
        }
    };

    const handleEdit = () => {
        // use the existing dashboard add pass card
    };

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
                    <Button variant="secondary" onClick={handleEdit}>
                        Edit
                    </Button>
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
