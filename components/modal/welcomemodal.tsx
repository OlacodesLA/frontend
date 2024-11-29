import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { FeatureItem } from "./featureitem";

export function WelcomeModal() {

    const featureItems = [
        {
            icon: "/icons/multicurrency.svg",
            title: "Multi-currency account",
            description: "You automatically have for different multi-currency accounts, NGN, CAD, GBP and USD account) for your use. You also have the option to create more accounts."
        },
        {
            icon: "/icons/p2picon.svg",
            title: "Peer to Peer currency trade",
            description: "Check the P2P trade to have access to our peer-to-peer currencies trade."
        },
        {
            icon: "/icons/paymentsicon.svg",
            title: "Payments",
            description: "Transfer funds internationally across different currencies using our payment option. "
        },
        {
            icon: "/icons/transactionsicon.svg",
            title: "Transactions",
            description: "Check the details and status of all your incoming and outgoing payments."
        },
        {
            icon: "/icons/profileicon.svg",
            title: "Profile",
            description: "You now have a unique tag and username for all transactions with Uzel. Check your profile for more details, and feel free to update your information anytime."
        }
    ];

    return (
        <Card className="bg-white w-[60%] m-auto rounded-md shadow-lg py-4">
            <CardHeader className="flex flex-row items-center justify-between pb-4 px-4">
                <CardTitle className="text-lg font-semibold mx-auto">Welcome to UZEL</CardTitle>
            </CardHeader>

            <CardContent className="px-4">
                <ul className="space-y-3">
                    {featureItems.map((item, index) => (
                        <FeatureItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="px-10 pb-6">
                <Button className="w-full bg-[#6139E7] text-white hover:bg-[#6139E9]">
                    Proceed to dashboard
                </Button>
            </CardFooter>
        </Card>
    );
}
