export interface Account {
  type: string;
  balance: string;
  currency: string;
}

export interface PaymentFormData {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  step1: {
    country: string;
    fullName: string;
    bankName: string;
    branchAddress: string;
    swiftCode: string;
  };
  step2: {
    accountNumber: string;
    intermediaryBank: string;
    bankName: string;
    branchAddress: string;
    swiftCode: string;
  };
}
