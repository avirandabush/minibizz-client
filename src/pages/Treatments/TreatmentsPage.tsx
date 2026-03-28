import { useNavigate } from 'react-router-dom'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import { useTreatments } from '../../hooks/useTreatments'
import TreatmentListItem from '../../components/ListItem/TreatmentListItem'
import { TreatmentStatus, type Treatment } from '../../types/index'
import EmptyState from '../../components/EmptyState/EmptyState'
import SkeletonList from '../../components/Skeleton/SkeletonList/SkeletonList'
import { useListManager } from '../../hooks/useListManager'

export default function TreatmentsPage() {
  const { treatments, updateTreatment, loading } = useTreatments()
  const navigate = useNavigate()

  const {
    processedItems,
    setSearchTerm,
    setActiveSort,
    setActiveFilter,
    sortOptions,
    filterOptions
  } = useListManager({
    items: treatments,
    searchFields: (t) => [t.name],
    sortLogics: {
      'שם א-ת': (a, b) => a.name.localeCompare(b.name),
      'מחיר: נמוך לגבוה': (a, b) => a.price - b.price,
      'מחיר: גבוה לנמוך': (a, b) => b.price - a.price,
    },
    filterLogics: {
      'כל הטיפולים': (items) => items,
      'פעילים בלבד': (items) => items.filter(t => t.status === TreatmentStatus.ACTIVE),
      'לא פעילים': (items) => items.filter(t => t.status === TreatmentStatus.INACTIVE),
    },
    defaultSort: 'שם א-ת'
  })

  const handleToggle = async (t: Treatment) => {
    const newStatus = t.status === TreatmentStatus.ACTIVE
      ? TreatmentStatus.INACTIVE
      : TreatmentStatus.ACTIVE

    await updateTreatment(t.id, {
      status: newStatus
    })
  }

  const handleAdd = () => {
    navigate('/treatments/new')
  }

  return (
    <div style={{ margin: '16px' }}>
      <ListToolbar
        onSearch={setSearchTerm}
        onSort={setActiveSort}
        onFilter={setActiveFilter}
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        onAdd={handleAdd}
        placeholder="חפש שם טיפול..."
      />

      {loading ? (
        <SkeletonList />
      ) : (
        <>
          {processedItems.length === 0 ? (
            <EmptyState
              title="אין טיפולים"
              subtitle="הוסף טיפול חדש כדי להתחיל"
              actionLabel="הוסף טיפול"
              onAction={handleAdd}
            />
          ) : (
            <List
              items={processedItems}
              renderItem={(item) => (
                <TreatmentListItem
                  key={item.id}
                  item={item}
                  onToggle={handleToggle}
                  onClick={() => navigate(`/treatments/${item.id}`)}
                />
              )}
            />
          )}
        </>
      )}
    </div>
  )
}