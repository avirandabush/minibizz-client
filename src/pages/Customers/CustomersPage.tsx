import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import CustomerItem from '../../components/ListItem/ListItem'

export default function CustomersPage() {
  const { customers, loading } = useCustomers()
  const [filteredItems, setFilteredItems] = useState(customers)
  const navigate = useNavigate()

  // sync ראשוני + כשמגיעים נתונים מהשרת
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
    // כרגע אין שדה אמיתי לסינון → נשאיר placeholder חכם
    if (option === 'לקוחות חדשים') {
      setFilteredItems(customers.slice(-5)) // לדוגמה: אחרונים
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
          <CustomerItem key={item.id} item={item} />
        )}
      />
    </div>
  )
}
