import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../hooks/useCustomers'
import ListToolbar from '@/shared/components/ListToolbar/ListToolbar'
import List from '@/shared/components/List/List'
import CustomerListItem from '../components/CustomerListItem'
import EmptyState from '@/shared/components/EmptyState/EmptyState'
import SkeletonList from '@/shared/components/Skeleton/SkeletonList/SkeletonList'
import { useListManager } from '@/shared/hooks/useListManager'
import { useTranslation } from 'react-i18next'

export default function CustomersPage() {
  const { customers, loading } = useCustomers()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    processedItems,
    setSearchTerm,
    setActiveSort,
    setActiveFilter,
    sortOptions,
    filterOptions
  } = useListManager({
    items: customers,
    searchFields: (c) => [c.personal.name, c.contact.phone || '', c.contact.email || ''],
    sortLogics: {
      [t('customers.sort.nameAsc')]: (a, b) => a.personal.name.localeCompare(b.personal.name),
      [t('customers.sort.nameDesc')]: (a, b) => b.personal.name.localeCompare(a.personal.name),
      [t('customers.sort.newest')]: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
