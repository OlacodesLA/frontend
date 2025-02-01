"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  FileSpreadsheet,
  Info,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Account } from "@/interfaces/payments";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import Image from "next/image";
import { usePaymentStore } from "@/store/use-paymanet-store";
import { CircleFlag } from "react-circle-flags";
import SelectCountries from "@/helpers/select-countries";
import { Beneficiary } from "@/interfaces/bulk-transfer";

export function BulkPaymentForm({
  handleFileUpload,
  setShowAddAccount,
  entries,
  setEntries,
  splitEqually,
  handleSplitToggle,
  totalAmount,
  handleAmountChange,
  note,
  setNote,
  setShowOTP,
}: any) {
  const router = useRouter();

  const { massStep, setMassStep, setMassSuccess, massSuccess } =
    usePaymentStore((state) => state);

  const [currency, setCurrency] = useQueryState("currency", {
    defaultValue: "",
  });

  const [formData, setFormData] = useState<any>({
    amount: "",
    fromCurrency: currency,
    toCurrency: "NGN",
    recipientDetails: {
      country: "",
      fullName: "",
      bankName: "",
      branchAddress: "",
      swiftCode: "",
    },
  });

  const accounts = [
    { currency: "NGN account", code: "NGN", flag: "ng", icon: "₦" },
    { currency: "CAD account", code: "CAD", flag: "ca", icon: "$" },
    { currency: "GBP account", code: "GBP", flag: "gb", icon: "£" },
    { currency: "USD account", code: "USD", flag: "us", icon: "$" },
  ];

  return (
    <div className="">
      <ArrowLeft
        onClick={() => {
          router.back();
        }}
        className="h-fit w-7 ml-10"
      />

      <div className="max-w-2xl mx-auto p-4 mb-20">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-semibold text-center">Bulk Transfer</h1>
          <p className="text-sm text-center">
            UZEL bulk transfer, where you can send to 2-50 different account at
            once.
          </p>
        </div>

        {massStep === 1 && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 bg-purple-50 hover:bg-purple-100 border-purple-100"
              >
                Upload a CSV or Excel file
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setMassStep(2)}
              >
                Add from saved beneficiaries
              </Button>
            </div>

            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".csv,.xlsx,.xls"
                id="file-upload"
              />
              <Label
                htmlFor="file-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-purple-600" />
                <span className="text-sm text-muted-foreground">
                  Click here to select your file
                </span>
              </Label>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Download Excel Template
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Download CSV Template
              </Button>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => setMassStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {massStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              {SAMPLE_BENEFICIARIES.map((beneficiary) => (
                <div
                  key={beneficiary.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={beneficiary.avatar || "/placeholder.svg"}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{beneficiary.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {beneficiary.accountNumber} ({beneficiary.bank})
                      </div>
                    </div>
                  </div>
                  <Checkbox />
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => setMassStep(3)}
            >
              Continue
            </Button>
          </div>
        )}

        {massStep === 3 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">View Entry</h2>
              <span className="text-purple-600">(4/50)</span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Bank Name</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.accountNumber}</TableCell>
                    <TableCell>{entry.accountName}</TableCell>
                    <TableCell>{entry.bankName}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newEntries = [...entries];
                          newEntries.splice(index, 1);
                          setEntries(newEntries);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              variant="link"
              className="text-purple-600"
              onClick={() => setShowAddAccount(true)}
            >
              Add new account +
            </Button>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => setMassStep(4)}
            >
              Continue
            </Button>
          </div>
        )}

        {massStep === 4 && (
          <div className="space-y-6">
            <div>
              <Label>Enter the amount you wish to send</Label>
              <div className="relative mt-2">
                <Input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="pl-8"
                  placeholder="0.00"
                />
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  ₦
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Entry {entries.length}/50</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">Split Amount Equally</span>
                <Switch
                  checked={splitEqually}
                  onCheckedChange={handleSplitToggle}
                />
              </div>
            </div>

            <div className="space-y-4">
              {entries.map((entry: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{entry.accountName}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.accountNumber} ({entry.bankName})
                      </div>
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={entry.amount}
                    onChange={(e) => {
                      const newEntries = [...entries];
                      newEntries[index].amount = e.target.value;
                      setEntries(newEntries);
                    }}
                    className="w-32"
                    disabled={splitEqually}
                  />
                </div>
              ))}
            </div>

            <div>
              <Label>Add Note</Label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Attach note here"
                className="mt-2"
              />
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowOTP(true)}
            >
              Proceed
            </Button>

            <Button
              variant="ghost"
              className="w-full text-red-500"
              onClick={() => setMassStep(1)}
            >
              Cancel transaction
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const SAMPLE_BENEFICIARIES: Beneficiary[] = [
  {
    id: "1",
    name: "Ademakinwa Amori Designer",
    accountNumber: "0069405573",
    bank: "Sterling bank",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Mbang Dawn Testimony",
    accountNumber: "0069405573",
    bank: "First bank",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
