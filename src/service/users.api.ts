import { apiClient } from './apiClient'
import type { User } from '../types'

export type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin'>

export const usersApi = {
    getMe: () => apiClient.get<User>('/users/me'),

    create: (data: CreateUserDTO) => {
        const now = new Date().toISOString()

        return apiClient.post<User>('/users', {
            ...data,
            createdAt: now,
            updatedAt: now,
            lastLogin: now,
        })
    },

    updateMe: (data: Partial<CreateUserDTO>) =>
        apiClient.patch<User>('/users/me', {
            ...data,
            updatedAt: new Date().toISOString(),
        }),
}
