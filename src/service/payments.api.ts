import { apiClient } from './apiClient'
import type { Payment } from "../types/index"
import { generateReferenceNumber } from '../utils/generators';

export type CreatePaymentDTO = Omit<Payment, 'id' | 'userId' | 'referenceNumber' | 'createdAt' | 'updatedAt'>

export const paymentsApi = {
  getAll: () => apiClient.get<Payment[]>('/payments'),

  create: (data: CreatePaymentDTO) => {
    const now = new Date().toISOString();
    
    return apiClient.post<Payment>('/payments', {
      ...data,
      referenceNumber: generateReferenceNumber(),
      createdAt: now,
      updatedAt: now
    });
  },

  update: (id: string, data: Partial<CreatePaymentDTO>) =>
    apiClient.patch<Payment>(`/payments/${id}`, {
      ...data,
      updatedAt: new Date().toISOString()
    }),

  delete: (id: string) => apiClient.delete(`/payments/${id}`),
}

