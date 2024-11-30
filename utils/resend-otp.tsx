import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const RESEND_TIMEOUT = 60; // in seconds
const SECRET_KEY = "mySecretKey"; // Change this to a secure key

const encryptData = (data: string) =>
  CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

const getStoredTimestamp = (): number | null => {
  const encryptedTimestamp = localStorage.getItem("otpResendTimestamp");
  if (encryptedTimestamp) {
    const decryptedTimestamp = decryptData(encryptedTimestamp);
    return decryptedTimestamp ? Number(decryptedTimestamp) : null;
  }
  return null;
};

const setStoredTimestamp = (timestamp: number) => {
  const encryptedTimestamp = encryptData(timestamp.toString());
  localStorage.setItem("otpResendTimestamp", encryptedTimestamp);
};

export const useResendOtp = (resendCodeAPI: any, email: string) => {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const storedTime = getStoredTimestamp();
    if (storedTime) {
      const elapsedTime = Math.floor((Date.now() - storedTime) / 1000);
      if (elapsedTime < RESEND_TIMEOUT) {
        setTimer(RESEND_TIMEOUT - elapsedTime);
      }
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const { mutate: resendMutation } = useMutation({
    mutationFn: () => resendCodeAPI({ email, is_auth: true }),
    onSuccess: () => {
      toast.success("OTP has been resent.");
      setStoredTimestamp(Date.now());
      setTimer(RESEND_TIMEOUT);
      setIsResending(false);
    },
    onError: (error: any) => {
      const errorData = error?.data?.data;
      if (errorData && typeof errorData === "object") {
        // Loop through each field in the error object and show the message
        Object.values(errorData).forEach((errorMessage) => {
          if (typeof errorMessage === "string") {
            toast.error(errorMessage);
          }
        });
      } else if (!errorData) {
        toast.error(error?.data?.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      setIsResending(false);
    },
  });

  const handleResendOtp = () => {
    setIsResending(true);
    resendMutation();
  };

  return { isResending, timer, handleResendOtp };
};
