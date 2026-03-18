import type { Customer } from '../../types/types'
import './ListItem.css'

type Props = {
  item: Customer
}

export default function CustomerListItem({ item }: Props) {
  return (
    <div className="customer-item">
      <strong>{item.name}</strong>
      <span>{item.phone}</span>
    </div>
  )
}