import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListToolbar from '../../components/ListToolbar/ListToolbar'
import List from '../../components/List/List'
import ClientItem from '../../components/ListItem/ListItem'

type Client = {
  id: string
  name: string
  phone: string
}

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'אבי כהן', phone: '050-1234567' },
  { id: '2', name: 'רונית לוי', phone: '052-7654321' },
  { id: '3', name: 'דוד ישראלי', phone: '054-9876543' },
]

export default function ClientsPage() {
  const [items, setItems] = useState<Client[]>([])
  const [filteredItems, setFilteredItems] = useState<Client[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setItems(MOCK_CLIENTS)
    setFilteredItems(MOCK_CLIENTS)
  }, [])

  const handleSearch = (text: string) => {
    setFilteredItems(
      items.filter(i => i.name.includes(text) || i.phone.includes(text))
    )
  }

  const handleSort = (option: string) => {
    const sorted = [...filteredItems].sort((a, b) =>
      option === 'שם א-ת' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    )
    setFilteredItems(sorted)
  }

  const handleFilter = (option: string) => {
    if (option === 'לקוחות חדשים') {
      setFilteredItems(items.filter((_, idx) => idx % 2 === 0))
    } else {
      setFilteredItems(items.filter((_, idx) => idx % 2 !== 0))
    }
  }

  const handleAdd = () => {
    navigate('/clients/new')
  }

  return (
    <div style={{ margin: "16px" }}>
      <ListToolbar
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        onAdd={handleAdd}
      />
      <List items={filteredItems} renderItem={item => <ClientItem key={item.id} item={item} />} />
    </div>
  )
}