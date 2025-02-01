import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OtpVerificationProps {
  onNext: () => void;
}

export function OtpVerification({ onNext }: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <p className="text-center text-sm text-muted-foreground pb-6">
        To authenticate your request, please input the OTP sent to the email you
        used during registration (amo***@gmail.com) to complete your request.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 text-center text-lg"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <Button
          type="submit"
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]"
        >
          Proceed
        </Button>
      </form>
    </div>
  );
}
