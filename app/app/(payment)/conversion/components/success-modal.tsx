import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onView: () => void;
  details: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  onView,
  details,
}: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
          <h2 className="text-xl font-semibold">Order successful</h2>
          <p className="text-muted-foreground">{details}</p>
          <div className="flex gap-3 w-full">
            <Button
              className="flex-1 bg-[#7F56D9] hover:bg-[#7F56D9]/90"
              onClick={onView}
            >
              View
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
