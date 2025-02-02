"use client";
import { useRouter } from "next/navigation";
import { SuccessModal } from "@/components/payments/modals/success";
import { LocalPaymentForm } from "@/components/payments/local-payment";
import { PaymentStepsForm } from "@/components/payments/payment-steps-form";
import { usePaymentStore } from "@/store/use-paymanet-store";
import React, { useState } from "react";
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
import {
  Beneficiary,
  BulkTransferEntry,
  UploadedFile,
} from "@/interfaces/bulk-transfer";
import { BulkPaymentForm } from "@/components/payments/local-payment/bulk/form";
import { formatAmount, splitAmountEqually } from "@/utils/money";
import { OTPModal } from "@/components/payments/modals/otp";

type Props = {};

const MassPayment = (props: Props) => {
  const { massStep, setMassStep, setMassSuccess, massSuccess } =
    usePaymentStore((state) => state);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<
    Beneficiary[]
  >([]);
  const [entries, setEntries] = useState<BulkTransferEntry[]>([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [splitEqually, setSplitEqually] = useState(false);
  const [note, setNote] = useState("");
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
  };

  const handleAddAccount = (data: { accountNumber: string; bank: string }) => {
    const newEntry: BulkTransferEntry = {
      accountNumber: data.accountNumber,
      accountName: "Amori Ademakinwa",
      bankName: data.bank,
      amount: splitEqually
        ? formatAmount(
            splitAmountEqually(Number(totalAmount), entries.length + 1)
          )
        : "0",
    };
    setEntries([...entries, newEntry]);
    setShowAddAccount(false);
  };

  const handleAmountChange = (amount: string) => {
    setTotalAmount(amount);
    if (splitEqually && entries.length > 0) {
      const splitAmount = splitAmountEqually(Number(amount), entries.length);
      setEntries(
        entries.map((entry) => ({
          ...entry,
          amount: formatAmount(splitAmount),
        }))
      );
    }
  };

  const handleSplitToggle = (checked: boolean) => {
    setSplitEqually(checked);
    if (checked && totalAmount && entries.length > 0) {
      const splitAmount = splitAmountEqually(
        Number(totalAmount),
        entries.length
      );
      setEntries(
        entries.map((entry) => ({
          ...entry,
          amount: formatAmount(splitAmount),
        }))
      );
    }
  };

  return (
    <div>
      <BulkPaymentForm
        setNote={setNote}
        setShowOTP={setShowOTP}
        note={note}
        splitEqually={splitEqually}
        totalAmount={totalAmount}
        handleAmountChange={handleAmountChange}
        //   handleAddAccount={handleAddAccount}
        handleSplitToggle={handleSplitToggle}
        entries={entries}
        setEntries={setEntries}
        handleFileUpload={handleFileUpload}
        setShowAddAccount={setShowAddAccount}
      />

      {/* Add Account Dialog */}
      <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Recipient account number</Label>
              <Input placeholder="Enter account number" className="mt-2" />
            </div>
            <div>
              <Label>Recipient bank</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sterling">Sterling Bank</SelectItem>
                  <SelectItem value="first">First Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() =>
                handleAddAccount({
                  accountNumber: "0069405573",
                  bank: "Sterling Bank",
                })
              }
            >
              Add Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Dialog */}

      <OTPModal
        setOtpModal={setShowOTP}
        otpModal={showOTP}
        setSuccess={setShowSuccess}
      />
      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Payment successful</h2>
            <p className="text-sm text-muted-foreground">
              You have successfully sent {formatAmount(Number(totalAmount))} to
              multiple recipients. The recipients are expected to be credited
              within 5 minutes subject to notification by the bank.
            </p>
            <div className="flex gap-4">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                View Receipt
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowSuccess(false);
                  setStep(1);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MassPayment;
