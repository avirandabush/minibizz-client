import { useState, useMemo } from 'react'

type ListManagerOptions<T> = {
    items: T[]
    searchFields: (item: T) => string[]
    sortLogics: { [key: string]: (a: T, b: T) => number }
    filterLogics: { [key: string]: (items: T[]) => T[] }
    defaultSort?: string
}

export function useListManager<T>({ items, searchFields, sortLogics, filterLogics, defaultSort }: ListManagerOptions<T>) {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeSort, setActiveSort] = useState<string>(defaultSort || '')
    const [activeFilter, setActiveFilter] = useState('')

    const processedItems = useMemo(() => {
        let result = [...items]

        if (activeFilter && filterLogics[activeFilter]) {
            result = filterLogics[activeFilter](result)
        }

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase()
            result = result.filter(item =>
                searchFields(item).some(field => field.toLowerCase().includes(lowerSearch))
            )
        }

        if (activeSort && sortLogics[activeSort]) {
            result.sort(sortLogics[activeSort])
        } else if (defaultSort && sortLogics[defaultSort]) {
            result.sort(sortLogics[defaultSort])
        }

        return result
    }, [items, searchTerm, activeSort, activeFilter])

    return {
        processedItems,
        setSearchTerm,
        setActiveSort,
        setActiveFilter,
        sortOptions: Object.keys(sortLogics),
        filterOptions: Object.keys(filterLogics)
    }
}