"use client";

import { StateCreator, create } from "zustand";
import {
  PersistOptions,
  PersistStorage,
  createJSONStorage,
  persist,
  devtools,
} from "zustand/middleware";
import { getInitials } from "@/utils";
import { User } from "@/interfaces/user-types";
// import CryptoJS from "crypto-js";

type PaymentStore = {
  selectedBeneficiary: any;
  step: number;
  localStep: number;
  success: boolean;
  otpModal: boolean;
  showBeneficiaries: boolean;
  setShowBeneficiaries: (step: boolean) => void;
  setSelectedBeneficiary: (selectedBeneficiary: any) => void;
  setStep: (step: number) => void;
  setLocalStep: (step: number) => void;
  setSuccess: (step: boolean) => void;
  setOtpModal: (step: boolean) => void;
};

const initState: Partial<User> = {};
export const usePaymentStore = create<PaymentStore>()(
  devtools(
    (set) => ({
      step: 1,
      otpModal: false,
      showBeneficiaries: false,
      selectedBeneficiary: null,
      localStep: 1,
      success: false,
      setSelectedBeneficiary: (selectedBeneficiary: any) => {
        set({ selectedBeneficiary });
      },
      setShowBeneficiaries: (showBeneficiaries: boolean) => {
        set({ showBeneficiaries });
      },
      setLocalStep: (localStep: number) => {
        set({ localStep });
      },
      setStep: (step: number) => {
        set({ step });
      },
      setSuccess: (success: boolean) => {
        set({ success });
      },
      setOtpModal: (otpModal: boolean) => {
        set({ otpModal });
      },
    }),
    {
      name: "step",
      // storage: createJSONStorage(() => localStorage),
    }
  )
);

const STORE_KEY = process.env.NEXT_PUBLIC_STORE_KEY;

// export class EncryptedStorage implements PersistStorage<any> {
//   getItem(key: string): any | undefined {
//     const value = localStorage.getItem(key);

//     if (value) {
//       const decryptedBytes = CryptoJS.AES.decrypt(value, STORE_KEY);
//       const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
//       return decryptedValue;
//     }

//     return value;
//   }

//   setItem(key: string, value: any): void {
//     const encrypted = CryptoJS.AES.encrypt(value, STORE_KEY).toString();
//     localStorage.setItem(key, encrypted);
//   }

//   removeItem(key: string): void {
//     localStorage.removeItem(key);
//   }
// }
