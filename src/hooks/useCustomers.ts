import { useEffect, useState } from 'react'
import { customersApi } from '../service/customers.api'
import type { Customer } from '../types/types'

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(false)

    const fetchCustomers = async () => {
        setLoading(true)
        try {
            const data = await customersApi.getAll()
            setCustomers(data)
        } finally {
            setLoading(false)
        }
    }

    const createCustomer = async (data: Omit<Customer, 'id' | 'createdAt'>) => {
        const newCustomer = await customersApi.create(data)
        setCustomers(prev => [...prev, newCustomer])
    }

    const updateCustomer = async (data: Partial<Customer> & { id: string }) => {
        const updated = await customersApi.update(data.id, data)

        setCustomers(prev =>
            prev.map(c =>
                c.id === data.id ? { ...c, ...updated } : c
            )
        )
    }

    const deleteCustomer = async (id: string) => {
        await customersApi.delete(id)
        setCustomers(prev => prev.filter(c => c.id !== id))
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return {
        customers,
        loading,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    }
}