import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: "IA-U-0002-2342",
    type: "In-app transfer",
    amount: "-2500USD",
    status: "Approved",
    description: "For your upkeep",
    date: "25/01/2023",
  },
  {
    id: "CC-U-0002-2342",
    type: "Currency conversion",
    amount: "-60,000NGN",
    status: "Approved",
    description: "Payment for the month o...",
    date: "25/01/2023",
  },
  {
    id: "CC-U-0002-2342",
    type: "Currency conversion",
    amount: "+105,350NGN",
    status: "Pending",
    description: "Thank you Makinwa",
    date: "25/01/2023",
  },
  {
    id: "CC-U-0002-2342",
    type: "Currency conversion",
    amount: "+105,350NGN",
    status: "Declined",
    description: "Thank you Makinwa",
    date: "25/01/2023",
  },
  {
    id: "CC-U-0002-2342",
    type: "Currency conversion",
    amount: "+105,350NGN",
    status: "Approved",
    description: "Thank you Makinwa",
    date: "25/01/2023",
  },
];

export function TransactionsTable() {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Recent transactions</h2>
        <Button variant="link" className="text-[#6139E7]">
          See all
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F3FE]">
            <TableHead>REFERENCE ID</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>DESCRIPTION</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell
                className={cn(
                  transaction.amount.startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                )}
              >
                {transaction.amount}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "px-3 py-1 rounded-sm text-xs",
                    transaction.status === "Approved" &&
                    "bg-[#D7EAD9] text-[#2D7738]",
                    transaction.status === "Pending" &&
                    "bg-[#FDF0E3] text-[#AE5700]",
                    transaction.status === "Declined" &&
                    "bg-[#FAEAEA] text-[#970C0C]"
                  )}
                >
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
