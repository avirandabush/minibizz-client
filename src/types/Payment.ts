export const PaymentMethod = {
  CASH: 'CASH',
  BIT: 'BIT',
  PAYBOX: 'PAYBOX',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CREDIT_CARD: 'CREDIT_CARD',
  OTHER: 'OTHER',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export type PaymentTreatmentLine = {
  treatmentId: string;
  name: string;
  price: number;     
  quantity: number; 
};

export type PaymentSummary = {
  subtotal: number;  
  discount: number;  
  total: number;      
};

export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export type Payment = {
  id: string;
  userId: string;
  customerId: string;

  items: PaymentTreatmentLine[];
  summary: PaymentSummary;

  method: PaymentMethod;
  status: PaymentStatus;
  date: string;

  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
};
