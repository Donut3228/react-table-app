export const TOGGLE_ROW = 'TOGGLE_ROW'
export const SET_SORT_FILTER = 'SET_SORT_FILTER'
export const ADD_ROW = 'ADD_ROW'

export const SortFilters = {
    SORT_NONE: 'SORT_NONE',
    SORT_ID: 'SORT_ID',
    SORT_ID_DESC: 'SORT_ID',
    SORT_FIRST: 'SORT_FIRST',
    SORT_FIRST_DESC: 'SORT_FIRST',
    SORT_LAST: 'SORT_LAST',
    SORT_LAST_DESC: 'SORT_LAST',
    SORT_EMAIL: 'SORT_EMAIL',
    SORT_EMAIL_DESC: 'SORT_EMAIL',
    SORT_PHONE: 'SORT_PHONE',
    SORT_PHONE_DESC: 'SORT_PHONE'
}


export function toggleRow(index) {
    return { type: TOGGLE_ROW, index }
}

export function setSortFilter(filter) {
    return { type: SET_SORT_FILTER, filter }
}

export function addRow(row) {
    return { type: ADD_ROW, row }
}