import { TreatmentStatus, type Treatment } from '../../types/types'
import BaseListItem from './BaseListItem'

type Props = {
    item: Treatment
    onToggle: (treatment: Treatment) => void
    onClick?: () => void
}

export default function TreatmentListItem({ item, onToggle, onClick }: Props) {
    const date = new Date(item.createdAt).toLocaleDateString('he-IL', {
        month: 'long',
        year: 'numeric',
    })

    return (
        <BaseListItem onClick={onClick}>
            <div className="item-right">
                <div>{item.name}</div>
                <div className="sub">₪{item.price}</div>
            </div>

            <div className="item-left">
                <div className="sub">{date}</div>

                <div
                    className={`status ${item.status === TreatmentStatus.ACTIVE ? 'active' : 'inactive'}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggle(item)
                    }}
                >
                    {item.status === TreatmentStatus.ACTIVE ? 'פעיל' : 'לא פעיל'}
                </div>
            </div>
        </BaseListItem>
    )
}