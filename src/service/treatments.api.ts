import type { Treatment } from '../types/types'

const mockTreatments: Treatment[] = [
  { id: '1', name: 'Menicur', price: 120, isActive: true },
  { id: '2', name: 'Pedicur', price: 110, isActive: false },
  { id: '3', name: 'Base Removal', price: 30, isActive: true },
  { id: '4', name: 'Nail Fix', price: 10, isActive: true },
]

export function fetchTreatments(): Promise<Treatment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTreatments)
    }, 500)
  })
}