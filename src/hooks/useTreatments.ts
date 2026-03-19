import { useEffect, useState } from 'react'
import { treatmentsApi } from '../service/treatments.api'
import type { Treatment } from '../types/types'

export function useTreatments() {
    const [treatments, setTreatments] = useState<Treatment[]>([])
    const [loading, setLoading] = useState(false)

    const fetchTreatments = async () => {
        setLoading(true)
        try {
            const data = await treatmentsApi.getAll()
            setTreatments(data)
        } finally {
            setLoading(false)
        }
    }

    const createTreatment = async (data: Omit<Treatment, 'id' | 'createdAt'>) => {
        const newTreatment = await treatmentsApi.create(data)
        setTreatments(prev => [...prev, newTreatment])
    }

    const updateTreatment = async (data: Partial<Treatment> & { id: string }) => {
        const updatedTreatment = await treatmentsApi.update(data.id, data)
        setTreatments(prev => prev.map(t => t.id === data.id ? updatedTreatment : t))
    }

    const deleteTreatment = async (id: string) => {
        await treatmentsApi.delete(id)
        setTreatments(prev => prev.filter(t => t.id !== id))
    }

    useEffect(() => {
        fetchTreatments()
    }, [])

    return {
        treatments,
        loading,
        fetchTreatments,
        createTreatment,
        updateTreatment,
        deleteTreatment
    }
}