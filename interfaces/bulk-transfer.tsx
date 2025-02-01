export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  avatar: string;
}

export interface BulkTransferEntry {
  accountNumber: string;
  accountName: string;
  bankName: string;
  amount: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}
