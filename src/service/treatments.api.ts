import { apiClient } from './apiClient'
import type { Treatment } from '../types/types'

export const treatmentsApi = {
  getAll: () => apiClient.get<Treatment[]>('/treatments'),

  create: (data: Omit<Treatment, 'id' | 'createdAt'>) =>
    apiClient.post<Treatment>('/treatments', data),

  update: (id: string, data: Partial<Treatment>) =>
  apiClient.patch<Treatment>(`/treatments/${id}`, data),

  delete: (id: string) => apiClient.delete(`/treatments/${id}`),
}