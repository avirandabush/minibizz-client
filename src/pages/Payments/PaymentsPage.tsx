
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import PaymentListItem from '../../components/ListItem/PaymentListItem'

export default function PaymentsPage() {
  const { payments, loading } = usePayments()
  const { customers } = useCustomers()

  const [filteredItems, setFilteredItems] = useState(payments)
  const navigate = useNavigate()

  useEffect(() => {
    setFilteredItems(payments)
  }, [payments])

  // helper למציאת שם לקוח
  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'לא ידוע'
  }

  const handleSearch = (text: string) => {
    const value = text.toLowerCase()

    setFilteredItems(
      payments.filter(p =>
        getCustomerName(p.customerId).toLowerCase().includes(value)
      )
    )
  }

  const handleSort = (option: string) => {
    const sorted = [...filteredItems].sort((a, b) => {
      if (option === 'תאריך חדש-ישן') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }

      if (option === 'סכום גבוה-נמוך') {
        return b.amount - a.amount
      }

      return 0
    })

    setFilteredItems(sorted)
  }

  const handleFilter = (option: string) => {
    if (option === 'ממתין') {
      setFilteredItems(payments.filter(p => p.status === 'PENDING'))
    } else if (option === 'הושלם') {
      setFilteredItems(payments.filter(p => p.status === 'COMPLETED'))
    } else {
      setFilteredItems(payments)
    }
  }

  const handleAdd = () => {
    navigate('/payments/new')
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
          <PaymentListItem
            key={item.id}
            item={item}
            customerName={getCustomerName(item.customerId)}
          />
        )}
      />
    </div>
  )
}