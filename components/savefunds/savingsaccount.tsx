"use client"
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, LockClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Piggy from "../../public/savefunds/image 50.svg";
import { LockModal } from "./modals/lockmodal";
import { QuickSaveModal } from "./modals/quicksavemodal";

const savings = [
    { currency: "NGN", balance: "50,000.00", flag: "ng", description: 'This displays your accumulated savings in Nigerian naira. Tap on this card for further details.' },
    { currency: "CAD", balance: "0.00", flag: "ca", description: 'This displays your accumulated savings in Canadian dollars. Tap on this card for further details.' },
    { currency: "GBP", balance: "0.00", flag: "gb", description: 'This displays your accumulated savings in Pounds. Tap on this card for further details.' },
    { currency: "USD", balance: "2,000.00", flag: "us", description: 'This displays your accumulated savings in US dollars. Tap on this card for further details.' },
];

export function SavingsAccountBalances() {
    const [isLockModalOpen, setIsLockModalOpen] = useState(false);
    const [isQuickSaveModalOpen, setIsQuickSaveModalOpen] = useState(false);

    return (
        <div className="mb-6 font-dm">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Savings</h2>
                <Button onClick={() => setIsQuickSaveModalOpen(true)}>
                    <PlusIcon /> Quick Save
                </Button>
            </div>
            <QuickSaveModal isOpen={isQuickSaveModalOpen} onClose={() => setIsQuickSaveModalOpen(false)} />
            <div className="bg-[#F6F3FE] rounded-sm px-5 py-2 flex gap-3 items-center">
                <Image src={Piggy} alt="" className="w-[80px] h-[80px]" />
                <p className="text-[#4F5E71] text-[14px]">Register here for a UZEL savings account and begin saving. You get up to 3% interest on each of your savings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {savings.map((saving) => (
                    <Card key={saving.currency} className="bg-[#D0C4F8] border-[#6139E733] text-white rounded-md shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <CircleFlag countryCode={saving.flag} className="w-10 h-10" />
                                {saving.currency === "NGN" ? "Nigerian savings" :
                                    saving.currency === "CAD" ? "Canadian savings" :
                                        saving.currency === "GBP" ? "British savings" : "United States savings"} ({saving.currency})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[14px]">{saving.description}</p>
                            <div className="text-2xl font-bold pt-2">
                                {saving.currency === "NGN" ? "₦" :
                                    saving.currency === "CAD" ? "$" :
                                        saving.currency === "GBP" ? "£" : "$"}
                                {saving.balance}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <div className="bg-[#F6F3FE] rounded-md px-5 py-4  col-span-2 flex flex-col gap-3 border border-[#D0C4F8]">
                    <div className="flex flex-col gap-3">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M19.9999 28.9167C21.5002 28.9167 22.7165 27.7004 22.7165 26.2001C22.7165 24.6997 21.5002 23.4834 19.9999 23.4834C18.4995 23.4834 17.2832 24.6997 17.2832 26.2001C17.2832 27.7004 18.4995 28.9167 19.9999 28.9167Z" fill="#6139E7" />
                            <path d="M27.7507 15.7334H12.2507C5.41732 15.7334 3.33398 17.8167 3.33398 24.6501V27.7501C3.33398 34.5834 5.41732 36.6667 12.2507 36.6667H27.7507C34.584 36.6667 36.6673 34.5834 36.6673 27.7501V24.6501C36.6673 17.8167 34.584 15.7334 27.7507 15.7334ZM20.0007 31.2334C17.2173 31.2334 14.9673 28.9667 14.9673 26.2001C14.9673 23.4334 17.2173 21.1667 20.0007 21.1667C22.784 21.1667 25.034 23.4334 25.034 26.2001C25.034 28.9667 22.784 31.2334 20.0007 31.2334Z" fill="#6139E7" />
                            <path opacity="0.4" d="M11.8665 15.7497V13.7997C11.8665 8.91634 13.2499 5.66634 19.9999 5.66634C26.7499 5.66634 28.1332 8.91634 28.1332 13.7997V15.7497C28.9832 15.7663 29.7499 15.7997 30.4665 15.8997V13.7997C30.4665 9.29967 29.3832 3.33301 19.9999 3.33301C10.6165 3.33301 9.5332 9.29967 9.5332 13.7997V15.883C10.2332 15.7997 11.0165 15.7497 11.8665 15.7497Z" fill="#6139E7" />
                        </svg>

                        <p className="text-[#4F5E71] text-[14px]">Secure all of your savings to prevent unnecessary withdrawals. Set a withdrawal date for yourself to unlock your savings. You can set different dates for each currency. Note that you will incur a 1% penalty fee if you choose to withdraw your funds before the designated date.</p>
                    </div>
                    <Button className="bg-[#6139E7] text-white w-fit px-4 py-2 rounded-md" onClick={() => setIsLockModalOpen(true)}>Lock Savings</Button>
                </div>


                <LockModal isOpen={isLockModalOpen} onClose={() => setIsLockModalOpen(false)} />
            </div>

            
        </div>
    );
}
