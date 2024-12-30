"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeatureItem } from "./featureitem";

export function WelcomeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
    const featureItems = [
        {
            icon: "/icons/multicurrency.svg",
            title: "Multi-currency account",
            description:
                "You automatically have for different multi-currency accounts, NGN, CAD, GBP, and USD account) for your use. You also have the option to create more accounts.",
        },
        {
            icon: "/icons/p2picon.svg",
            title: "Peer to Peer currency trade",
            description: "Check the P2P trade to have access to our peer-to-peer currencies trade.",
        },
        {
            icon: "/icons/paymentsicon.svg",
            title: "Payments",
            description: "Transfer funds internationally across different currencies using our payment option.",
        },
        {
            icon: "/icons/transactionsicon.svg",
            title: "Transactions",
            description: "Check the details and status of all your incoming and outgoing payments.",
        },
        {
            icon: "/icons/profileicon.svg",
            title: "Profile",
            description:
                "You now have a unique tag and username for all transactions with Uzel. Check your profile for more details, and feel free to update your information anytime.",
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg mx-auto bg-background rounded-lg shadow-md">
                <DialogHeader className="text-center py-4">
                    <DialogTitle className="text-lg font-semibold">Welcome to UZEL</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 px-6 py-4">
                    <ul className="space-y-4">
                        {featureItems.map((item, index) => (
                            <FeatureItem
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </ul>
                </div>
                <div className="px-6 pb-6">
                    <Button onClick={onClose} className="w-full bg-[#6139E7] hover:bg-primary/90 text-white">
                        Proceed to dashboard
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
