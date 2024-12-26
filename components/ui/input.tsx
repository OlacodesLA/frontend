import * as React from "react";

import { cn } from "@/lib/utils";
interface InputProps extends React.ComponentProps<"input"> {
  noBorders?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, noBorders, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[44px] w-full rounded-md border border-[#BAC7D580] placeholder:text-[14px] bg-[#FBFBFB] px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          noBorders &&
            "border-0 border-none focus-visible:border-0 focus-visible:border-none focus-visible:ring-0 ring-0 focus-visible:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
