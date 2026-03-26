export const PaymentMethod = {
  CASH: 'CASH',
  BIT: 'BIT',
  PAYBOX: 'PAYBOX',
  BANK_TRANSFER: 'BANK_TRANSFER',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export type Payment = {
  id: string;
  userId: string;

  customerId: string;
  treatments: {
    treatmentId: string;
    name: string;
    price: number;
  }[];
  amount: number;
  discount: number;
  total: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;

  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
};
