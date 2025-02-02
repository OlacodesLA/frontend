import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";

interface LockModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    firstWithdrawalDate: Date | null;
    secondWithdrawalDate: Date | null;
}

export function LockModal({ isOpen, onClose }: LockModalProps) {
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            firstWithdrawalDate: null,
            secondWithdrawalDate: null,
        },
    });

    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const onSubmit = (data: FormData) => {
        console.log("Form submitted with data:", data);
        setIsSubmitted(true);
    };

    const handleCurrencySelect = (currency: string) => {
        setSelectedCurrency(currency);
        setIsSubmitted(false); // Reset the submission state
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="text-center font-dm">
                <h1 className="text-[20px] border-b border-dashed border-[#D0C4F8] pb-5">
                    Lock Savings
                </h1>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-3">
                        <div className="flex gap-2 justify-center">
                            {["NGN", "CAD", "GBP", "USD", "ALL"].map((currency) => (
                                <Button
                                    key={currency}
                                    variant="outline"
                                    className="px-2 hover:bg-[#E5DDFE]"
                                    onClick={() => handleCurrencySelect(currency)} // Handle currency click
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.166 18.333H5.83268C2.49935 18.333 1.66602 17.4997 1.66602 14.1663V12.4997C1.66602 9.16634 2.49935 8.33301 5.83268 8.33301H14.166C17.4993 8.33301 18.3327 9.16634 18.3327 12.4997V14.1663C18.3327 17.4997 17.4993 18.333 14.166 18.333Z" stroke="#232324" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 8.33366V6.66699C5 3.90866 5.83333 1.66699 10 1.66699C13.75 1.66699 15 3.33366 15 5.83366" stroke="#232324" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.99935 15.4167C11.1499 15.4167 12.0827 14.4839 12.0827 13.3333C12.0827 12.1827 11.1499 11.25 9.99935 11.25C8.84876 11.25 7.91602 12.1827 7.91602 13.3333C7.91602 14.4839 8.84876 15.4167 9.99935 15.4167Z" stroke="#232324" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {currency}
                                </Button>
                            ))}
                        </div>
                        {selectedCurrency && (
                            <div className="flex flex-col gap-3 pt-4">
                                <Label htmlFor="firstWithdrawalDate">Set First Withdrawal Date</Label>
                                <Controller
                                    name="firstWithdrawalDate"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start text-[#697D95] text-left">
                                                    {field.value ? format(field.value, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                            </div>
                        )}
                        {selectedCurrency && (
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="secondWithdrawalDate">Set Second Withdrawal Date</Label>
                                <Controller
                                    name="secondWithdrawalDate"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start text-[#697D95] text-left">
                                                    {field.value ? format(field.value, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                            </div>
                        )}
                        <p className="text-[14px] text-[#4F5E71]">Note: This date applies only to your NGN savings, to apply a general date make use of “All”</p>
                        <div className="w-full py-4">
                            <Button type="submit" className="w-full">Lock Savings</Button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <h2>Your {selectedCurrency} savings are currently locked.</h2>
                        <p>Withdrawal dates are set as follows:</p>
                        <ul>
                            <li>First Withdrawal Date: {selectedCurrency && "MM/DD/YYYY"}</li>
                            <li>Second Withdrawal Date: {selectedCurrency && "MM/DD/YYYY"}</li>
                        </ul>
                        <p>To access your money, visit your {selectedCurrency} savings dashboard and unlock your savings to enable withdrawal.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
