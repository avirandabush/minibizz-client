import './ListItem.css'

type Customer = {
  id: string
  name: string
  phone: string
}

type Props = {
  item: Customer
}

export default function CustomerItem({ item }: Props) {
  return (
    <div className="customer-item">
      <strong>{item.name}</strong>
      <span>{item.phone}</span>
    </div>
  )
}