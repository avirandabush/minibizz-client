import BaseListItem from './BaseListItem'

export default function CustomerListItem({ item, onClick }: any) {
  const date = new Date(item.createdAt).toLocaleDateString('he-IL', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <BaseListItem onClick={onClick}>
      <div className="item-right">
        <div>{item.name}</div>
        <div className="sub">{item.phone}</div>
      </div>

      <div className="item-left">
        <div className="sub">{date}</div>
      </div>
    </BaseListItem>
  )
}