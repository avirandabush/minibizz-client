import type { Payment } from '../../types/types'
import './ListItem.css'

type Props = {
    item: Payment
    customerName: string
}

export default function PaymentListItem({ item, customerName }: Props) {
    return (
        <div className="customer-item">
            <strong>{customerName}</strong>
            <span>{item.method} | {new Date(item.date).toLocaleDateString()}</span>
            <span>₪{item.amount} | {item.status}</span>
        </div>
    )
}