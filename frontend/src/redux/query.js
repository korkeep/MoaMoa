/*
Query에 들어가는 객체 attribute
query: 검색어
*/

import { createStore } from "redux"

const initState = {
    query: ""
}

export const QUERY_CHANGE = "query/query_change"

export const query_change = (query) => {
    return {
        type: QUERY_CHANGE,
        query: query
    }
}

const queryReducer = (state = initState, action) => {
    switch (action.type) {
        case QUERY_CHANGE:
            return {
                query: action.query
            }
        default:
            return state
    }
}

export default queryReducer