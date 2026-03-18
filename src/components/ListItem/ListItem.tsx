// import type { JSX } from 'react'
import './ListItem.css'

type Client = {
  id: string
  name: string
  phone: string
}

type Props = {
  item: Client
}

export default function ClientItem({ item }: Props) {
  return (
    <div className="client-item">
      <strong>{item.name}</strong>
      <span>{item.phone}</span>
    </div>
  )
}