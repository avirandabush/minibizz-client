
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import PaymentListItem from '../../components/ListItem/PaymentListItem'
import { PaymentStatus, type Payment } from '../../types/index'
import EmptyState from '../../components/EmptyState/EmptyState'
import SkeletonList from '../../components/Skeleton/SkeletonList/SkeletonList'
import './PaymentsPage.css'

export default function PaymentsPage() {
  const { payments, updatePayment, loading } = usePayments()
  const { customers } = useCustomers()
  const [filteredItems, setFilteredItems] = useState(payments)
  const navigate = useNavigate()

  useEffect(() => {
    const sorted = [...payments].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    setFilteredItems(sorted)
  }, [payments])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  const groupedPayments = useMemo(() => {
    const groups: { [key: string]: Payment[] } = {};

    filteredItems.forEach(payment => {
      const dateKey = formatDate(payment.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(payment);
    });

    return groups;
  }, [filteredItems]);

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

    await updatePayment(p.id, {
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
            <div className="payments-grouped-container">
              {Object.keys(groupedPayments).map(date => (
                <div key={date} className="date-group">
                  <h3 className="date-group-title">
                    {date}
                  </h3>

                  <div className="date-group-content">
                    <List
                      items={groupedPayments[date]}
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}