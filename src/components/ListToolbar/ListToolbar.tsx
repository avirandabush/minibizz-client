import { useState, useEffect, useRef } from 'react'
import Menu from './ListToolbarMenu'
import './ListToolbar.css'

type Props = {
    onSearch: (text: string) => void
    onSort: (option: string) => void
    onFilter: (option: string) => void
    onAdd: () => void
}

export default function ListToolbar({ onSearch, onSort, onFilter, onAdd }: Props) {
    const [sortOpen, setSortOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const toolbarRef = useRef<HTMLDivElement>(null)

    const sortOptions = ['שם א-ת', 'שם ת-א']
    const filterOptions = ['לקוחות חדשים', 'לקוחות ותיקים']

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
                setSortOpen(false)
                setFilterOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className='list-toolbar-wrapper' ref={toolbarRef}>
            <div className="list-toolbar-container">

                {/* צד ימין */}
                <div className="toolbar-right">
                    <button onClick={onAdd}>+ New</button>
                </div>
                
                {/* צד שמאל */}
                <div className="toolbar-left">
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setFilterOpen(!filterOpen)}>Filter</button>
                        <Menu
                            options={filterOptions}
                            isOpen={filterOpen}
                            onSelect={onFilter}
                            onClose={() => setFilterOpen(false)}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setSortOpen(!sortOpen)}>Sort</button>
                        <Menu
                            options={sortOptions}
                            isOpen={sortOpen}
                            onSelect={onSort}
                            onClose={() => setSortOpen(false)}
                        />
                    </div>
                </div>
            </div>

            {/* שורת חיפוש */}
            <div className="search-row">
                <input
                    type="text"
                    placeholder="חפש..."
                    value={searchText}
                    onChange={e => {
                        setSearchText(e.target.value)
                        onSearch(e.target.value)
                    }}
                />
            </div>
        </div>
    )
}