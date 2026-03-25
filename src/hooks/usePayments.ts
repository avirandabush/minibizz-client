import { useEffect, useState } from 'react'
import { paymentsApi, type CreatePaymentDTO } from '../service/payments.api'
import { useAuth } from '../app/AuthContext'
import type { Payment } from "../types/index"

export function usePayments() {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const fetchPayments = async () => {
        setLoading(true)
        try {
            const data = await paymentsApi.getAll()
            setPayments(data)
        } finally {
            setLoading(false)
        }
    }

    const createPayment = async (data: CreatePaymentDTO) => {
        const newPayment = await paymentsApi.create(data)
        setPayments(prev => [...prev, newPayment])
        return newPayment
    }

    const updatePayment = async (id: string, data: Partial<CreatePaymentDTO>) => {
        const updated = await paymentsApi.update(id, data)
        setPayments(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p))
    }

    const deletePayment = async (id: string) => {
        await paymentsApi.delete(id)
        setPayments(prev => prev.filter(p => p.id !== id))
    }

    useEffect(() => {
        if (user) {
            fetchPayments()
        }
    }, [user])

    return {
        payments,
        loading,
        fetchPayments,
        createPayment,
        updatePayment,
        deletePayment
    }
}