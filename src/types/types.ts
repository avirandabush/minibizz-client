export const TreatmentStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;
export type TreatmentStatus = (typeof TreatmentStatus)[keyof typeof TreatmentStatus];

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

export type Treatment = {
  id: string
  name: string
  createdAt: string
  status: TreatmentStatus
  price: number
}

export type Customer = {
  id: string
  name: string
  phone: string
  createdAt: string
}

export type Payment = {
  id: string
  date: string
  customerId: string
  treatments: {
    treatmentId: string
    name: string
    price: number
  }[]
  amount: number
  method: PaymentMethod
  status: PaymentStatus
}