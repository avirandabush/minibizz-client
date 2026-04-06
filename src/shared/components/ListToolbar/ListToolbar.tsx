import { useState, useEffect, useRef } from 'react'
import Menu from './ListToolbarMenu'
import './ListToolbar.css'

type ListToolbarProps = {
    placeholder?: string
    sortOptions: string[]
    filterOptions: string[]
    onSearch: (text: string) => void
    onSort: (option: string) => void
    onFilter: (option: string) => void
    onAdd: () => void
}

export default function ListToolbar({ placeholder, sortOptions, filterOptions, onSearch, onSort, onFilter, onAdd }: ListToolbarProps) {
    const [sortOpen, setSortOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const toolbarRef = useRef<HTMLDivElement>(null)

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
                <div className="toolbar-right">
                    <button className="add-btn" onClick={onAdd}>+ חדש</button>
                </div>

                <div className="toolbar-left">
                    <div className="menu-anchor">
                        <button onClick={() => setFilterOpen(!filterOpen)}>סינון</button>
                        <Menu
                            options={filterOptions}
                            isOpen={filterOpen}
                            onSelect={onFilter}
                            onClose={() => setFilterOpen(false)}
                        />
                    </div>

                    <div className="menu-anchor">
                        <button onClick={() => setSortOpen(!sortOpen)}>מיון</button>
                        <Menu
                            options={sortOptions}
                            isOpen={sortOpen}
                            onSelect={onSort}
                            onClose={() => setSortOpen(false)}
                        />
                    </div>
                </div>
            </div>

            <div className="search-row">
                <input
                    type="text"
                    placeholder={placeholder || 'חפש...'}
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
