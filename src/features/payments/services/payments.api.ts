import { apiClient } from '@/shared/service/apiClient'
import type { Payment } from "../types"
import { generateReferenceNumber } from '@/shared/utils/generators';

export type CreatePaymentDTO = Omit<Payment, 'id' | 'userId' | 'referenceNumber' | 'createdAt' | 'updatedAt'>

export const paymentsApi = {
  getAll: () => apiClient.get<Payment[]>('/payments'),

  getById: (id: string) => apiClient.get<Payment>(`/payments/${id}`),

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

