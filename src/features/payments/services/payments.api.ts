import { apiClient } from '@/shared/service/apiClient'
import type { Payment } from "../types"

export type CreatePaymentDTO = Omit<Payment, 'id' | 'userId' | 'referenceNumber' | 'createdAt' | 'updatedAt'>

export const paymentsApi = {
  getAll: () =>
    apiClient.get<Payment[]>('/payments'),

  getById: (id: string) =>
    apiClient.get<Payment>(`/payments/${id}`),

  create: (data: CreatePaymentDTO) =>
    apiClient.post<Payment>('/payments', data),

  update: (id: string, data: Partial<CreatePaymentDTO>) =>
    apiClient.patch<Payment>(`/payments/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/payments/${id}`),
}

