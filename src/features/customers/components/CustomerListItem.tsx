import type { Customer } from "../types"
import BaseListItem from '@/shared/components/ListItem/BaseListItem'

type Props = {
  item: Customer
  onClick?: () => void
}

export default function CustomerListItem({ item, onClick }: Props) {
  const date = new Date(item.createdAt).toLocaleDateString('he-IL', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <BaseListItem onClick={onClick}>
      <div className="item-right">
        <div>{item.personal.name}</div>
        <div className="sub">{item.contact.phone}</div>
      </div>

      <div className="item-left">
        <div className="sub">{date}</div>
      </div>
    </BaseListItem>
  )
}