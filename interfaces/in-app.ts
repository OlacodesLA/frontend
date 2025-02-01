export type PaymentStep =
  | "tag-input"
  | "account-match"
  | "account-selection"
  | "payment-details"
  | "otp"
  | "success";

export interface Account {
  name: string;
  tag: string;
  avatar?: string;
  type: string;
  currency: string;
}

export interface PaymentDetails {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  conversionRate: number;
  sendRate: number;
}
