import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import CustomerListItem from '../../components/ListItem/CustomerListItem'
import EmptyState from '../../components/EmptyState/EmptyState'
import SkeletonList from '../../components/Skeleton/SkeletonList/SkeletonList'

export default function CustomersPage() {
  const { customers, loading } = useCustomers()
  const [filteredItems, setFilteredItems] = useState(customers)
  const navigate = useNavigate()

  useEffect(() => {
    setFilteredItems(customers)
  }, [customers])

  const handleSearch = (text: string) => {
    const value = text.toLowerCase()

    setFilteredItems(
      customers.filter((c): boolean =>
        c.name.toLowerCase().includes(value) ||
        (c.phone ?? '').includes(value)
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
      setFilteredItems(customers.slice(-5))
    } else {
      setFilteredItems(customers)
    }
  }

  const handleAdd = () => {
    navigate('/customers/new')
  }

  return (
    <div style={{ margin: '16px' }}>
      <ListToolbar
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        onAdd={handleAdd}
      />

      {loading ? (
        <SkeletonList />
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <EmptyState
              title="אין לקוחות"
              subtitle="הוסף לקוח חדש כדי להתחיל"
              actionLabel="הוסף לקוח"
              onAction={handleAdd}
            />
          ) : (
            <List
              items={filteredItems}
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
