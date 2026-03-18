import { apiClient } from './api'
import type { Customer } from '../types/types'

export const customersApi = {
  getAll: () => apiClient.get<Customer[]>('/customers'),

  getById: (id: string) =>
    apiClient.get<Customer>(`/customers/${id}`),

  create: (data: Omit<Customer, 'id' | 'createdAt'>) =>
    apiClient.post<Customer>('/customers', {
      ...data,
      createdAt: new Date().toISOString(),
    }),

  update: (id: string, data: Partial<Customer>) =>
    apiClient.put<Customer>(`/customers/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<void>(`/customers/${id}`),
}