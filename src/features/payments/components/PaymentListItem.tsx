import { PaymentStatus, type Payment } from '../types'
import BaseListItem from '@/shared/components/ListItem/BaseListItem'

type Props = {
    item: Payment
    customerName: string
    onToggle: (payment: Payment) => void
    onClick?: () => void
}

export default function PaymentListItem({ item, customerName, onToggle, onClick }: Props) {
    const date = new Date(item.date).toLocaleDateString('he-IL')

    const treatmentText =
        item.items.length === 1
            ? item.items[0].name
            : `${item.items.length} טיפולים`

    return (
        <BaseListItem onClick={onClick}>
            <div className="item-right">
                <div>{customerName}</div>
                <div className="sub">{treatmentText}</div>
                <div className="sub">₪{item.summary.total.toFixed(2)}</div>
            </div>

            <div className="item-left">
                <div className="sub">{date}</div>

                <div
                    className={`status ${item.status === PaymentStatus.COMPLETED ? 'active' : 'inactive'}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggle(item)
                    }}
                >
                    {item.status === PaymentStatus.COMPLETED ? 'הושלם' : 'ממתין'}
                </div>
            </div>
        </BaseListItem>
    )
}