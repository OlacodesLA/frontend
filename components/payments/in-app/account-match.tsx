import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Account } from "@/interfaces/in-app";

interface AccountMatchProps {
  account: Account;
  onNext: () => void;
}

export function AccountMatch({ account, onNext }: AccountMatchProps) {
  return (
    <div className="px-4 pb-4 pt-2">
      <p className="text-center text-sm text-muted-foreground pb-6">
        Please verify the account to make sure it is the correct match.
      </p>
      <div className="flex flex-col items-center space-y-4 mb-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={account.avatar} alt={account.name} />
          <AvatarFallback>{account.name[0]}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-medium">{account.name}</h3>
          <p className="text-sm text-muted-foreground">
            UZEL tag: {account.tag}
          </p>
        </div>
      </div>
      <Button
        onClick={onNext}
        className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]"
      >
        Proceed
      </Button>
    </div>
  );
}
