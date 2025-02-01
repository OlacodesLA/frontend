import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagInputProps {
  onNext: (account: any) => void;
}

export function TagInput({ onNext }: TagInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding account
    onNext({
      name: "Amori Ademakinwa Designer",
      tag: "@Makinwaa",
      avatar: "/placeholder.svg",
      type: "Nigerian account",
      currency: "NGN",
    });
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <p className="text-center text-sm text-muted-foreground pb-6">
        Send funds to friends and family members by using their UZEL tag.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="uzel-tag" className="text-sm font-medium">
            Enter recipient UZEL tag
          </label>
          <Input
            id="uzel-tag"
            placeholder="UZEL tag (eg @makinwaa)"
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]"
        >
          Find user
        </Button>
      </form>
    </div>
  );
}
