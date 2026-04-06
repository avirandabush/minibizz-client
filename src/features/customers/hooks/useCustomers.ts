import { useEffect, useState } from 'react'
import { customersApi,  type CreateCustomerDTO } from '../services/customers.api'
import { useAuth } from '@/features/auth/context/AuthContext'
import type { Customer } from "../types"

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const fetchCustomers = async () => {
        setLoading(true)
        try {
            const data = await customersApi.getAll()
            setCustomers(data)
        } finally {
            setLoading(false)
        }
    }

    const createCustomer = async (data: CreateCustomerDTO) => {
        const newCustomer = await customersApi.create(data)
        setCustomers(prev => [...prev, newCustomer])
        return newCustomer
    }

    const updateCustomer = async (id: string, data: Partial<CreateCustomerDTO>) => {
        const updated = await customersApi.update(id, data)
        setCustomers(prev =>
            prev.map(c => c.id === id ? { ...c, ...updated } : c)
        )
    }

    const deleteCustomer = async (id: string) => {
        await customersApi.delete(id)
        setCustomers(prev => prev.filter(c => c.id !== id))
    }

    useEffect(() => {
        if (user) {
            fetchCustomers()
        }
    }, [user])

    return {
        customers,
        loading,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    }
}