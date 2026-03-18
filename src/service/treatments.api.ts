import { apiClient } from './api'
import type { Treatment } from '../types/types'

export const treatmentsApi = {
  getAll: () => apiClient.get<Treatment[]>('/treatments'),

  create: (data: Omit<Treatment, 'id' | 'createdAt'>) =>
    apiClient.post<Treatment>('/treatments', data),

  update: (id: string, data: Partial<Treatment>) =>
    apiClient.put<Treatment>(`/treatments/${id}`, data),
}