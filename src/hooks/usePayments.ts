import { useEffect, useState } from 'react'
import { paymentsApi } from '../service/payments.api'
import { useAuth } from '../app/AuthContext'
import type { Payment } from '../types/types'

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

    const createPayment = async (data: Omit<Payment, 'id'>) => {
        const newPayment = await paymentsApi.create(data)
        setPayments(prev => [...prev, newPayment])
    }

    const updatePayment = async (data: Partial<Payment> & { id: string }) => {
        const updatedPayment = await paymentsApi.update(data.id, data)
        setPayments(prev => prev.map(p => p.id === data.id ? { ...p, ...updatedPayment } : p)
        )
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
        updatePayment
    }
}