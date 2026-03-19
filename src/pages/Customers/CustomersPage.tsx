import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import CustomerListItem from '../../components/ListItem/CustomerListItem'

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
      customers.filter(c =>
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
          <CustomerListItem key={item.id} item={item} />
        )}
      />
    </div>
  )
}
