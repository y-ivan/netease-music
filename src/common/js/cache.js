import storage from "good-storage"

const SEARCH_KEY = "__search__"
const SEARCH_MAX_LENGTH = 15

const insertArray = (arr, key, compare, maxLen) => {
    const index = arr.findIndex(compare)

    if (index === 0) return true

    if (index >= 0) {
        arr.splice(index, 1)
    }

    arr.unshift(key)

    if (maxLen && arr.length > maxLen) arr.pop()
}

export const loadSearch = () => storage.get(SEARCH_KEY, [])

export const saveSearch = (query) => {
    let searches = loadSearch()

    insertArray(searches, query, (item) =>
        item === query,
    SEARCH_MAX_LENGTH
    )

    storage.set(SEARCH_KEY, searches)
    return searches
}

export const clearSearch = () => {
    storage.remove(SEARCH_KEY)
    return []
}
