import type { Treatment } from '../../types/types'
import './ListItem.css'

type Props = {
    item: Treatment
}

export default function TreatmentListItem({ item }: Props) {
    return (
        <div className="customer-item">
            <strong>{item.name}</strong>
            <span>{item.status}</span>
            <span>{item.price}</span>
        </div>
    )
}