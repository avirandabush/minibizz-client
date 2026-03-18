import { apiClient } from './api'
import type { Payment } from '../types/types'

export const paymentsApi = {
  getAll: () => apiClient.get<Payment[]>('/payments'),

  create: (data: Omit<Payment, 'id'>) =>
    apiClient.post<Payment>('/payments', data),

  update: (id: string, data: Partial<Payment>) =>
    apiClient.put<Payment>(`/payments/${id}`, data),
}