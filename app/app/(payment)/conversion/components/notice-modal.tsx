import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw } from "lucide-react";

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function NoticeModal({ isOpen, onClose, onProceed }: NoticeModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Notice</DialogTitle>
          <DialogDescription className="text-start text-sm">
            This conversion rate remains valid for only 60 seconds. After this
            period, the system automatically recalculates any pending conversion
            requests.{" "}
            <span className="text-[#7F56D9]">
              This means the value you receive may vary, depending on the
              current exchange rate at the time of re-conversion.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <RefreshCw className="w-12 h-12 text-[#7F56D9] animate-spin" />
          <div className="flex items-center gap-2">
            <Checkbox
              id="dontShow"
              checked={dontShowAgain}
              onCheckedChange={(checked) =>
                setDontShowAgain(checked as boolean)
              }
            />
            <label htmlFor="dontShow" className="text-sm text-muted-foreground">
              Don&apos;t show again
            </label>
          </div>
        </div>
        <Button
          className="w-full bg-[#7F56D9] hover:bg-[#7F56D9]/90"
          onClick={onProceed}
        >
          Proceed
        </Button>
      </DialogContent>
    </Dialog>
  );
}
