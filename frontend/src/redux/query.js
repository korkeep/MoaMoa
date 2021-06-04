/*
Query에 들어가는 객체 attribute
query: 검색어
*/

const initState = {
    query: "",
    sort: "recent",
    day: "",
    page: 1
}

export const QUERY_CHANGE = "query/query_change"
export const SORT_CHANGE = "query/sort_change"
export const DAY_CHANGE = "query/day_change"
export const PAGE_CHANGE = "query/page_change"
export const INITIALIZE_SORT_DAY = "query/initialize_sort_day"

export const query_change = (query) => {
    return {
        type: QUERY_CHANGE,
        query: query
    }
}

export const sort_change = (sort) => {
    return {
        type: SORT_CHANGE,
        sort: sort
    }
}

export const day_change = (day) => {
    return {
        type: DAY_CHANGE,
        day: day
    }
}

export const page_change = (page) => {
    return {
        type: PAGE_CHANGE,
        page: page
    }
}

export const initialize_sort_day = () => {
    return {
        type: INITIALIZE_SORT_DAY
    }
}

const queryReducer = (state = initState, action) => {
    switch (action.type) {
        case QUERY_CHANGE:
            return {
                ...state,
                query: action.query
            }
        case SORT_CHANGE:
            return {
                ...state,
                sort: action.sort
            }
        case DAY_CHANGE:
            return {
                ...state,
                day: action.day
            }
        case PAGE_CHANGE:
            return {
                ...state,
                page: action.page
            }
        case INITIALIZE_SORT_DAY:
            return initState
        default:
            return state
    }
}

export default queryReducer