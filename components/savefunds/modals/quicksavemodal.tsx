"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Controller, useForm } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"; // Make sure to import the format function
import { Form } from "@/components/ui/form";

interface QuickSaveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    firstWithdrawalDate: Date | null;
    secondWithdrawalDate: Date | null;
}

export function QuickSaveModal({ isOpen, onClose }: QuickSaveModalProps) {
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            firstWithdrawalDate: null,
            secondWithdrawalDate: null,
        },
    });

    const onSubmit = (data: FormData) => {

        console.log("Form submitted with data:", data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md text-center font-dm">
                <h1 className="text-[20px] ">Quick Save</h1>
                <p className="text-[14px] text-[#4F5E71]">Select the account you want to save from and the currency you want to save.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-3">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="firstWithdrawalDate">Set First Withdrawal Date</Label>
                        <Controller
                            name="firstWithdrawalDate"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                            <p className="text-[#697D95]">mm/dd/yy</p>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            // selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="secondWithdrawalDate">Set Second Withdrawal Date</Label>
                        <Controller
                            name="secondWithdrawalDate"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                            <p className="text-[#697D95]">mm/dd/yy</p>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            // selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>
                    <p className="text-[14px] text-[#4F5E71]">Note: This date applies only to your NGN savings, to apply a general date make use of “All”</p>

                    <div className="w-full py-4">
                        <Button type="submit" className="w-full">Lock Savings</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
