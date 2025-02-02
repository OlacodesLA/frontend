"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";

interface QuickSaveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    sendFromAccount: string | null;
    saveToAccount: string | null;
}

export function QuickSaveModal({ isOpen, onClose }: QuickSaveModalProps) {
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            sendFromAccount: null,
            saveToAccount: null,
        },
    });

    const router = useRouter();

    const onSubmit = (data: FormData) => {
        console.log("Form submitted with data:", data);
        onClose();
        router.push("/app/savefunds/save"); // Redirects to save funds page
    };

    const accounts = [
        "USD - 1234",
        "GBP - 5678",
        "CAD - 9876",
        "NGN - 4321"
    ]; // Updated account list with different currencies

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md text-center font-dm">
                <h1 className="text-[20px]">Quick Save</h1>
                <p className="text-[14px] text-[#4F5E71]">
                    Select the account you want to save from and the account you want to save in.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-3">
                    {/* Select "Send From" Account */}
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="sendFromAccount">Select Account You Want to Send From</Label>
                        <Controller
                            name="sendFromAccount"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                            {field.value || <p className="text-[#697D95]">Select account</p>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-2" align="start">
                                        {accounts.map((account) => (
                                            <button
                                                key={account}
                                                type="button"
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                                onClick={() => field.onChange(account)}
                                            >
                                                {account}
                                            </button>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>

                    {/* Select "Save To" Account */}
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="saveToAccount">Select Account You Want to Save In</Label>
                        <Controller
                            name="saveToAccount"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                            {field.value || <p className="text-[#697D95]">Select account</p>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-2" align="start">
                                        {accounts.map((account) => (
                                            <button
                                                key={account}
                                                type="button"
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                                onClick={() => field.onChange(account)}
                                            >
                                                {account}
                                            </button>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>

                    <p className="text-[14px] text-[#4F5E71]">
                        Note: This applies only to your NGN savings. To apply a general setting, select “All”.
                    </p>

                    <div className="w-full py-4">
                        <Button type="submit" className="w-full">
                            Proceed
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
