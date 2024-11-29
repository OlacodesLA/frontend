import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AccountVerification() {
  return (
    <Card className="mb-6  bg-[#6139E726]">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <svg
              className="w-16 h-16"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="4"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeDasharray="100"
                strokeDashoffset="60"
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="10"
                fill="#8b5cf6"
                fontWeight="bold"
              >
                40%
              </text>
            </svg>
          </div>
          <div >
            <h3 className="font-semibold text-lg">
              Account Verification Progress
            </h3>
            <p className="text-[14px]  text-muted-foreground">
              Congrats Makinwa! You are 40% done with your account verification.
              kindly check your mail complete your <br /> account verification
            </p>
          </div>
        </div>
        <Button className="bg-[#6139E7]  hover:bg-[#6139E7] text-primary-foreground">Continue</Button>
      </CardContent>
    </Card>
  );
}
