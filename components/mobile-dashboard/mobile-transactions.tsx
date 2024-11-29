import { Button } from "@/components/ui/button";

export function MobileTransactions() {
  const transactions = [
    {
      id: 1,
      description: "NGN to GBP - Convert",
      amount: "-105,350 NGN",
      status: "Pending",
      date: "21/02/2024",
    },
    {
      id: 2,
      description: "NGN Account Top-up",
      amount: "+105,350 NGN",
      status: "Successful",
      date: "21/02/2024",
    },
    {
      id: 3,
      description: "Transfer to Amori Ademakinwa",
      amount: "-50 GBP",
      status: "Failed",
      date: "21/02/2024",
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <Button variant="link" className="text-primary text-sm">
          See all
        </Button>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="text-sm text-muted-foreground">
                {transaction.date}
              </div>
            </div>
            <div className="text-right">
              <div
                className={
                  transaction.amount.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {transaction.amount}
              </div>
              <div
                className={`text-sm ${
                  transaction.status === "Pending"
                    ? "text-yellow-500"
                    : transaction.status === "Successful"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
