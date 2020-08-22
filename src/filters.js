const filters = {
    searchText: '',
}

const getfilters = () => filters

const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }
} 

export { getfilters, setFilters }