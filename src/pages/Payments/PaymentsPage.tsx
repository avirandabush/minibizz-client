
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import PaymentListItem from '../../components/ListItem/PaymentListItem'
import { PaymentStatus, type Payment } from '../../types/types'
import EmptyState from '../../components/EmptyState/EmptyState'
import SkeletonList from '../../components/Skeleton/SkeletonList/SkeletonList'

export default function PaymentsPage() {
  const { payments, updatePayment, loading } = usePayments()
  const { customers } = useCustomers()
  const [filteredItems, setFilteredItems] = useState(payments)
  const navigate = useNavigate()

  useEffect(() => {
    setFilteredItems(payments)
  }, [payments])

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

  const handleToggle = async (p: Payment) => {
    const newStatus = p.status === PaymentStatus.COMPLETED
      ? PaymentStatus.PENDING
      : PaymentStatus.COMPLETED

    await updatePayment({
      id: p.id,
      status: newStatus
    })
  }

  const handleAdd = () => {
    navigate('/payments/new')
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
              title="אין תשלומים"
              subtitle="הוסף תשלום חדש כדי להתחיל"
              actionLabel="הוסף תשלום"
              onAction={handleAdd}
            />
          ) : (
            <List
              items={filteredItems}
              renderItem={(item) => (
                <PaymentListItem
                  key={item.id}
                  item={item}
                  customerName={getCustomerName(item.customerId)}
                  onToggle={handleToggle}
                  onClick={() => navigate(`/payments/${item.id}`)}
                />
              )}
            />
          )}
        </>
      )}
    </div>
  )
}