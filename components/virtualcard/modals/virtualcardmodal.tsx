"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import card1 from "../../../public/CARD.svg"
import card2 from "../../../public/CARD (1).svg"

interface VirtualCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const cards = [
    {
        cardType: "UZEL MASTER CARD",
        flag: "master",
        description: "Click here to get your UZEL Prepaid Mastercard for safer, smarter, and more convenient options to pay than cash.",
        fee: "$6",
        creationFee: "$3",
        topUpFee: "$3"
    },
    {
        cardType: "UZEL VISA CARD",
        flag: "visa",
        description: "Click here to get your UZEL virtual Visa card for instant online payments anywhere.",
        fee: "$5",
        creationFee: "$2",
        topUpFee: "$3"
    }
];

export function VirtualCardModal({ isOpen, onClose }: VirtualCardModalProps) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [step, setStep] = useState(1);

    const handleCardSelect = (card: any) => {
        setSelectedCard(card);
    };

    const handleProceed = () => {
        if (selectedCard) {
            setStep(2);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-dm">
                {step === 1 ? (
                    <>
                        <h1 className="text-[20px] text-center">Virtual Card Type</h1>
                        <p className="text-[14px] text-[#4F5E71] text-center">Select the type of UZEL virtual card you would like to create</p>

                        <div className="flex gap-5">
                            {cards.map((card) => (
                                <Card
                                    key={card.cardType}
                                    className={`w-full bg-[#6139E705] text-black rounded-md shadow-md cursor-pointer border ${selectedCard === card ? "border-blue-500" : "border-transparent"}`}
                                    onClick={() => handleCardSelect(card)}
                                >
                                    <CardContent>
                                        <p className="text-[16px] text-[#232324]">{card.cardType}</p>
                                        <p className="text-[14px] text-[#4F5E71CC]">{card.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="w-full py-4">
                            <Button
                                type="button"
                                className="w-full"
                                disabled={!selectedCard}
                                onClick={handleProceed}
                            >
                                Proceed
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-[20px] text-center">UZEL Virtual Card</h1>
                        <div className="text-center my-4">
                            <Image src={card1} alt={selectedCard?.cardType} width={300} height={180} />
                            <p className="text-[16px] font-bold">{selectedCard?.cardType}</p>
                        </div>
                        <p className="text-[14px] text-[#4F5E71]">A one-time fee of {selectedCard?.fee} will be deducted from your UZEL USD account. Here's the breakdown:</p>
                        <ul className="text-[14px] text-[#4F5E71]">
                            <li>Card Creation Fee: {selectedCard?.creationFee}</li>
                            <li>Virtual Card Top-up: {selectedCard?.topUpFee}</li>
                        </ul>

                        <div className="w-full py-4">
                            <Button type="button" className="w-full" onClick={onClose}>
                                Confirm & Continue
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
