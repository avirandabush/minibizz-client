import { apiClient } from '@/shared/service/apiClient'
import type { User } from '../types'

export type CreateUserDTO = Omit<User, 'id' | 'authId' | 'createdAt' | 'updatedAt' | 'lastLogin'>;

export const usersApi = {
    getMe: () =>
        apiClient.get<User>('/users/me'),

    create: (data: CreateUserDTO) =>
        apiClient.post<User>('/users', data),

    updateMe: (data: Partial<CreateUserDTO>) =>
        apiClient.patch<User>('/users/me', data),
}
