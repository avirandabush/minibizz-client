import { type Payment, PaymentStatus } from '../../types/types'
import BaseListItem from './BaseListItem'

type Props = {
    item: Payment
    customerName: string
    onToggle: (payment: Payment) => void
    onClick?: () => void
}

export default function PaymentListItem({ item, customerName, onToggle, onClick }: Props) {
    const date = new Date(item.date).toLocaleDateString('he-IL')

    const treatmentText =
        item.treatments.length === 1
            ? item.treatments[0].name
            : `${item.treatments.length} טיפולים`

    return (
        <BaseListItem onClick={onClick}>
            <div className="item-right">
                <div>{customerName}</div>
                <div className="sub">{treatmentText}</div>
                <div className="sub">₪{item.amount}</div>
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