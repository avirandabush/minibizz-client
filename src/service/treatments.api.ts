import { apiClient } from './apiClient'
import type { Treatment } from "../types/index"

export type CreateTreatmentDTO = Omit<Treatment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

export const treatmentsApi = {
  getAll: () => apiClient.get<Treatment[]>('/treatments'),

  create: (data: CreateTreatmentDTO) => {
    const now = new Date().toISOString();

    return apiClient.post<Treatment>('/treatments', {
      ...data,
      createdAt: now,
      updatedAt: now
    });
  },

  update: (id: string, data: Partial<CreateTreatmentDTO>) =>
    apiClient.patch<Treatment>(`/treatments/${id}`, {
      ...data,
      updatedAt: new Date().toISOString()
    }),

  delete: (id: string) => apiClient.delete(`/treatments/${id}`),
}
