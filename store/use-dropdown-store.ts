import { create } from "zustand";
// import { City, Country, State } from "../types";
import { CountryProps } from "@/interfaces/general-types";

interface DropdownStateProps {
  countryValue: CountryProps;
  setCountryValue: (countries: any) => void;
  openCountryDropdown: boolean;
  setOpenCountryDropdown: (openCountry: boolean) => void;
  //   stateValue: State;
  //   setStateValue: (state: State) => void;
  //   openStateDropdown: boolean;
  //   setOpenStateDropdown: (openState: boolean) => void;
  //   cityValue: City;
  //   setCityValue: (city: City) => void;
  //   openCityDropdown: boolean;
  //   setOpenCityDropdown: (openCity: boolean) => void;
}

export const useDropdownStore = create<DropdownStateProps>((set) => ({
  countryValue: {} as CountryProps,
  setCountryValue: (country: CountryProps) => {
    set({ countryValue: country });
  },
  openCountryDropdown: false,
  setOpenCountryDropdown: (openCountry: boolean) => {
    set({ openCountryDropdown: openCountry });
  },
  //   stateValue: {} as State,
  //   setStateValue: (state: State) => {
  //     set({ stateValue: state });
  //   },
  //   openStateDropdown: false,
  //   setOpenStateDropdown: (openState: boolean) => {
  //     set({ openStateDropdown: openState });
  //   },
  //   cityValue: {} as City,
  //   setCityValue: (city: City) => {
  //     set({ cityValue: city });
  //   },
  //   openCityDropdown: false,
  //   setOpenCityDropdown: (openCity: boolean) => {
  //     set({ openCityDropdown: openCity });
  //   },
}));
