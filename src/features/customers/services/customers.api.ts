import { apiClient } from '@/shared/service/apiClient'
import type { Customer } from "../types/index"

export type CreateCustomerDTO = Omit<Customer, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

export const customersApi = {
  getAll: () => apiClient.get<Customer[]>('/customers'),

  getById: (id: string) =>
    apiClient.get<Customer>(`/customers/${id}`),

  create: (data: CreateCustomerDTO) => {
    const now = new Date().toISOString();
    
    return apiClient.post<Customer>('/customers', {
      ...data,
      createdAt: now,
      updatedAt: now
    });
  },

  update: (id: string, data: Partial<CreateCustomerDTO>) =>
    apiClient.patch<Customer>(`/customers/${id}`, {
      ...data,
      updatedAt: new Date().toISOString()
    }),

  delete: (id: string) => apiClient.delete<void>(`/customers/${id}`),
}
