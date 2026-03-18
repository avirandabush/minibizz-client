import type { JSX } from 'react'
import './List.css'

type ListProps<T> = {
  items: T[]
  renderItem: (item: T) => JSX.Element
}

export default function List<T>({ items, renderItem }: ListProps<T>) {
  return <div className="list-container">{items.map(renderItem)}</div>
}