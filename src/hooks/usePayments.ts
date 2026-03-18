import { useEffect, useState } from 'react'
import { paymentsApi } from '../service/payments.api'
import type { Payment } from '../types/types'

export function usePayments() {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        fetchPayments()
    }, [])

    return {
        payments,
        loading,
        fetchPayments,
        createPayment,
    }
}