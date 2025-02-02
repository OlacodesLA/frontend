export type Currency = "CAD" | "NGN" | "USD" | "GBP";

export interface ConversionRate {
  from: Currency;
  to: Currency;
  rate: number;
}

export interface ConversionDetails {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  fee: number;
  rate: number;
}
