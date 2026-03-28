
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { useCustomers } from '../../hooks/useCustomers'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import PaymentListItem from '../../components/ListItem/PaymentListItem'
import { PaymentStatus, type Payment } from '../../types/index'
import EmptyState from '../../components/EmptyState/EmptyState'
import SkeletonList from '../../components/Skeleton/SkeletonList/SkeletonList'
import { useListManager } from '../../hooks/useListManager'
import './PaymentsPage.css'

export default function PaymentsPage() {
  const { payments, updatePayment, loading } = usePayments()
  const { customers } = useCustomers()
  const navigate = useNavigate()

  const {
    processedItems,
    setSearchTerm,
    setActiveSort,
    setActiveFilter,
    sortOptions,
    filterOptions
  } = useListManager({
    items: payments,
    searchFields: (p) => [
      customers.find(c => c.id === p.customerId)?.name || '',
      p.referenceNumber || '',
      (p.treatments || []).map(t => t.name).join(' '),
    ],
    sortLogics: {
      'תאריך חדש-ישן': (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      'סכום גבוה-נמוך': (a, b) => b.amount - a.amount,
    },
    filterLogics: {
      'הכל': (items) => items,
      'ממתין': (items) => items.filter(p => p.status === 'PENDING'),
      'הושלם': (items) => items.filter(p => p.status === 'COMPLETED'),
    },
    defaultSort: 'תאריך חדש-ישן'
  })

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const groupedPayments = useMemo(() => {
    const groups: { [key: string]: Payment[] } = {};

    processedItems.forEach(payment => {
      const dateKey = formatDate(payment.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(payment);
    });

    return groups;
  }, [processedItems]);

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'לא ידוע'
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
        onSearch={setSearchTerm}
        onSort={setActiveSort}
        onFilter={setActiveFilter}
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        onAdd={() => navigate('/payments/new')}
        placeholder="חפש לפי שם לקוח, טיפול או מספר קבלה..."
      />

      {loading ? (
        <SkeletonList />
      ) : (
        <>
          {processedItems.length === 0 ? (
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