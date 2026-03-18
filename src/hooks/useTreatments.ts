import { useEffect, useState } from 'react'
import { treatmentsApi } from '../service/treatments.api'
import type { Treatment } from '../types/types'

export function useTreatments() {
    const [treatments, setTreatments] = useState<Treatment[]>([])

    const fetchTreatments = async () => {
        const data = await treatmentsApi.getAll()
        setTreatments(data)
    }

    useEffect(() => {
        fetchTreatments()
    }, [])

    return {
        treatments,
        fetchTreatments,
    }
}