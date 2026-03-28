import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import CustomerListItem from '../../components/ListItem/CustomerListItem'
import EmptyState from '../../components/EmptyState/EmptyState'
import SkeletonList from '../../components/Skeleton/SkeletonList/SkeletonList'
import { useListManager } from '../../hooks/useListManager'

export default function CustomersPage() {
  const { customers, loading } = useCustomers()
  const navigate = useNavigate()

  const {
    processedItems,
    setSearchTerm,
    setActiveSort,
    setActiveFilter,
    sortOptions,
    filterOptions
  } = useListManager({
    items: customers,
    searchFields: (c) => [c.name, c.phone || '', c.email || ''],
    sortLogics: {
      'שם א-ת': (a, b) => a.name.localeCompare(b.name),
      'שם ת-א': (a, b) => b.name.localeCompare(a.name),
      'חדש ביותר': (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    },
    filterLogics: {
      'כל הלקוחות': (items) => items,
      'לקוחות פעילים': (items) => items.filter(c => c.isActive),
      'לא פעילים': (items) => items.filter(c => !c.isActive),
      'נוספו לאחרונה': (items) => [...items].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 10),
    },
    defaultSort: 'שם א-ת'
  })

  const handleAdd = () => {
    navigate('/customers/new')
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
        placeholder="חפש שם או טלפון..."
      />

      {loading ? (
        <SkeletonList />
      ) : (
        <>
          {processedItems.length === 0 ? (
            <EmptyState
              title="אין לקוחות"
              subtitle="הוסף לקוח חדש כדי להתחיל"
              actionLabel="הוסף לקוח"
              onAction={handleAdd}
            />
          ) : (
            <List
              items={processedItems}
              renderItem={(item) => (
                <CustomerListItem
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/customers/${item.id}`)}
                />
              )}
            />
          )}
        </>
      )}
    </div>
  )
}
