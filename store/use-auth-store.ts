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

type AuthStore = {
  user: User;
  setUser: (user: User) => void;
  dialCode: string;
  setDialCode: (dialCode: string) => void;
  deleteUser: () => void;
};

const initState: Partial<User> = {};
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: initState as User,
        setUser: (user: User) => {
          const { first_name, last_name } = user || {};
          const initials = `${first_name?.[0] ?? ""}${
            last_name?.[0] ?? ""
          }`.toUpperCase();
          set(() => ({
            user: {
              ...user,
              initials,
            },
          }));
        },
        dialCode: "",
        setDialCode: (dialCode: string) => set(() => ({ dialCode })),
        deleteUser: () => set(() => ({ user: initState as User })),
      }),
      {
        name: "user-auth-store",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: "user-auth-store" }
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
