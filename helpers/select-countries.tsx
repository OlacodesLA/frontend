import { SelectItem } from "@/components/ui/select";
import React from "react";
import { CircleFlag } from "react-circle-flags";

type Props = {
  defaultValue: string;
};
const accounts = [
  { currency: "NGN account", code: "NGN", flag: "ng", icon: "₦" },
  { currency: "CAD account", code: "CAD", flag: "ca", icon: "$" },
  { currency: "GBP account", code: "GBP", flag: "gb", icon: "£" },
  { currency: "USD account", code: "USD", flag: "us", icon: "$" },
];

const SelectCountries = ({ defaultValue }: Props) => {
  return (
    <>
      {accounts?.map((acc) => {
        return (
          <SelectItem
            key={acc?.flag}
            defaultValue={defaultValue}
            className=""
            value={acc?.code}
          >
            <div className="flex items-center text-[14px] space-x-1 font-semibold">
              <CircleFlag
                countryCode={acc?.flag}
                height="16"
                width="16"
                className="w-4 h-4 mr-1"
              />
              <p className=" text-[14px] pt-[2px]">{acc?.code}</p>
            </div>
          </SelectItem>
        );
      })}
    </>
  );
};

export default SelectCountries;
