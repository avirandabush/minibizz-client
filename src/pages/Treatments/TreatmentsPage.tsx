import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import { useTreatments } from '../../hooks/useTreatments'
import TreatmentListItem from '../../components/ListItem/TreatmentListItem'
import type { Treatment } from '../../types/types'
import { TreatmentStatus } from '../../types/types'

export default function TreatmentsPage() {
  const { treatments, updateTreatment, loading } = useTreatments()
  const [filteredItems, setFilteredItems] = useState(treatments)
  const navigate = useNavigate()

  useEffect(() => {
    setFilteredItems(treatments)
  }, [treatments])

  const handleSearch = (text: string) => {
    const value = text.toLowerCase()

    setFilteredItems(
      treatments.filter(c =>
        c.name.toLowerCase().includes(value) ||
        (c.status ?? '') === value
      )
    )
  }

  const handleSort = (option: string) => {
    const sorted = [...filteredItems].sort((a, b) =>
      option === 'שם א-ת'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )

    setFilteredItems(sorted)
  }

  const handleFilter = (option: string) => {
    if (option === 'לקוחות חדשים') {
      setFilteredItems(treatments.slice(-5))
    } else {
      setFilteredItems(treatments)
    }
  }

  const handleToggle = async (t: Treatment) => {
    const newStatus = t.status === TreatmentStatus.ACTIVE
      ? TreatmentStatus.INACTIVE
      : TreatmentStatus.ACTIVE

    await updateTreatment({
      id: t.id,
      status: newStatus
    })
  }

  const handleAdd = () => {
    navigate('/treatments/new')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ margin: '16px' }}>
      <ListToolbar
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        onAdd={handleAdd}
      />

      <List
        items={filteredItems}
        renderItem={(item) => (
          <TreatmentListItem
            key={item.id}
            item={item}
            onToggle={handleToggle} />
        )}
      />
    </div>
  )
}
