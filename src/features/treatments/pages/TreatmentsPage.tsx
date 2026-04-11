import { useNavigate } from 'react-router-dom'
import ListToolbar from '@/shared/components/ListToolbar/ListToolbar'
import List from '@/shared/components/List/List'
import { useTreatments } from '../hooks/useTreatments'
import TreatmentListItem from '../components/TreatmentListItem'
import { type Treatment } from '../types'
import EmptyState from '@/shared/components/EmptyState/EmptyState'
import SkeletonList from '@/shared/components/Skeleton/SkeletonList/SkeletonList'
import { useListManager } from '@/shared/hooks/useListManager'

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
      'מחיר: נמוך לגבוה': (a, b) => a.specs.price - b.specs.price,
      'מחיר: גבוה לנמוך': (a, b) => b.specs.price - a.specs.price,
    },
    filterLogics: {
      'כל הטיפולים': (items) => items,
      'פעילים בלבד': (items) => items.filter(t => t.isActive === true),
      'לא פעילים': (items) => items.filter(t => t.isActive === false),
    },
    defaultSort: 'שם א-ת'
  })

  const handleToggle = async (t: Treatment) => {
    const status = t.isActive === true ? false : true

    await updateTreatment(t.id, {
      ...t,
      isActive: status
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