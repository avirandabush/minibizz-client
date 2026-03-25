import { apiClient } from './apiClient'
import type { Payment } from "../types/index"

export type CreatePaymentDTO = Omit<Payment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>

export const paymentsApi = {
  getAll: () => apiClient.get<Payment[]>('/payments'),

  create: (data: CreatePaymentDTO) => {
    const now = new Date().toISOString();
    
    return apiClient.post<Payment>('/payments', {
      ...data,
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
