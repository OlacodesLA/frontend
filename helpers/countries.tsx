"use client";

import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDropdownStore } from "@/lib/store/dropdown";
// import { Country, type CountryProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, LoaderCircle as SpinnerGap } from "lucide-react";
import { useDropdownStore } from "@/store/use-dropdown-store";
import { CountryProps } from "@/interfaces/general-types";
import { countries } from "@/data/countries";
import Flag from "react-world-flags";

interface CountryDropdownProps {
  disabled?: boolean;
  mapCountry?: CountryProps;
  // countriesData?: CountryProps[];
  isLoading?: boolean;
}

const CountryDropdown = ({
  disabled,
  mapCountry,
  // countriesData,
  isLoading,
}: CountryDropdownProps) => {
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false);
  const { countryValue, setCountryValue } = useDropdownStore();

  useEffect(() => {
    if (mapCountry) setCountryValue(mapCountry);
  }, [mapCountry, setCountryValue]);

  const handleSelect = (currentValue: CountryProps) => {
    setCountryValue(currentValue);
    // console.log(Value)
    setOpenCountryDropdown(false);
  };

  return (
    <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openCountryDropdown}
          className="border-[#98A2B3] truncate relative min-h-[50px] w-full !justify-between space-x-2 rounded-md border p-3 text-left placeholder:text-sm placeholder:font-normal placeholder:text-[#98A2B3] hover:bg-transparent focus:border focus:border-primary700 focus:outline-none focus-visible:ring-transparent"
          disabled={disabled}
        >
          <span className="w-full truncate">
            {isLoading && (
              <span className="flex truncate text-sm font-normal">
                <SpinnerGap size={20} className="animate-spin text-gray-700" />{" "}
                Loading countries...
              </span>
            )}
            {countryValue ? (
              <div className="flex items-end gap-2">
                <span>
                  <Flag
                    code={
                      countries?.find(
                        (country: any) => country?.name === countryValue.name
                      )?.code
                    }
                    className="w-6 h-4"
                  />
                </span>
                <span className="text-sm font-normal">
                  {
                    countries?.find(
                      (country: CountryProps) =>
                        country?.name === countryValue.name
                    )?.name
                  }
                </span>
              </div>
            ) : (
              <span>Select Country...</span>
            )}
          </span>
          <MapPin size={15} className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-60 rounded-md p-2">
        <Command>
          <div className="relative">
            <CommandInput
              className="border px-2 focus:!outline-none"
              placeholder="Search countries..."
            />
            <SearchIcon className="absolute right-3 top-[50%] h-4 w-4 translate-y-[-50%] text-gray-500" />
          </div>

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <ScrollArea className="h-[300px] w-full">
                {countries.length > 1 ? (
                  countries.map((country: CountryProps) => (
                    <CommandItem
                      onSelect={() => handleSelect(country)}
                      key={country?.code}
                      value={country?.name}
                      className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                    >
                      <div className="flex items-end gap-2">
                        <Flag code={country?.code} className="w-6 h-4" />
                        <span>{country?.name}</span>
                      </div>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          countryValue.name === country?.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                ) : (
                  <div>No countries available</div>
                )}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryDropdown;

function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
