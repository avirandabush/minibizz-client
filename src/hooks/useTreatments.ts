import { useEffect, useState } from 'react'
import { treatmentsApi, type CreateTreatmentDTO } from '../service/treatments.api'
import { useAuth } from '../app/AuthContext'
import type { Treatment } from "../types/index"

export function useTreatments() {
    const [treatments, setTreatments] = useState<Treatment[]>([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const fetchTreatments = async () => {
        setLoading(true)
        try {
            const data = await treatmentsApi.getAll()
            setTreatments(data)
        } finally {
            setLoading(false)
        }
    }

    const createTreatment = async (data: CreateTreatmentDTO) => {
        const newTreatment = await treatmentsApi.create(data)
        setTreatments(prev => [...prev, newTreatment])
        return newTreatment
    }

    const updateTreatment = async (id: string, data: Partial<CreateTreatmentDTO>) => {
        const updated = await treatmentsApi.update(id, data)
        setTreatments(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t))
    }

    const deleteTreatment = async (id: string) => {
        await treatmentsApi.delete(id)
        setTreatments(prev => prev.filter(t => t.id !== id))
    }

    useEffect(() => {
        if (user) {
            fetchTreatments()
        }
    }, [user])

    return {
        treatments,
        loading,
        fetchTreatments,
        createTreatment,
        updateTreatment,
        deleteTreatment
    }
}